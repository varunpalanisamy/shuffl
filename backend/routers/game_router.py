from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from typing import Dict
from ..managers.connection_manager import ConnectionManager
from ..models.player import Player
from ..models.game_session import GameSession
import random
import string

router = APIRouter()
connection_manager = ConnectionManager()

@router.post("/create-game")
async def create_game():
    # Generate a unique game code
    game_code = generate_unique_code()
    while game_code in connection_manager.sessions:
        game_code = generate_unique_code()
    
    # Create a new game session
    game_session = GameSession(game_code=game_code)
    connection_manager.sessions[game_code] = game_session
    
    return {"game_code": game_code}

@router.get("/validate-game/{game_code}")
async def validate_game(game_code: str):
    if game_code not in connection_manager.sessions:
        raise HTTPException(status_code=404, message="Game not found")
    return {"valid": True}

@router.websocket("/ws/{game_code}/{user_id}/{username}")
async def websocket_endpoint(websocket: WebSocket, game_code: str, user_id: str, username: str):
    # Validate game exists
    if game_code not in connection_manager.sessions:
        await websocket.close(code=4000, reason="Invalid game code")
        return
        
    await connection_manager.connect(websocket, game_code, user_id)
    
    # Get game session
    game_session = connection_manager.sessions[game_code]
    
    # Add player to session
    player = Player(id=user_id, name=username)
    game_session.players[user_id] = player
    
    # If this is the first player, make them the host
    if len(game_session.players) == 1:
        game_session.host_id = user_id
    
    # Broadcast updated player list to all connected clients
    await connection_manager.broadcast_to_session(game_code, {
        "type": "PLAYERS_UPDATE",
        "players": [
            {
                "id": p.id,
                "name": p.name,
                "isHost": p.id == game_session.host_id
            } 
            for p in game_session.players.values()
        ]
    })

    try:
        while True:
            data = await websocket.receive_json()
            if data["type"] == "START_GAME" and user_id == game_session.host_id:
                await connection_manager.broadcast_to_session(game_code, {
                    "type": "GAME_STARTED"
                })
    except WebSocketDisconnect:
        # Remove player from session
        if game_code in connection_manager.sessions:
            connection_manager.sessions[game_code].players.pop(user_id, None)
            # If there are still players, broadcast the update
            if connection_manager.sessions[game_code].players:
                await connection_manager.broadcast_to_session(game_code, {
                    "type": "PLAYERS_UPDATE",
                    "players": [
                        {
                            "id": p.id,
                            "name": p.name,
                            "isHost": p.id == game_session.host_id
                        } 
                        for p in connection_manager.sessions[game_code].players.values()
                    ]
                })
            else:
                # If no players left, clean up the session
                del connection_manager.sessions[game_code]
        connection_manager.disconnect(game_code, user_id)

def generate_unique_code() -> str: 
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6)) 
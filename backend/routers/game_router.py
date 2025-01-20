from fastapi import APIRouter, WebSocket, WebSocketDisconnect
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
    
    # Create a new game session
    game_session = GameSession(game_code=game_code)
    connection_manager.sessions[game_code] = game_session
    
    return {"game_code": game_code}

@router.websocket("/ws/{game_code}/{user_id}/{username}")
async def websocket_endpoint(websocket: WebSocket, game_code: str, user_id: str, username: str):
    await connection_manager.connect(websocket, game_code, user_id)
    
    player = Player(id=user_id, name=username)
    connection_manager.sessions[game_code].players[user_id] = player
    
    await connection_manager.broadcast_to_session(game_code, {
        "type": "PLAYERS_UPDATE",
        "players": [
            {"id": p.id, "name": p.name, "isHost": p.id == game_session.host_id} 
            for p in connection_manager.sessions[game_code].players.values()
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
        connection_manager.disconnect(game_code, user_id)
        await connection_manager.broadcast_to_session(game_code, {
            "type": "PLAYER_LEFT",
            "user_id": user_id
        })

def generate_unique_code() -> str: 
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6)) 
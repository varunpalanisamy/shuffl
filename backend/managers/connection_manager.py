from fastapi import WebSocket
from typing import Dict
from ..models.game_session import GameSession

class ConnectionManager:
    
    def __init__(self):
        
        # dictionary that holds active websocket connections 
        # game_code : dictionary that maps users to their websockets
        #game code: 
                       # [user_id : websocket,
                       #    ... ]
        # each game has a connection id
        # each user has their own websocket connection, so we know which one to send a msg to
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}
        self.sessions: Dict[str, GameSession] = {}  # state of each game, cards for each player, etc 
        
        
    async def connect(self, websocket, game_code, user_id):
        await websocket.accept()
        
        if game_code not in self.active_connections: 
            self.active_connections[game_code]= {}
        
        self.active_connections[game_code][user_id] = websocket 
        
        
    def disconnect(self, game_code: str, user_id: str):
        # Remove the user from the active connections
        if game_code in self.active_connections:
            self.active_connections[game_code].pop(user_id, None)
    
    async def broadcast_to_session(self, game_code: str, message: dict):
        # Send a message to all connected users in the specified game session
        if game_code in self.active_connections:
            for connection in self.active_connections[game_code].values():
                await connection.send_json(message)

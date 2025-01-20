from fastapi import WebSocket
from typing import Dict
from ..models.session import GameSession

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}  # game_code: {user_id: websocket}
        self.sessions: Dict[str, GameSession] = {}

    async def connect(self, websocket: WebSocket, game_code: str, user_id: str):
        await websocket.accept()
        if game_code not in self.active_connections:
            self.active_connections[game_code] = {}
        self.active_connections[game_code][user_id] = websocket

    def disconnect(self, game_code: str, user_id: str):
        if game_code in self.active_connections:
            self.active_connections[game_code].pop(user_id, None)

    async def broadcast_to_session(self, game_code: str, message: dict):
        if game_code in self.active_connections:
            for connection in self.active_connections[game_code].values():
                await connection.send_json(message) 
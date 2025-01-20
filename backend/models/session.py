from pydantic import BaseModel
from typing import Dict
from .user import User

class GameSession(BaseModel):
    code: str
    players: Dict[str, User] = {}  # user_id: User 
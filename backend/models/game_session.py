from pydantic import BaseModel
from typing import Dict, List, Optional
from .player import Player
from .card import Card

class GameSession(BaseModel):
    game_code: str
    players: Dict[str, Player] = {}
    deck: List[Card] = []
    current_round: int = 0
    host_id: Optional[str] = None
    
    class Config:
        arbitrary_types_allowed = True 
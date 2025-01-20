from pydantic import BaseModel
from typing import List, Optional
from .card import Card

class Player(BaseModel):
    id: str
    name: str
    cards: List[Card] = []
    score: int = 0
    
    class Config:
        arbitrary_types_allowed = True

    def set_hand(self, hand):
        self.cards = hand

from pydantic import BaseModel

class Card(BaseModel):
    suit: str
    value: str
    
    class Config:
        arbitrary_types_allowed = True

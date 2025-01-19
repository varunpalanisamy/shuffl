from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .models.card import CardDeck
from .models.user import Player

app = FastAPI()

games = {}

@app.get("/")
def read_root():
    return {"message": "Backend is working!"}


@app.get("/deal")
def deal_cards():
    deck = CardDeck()
    player_hand = deck.deal_hand()
    community_cards = deck.deal_community_cards()
    return {"player_hand": player_hand, "community_cards": community_cards}

@app.websocket("/ws/{game_id}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str, player_id: str):
    await websocket.accept()
    if game_id not in games:
        games[game_id] = {
            "deck": CardDeck(),
            "players": {}
        }
    game = games[game_id]
    if player_id not in game["players"]:
        game["players"][player_id] = Player(player_id, f"Player {player_id}")

    player = game["players"][player_id]
    player.set_hand(game["deck"].deal_hand())

    community_cards = game["deck"].deal_community_cards()
    await websocket.send_json({
        "player_hand": player.hand,
        "community_cards": community_cards
    })

    try:
        while True:
            # Wait for future client messages
            data = await websocket.receive_text()
            # Handle game updates here
    except WebSocketDisconnect:
        print(f"Player {player_id} disconnected")

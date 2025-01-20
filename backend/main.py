from fastapi import FastAPI
from .routers import game_router

app = FastAPI()
app.include_router(game_router.router, prefix="/game")

@app.get("/")
def read_root():
    return {"message": "backend is working!"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import game_router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(game_router.router, prefix="/game")

@app.get("/")
async def root():
    return {"message": "Hello World"}

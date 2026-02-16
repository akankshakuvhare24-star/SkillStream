from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router  # Direct import

app = FastAPI()
orgins = [ "http://akankshakuvhare24-star.github.io" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=orgins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "SkillStream API"}

@app.get("/health")
def health():
    return {"status": "healthy"}

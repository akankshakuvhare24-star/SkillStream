from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from pydantic import BaseModel
import hashlib
import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/auth", tags=["auth"])

SECRET_KEY = "skillstream-secret"
ALGORITHM = "HS256"

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise HTTPException(400, "Email exists")
        
        hashed = hash_password(user.password)
        new_user = User(
            email=user.email,
            name=user.name,
            hashed_password=hashed
        )
        db.add(new_user)
        db.commit()
        return {"message": "User created", "email": user.email}
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/login")
async def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.hashed_password != hash_password(data.password):
        raise HTTPException(401, "Invalid credentials")
    
    token = jwt.encode(
        {"sub": user.email, "exp": datetime.utcnow() + timedelta(days=1)},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }

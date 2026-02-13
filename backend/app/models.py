from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    github_token = Column(String, nullable=True)
    github_username = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class LearningStyle(Base):
    __tablename__ = "learning_styles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    primary_style = Column(String)
    secondary_style = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserSkill(Base):
    __tablename__ = "user_skills"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skill_name = Column(String)
    proficiency = Column(Float, default=0)
    confidence = Column(Float, default=0)
    source = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class LearningPath(Base):
    __tablename__ = "learning_paths"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    target_role = Column(String)
    path_json = Column(JSON)
    current_position = Column(Integer, default=0)
    progress = Column(Float, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

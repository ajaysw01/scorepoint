from typing import List, Optional
from pydantic import BaseModel, EmailStr


# ✅ User Models
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ✅ Team and Player Models
class PlayerCreate(BaseModel):
    name: str


class TeamCreate(BaseModel):
    name: str
    players: List[PlayerCreate]


class PlayerUpdate(BaseModel):
    id: int
    name: str


class TeamUpdate(BaseModel):
    name: Optional[str] = None  # Allow updating only the name if needed
    players: Optional[List[PlayerUpdate]] = None  # Allow updating players


# ✅ Sport Models
class SportCreate(BaseModel):
    name: str
    category: Optional[str] = None  # "Singles", "Doubles", or None for Cricket/Darts


class SportUpdate(BaseModel):
    name: str
    category: Optional[str] = None


# ✅ Player Score Model
class PlayerScoreCreate(BaseModel):
    player_id: int
    sport_id: int
    points: int

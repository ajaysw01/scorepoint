from typing import List, Optional
from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class PlayerCreate(BaseModel):
    name: str


class PlayerUpdate(BaseModel):
    id: int
    name: str


class TeamCreate(BaseModel):
    name: str
    players: List[PlayerCreate]


class TeamUpdate(BaseModel):
    name: Optional[str] = None
    players: Optional[List[PlayerUpdate]] = None


class SportCreate(BaseModel):
    name: str
    category: Optional[str] = None


class SportUpdate(BaseModel):
    name: str
    category: Optional[str] = None


class PlayerPointsCreate(BaseModel):
    player_id: int
    sport_id: int
    points: int


class TeamPointsCreate(BaseModel):
    sport_id: int
    bonus_points: int

"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains pydantic request models.
"""
from typing import List, Optional
from pydantic import BaseModel, EmailStr, conint, field_validator
from src.api.models.models import SportCategoryEnum
from datetime import date, time

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

NON_CATEGORY_SPORTS = {"Cricket", "Darts", "Fun Fridays"}
CATEGORY_SPORTS = {"Badminton", "Carrom", "Table Tennis"}

class SportCreate(BaseModel):
    name: str

class SportUpdate(BaseModel):
    name: Optional[str] = None

class PlayerPointsCreate(BaseModel):
    player_id: int
    sport_id: int
    category: Optional[SportCategoryEnum] = None
    competition_level: str
    points: conint(ge=0)

    @field_validator("category")
    @classmethod
    def validate_category(cls, category, info):
        sport_name = info.data.get("sport_name", "").strip().lower()

        if sport_name in {s.lower() for s in NON_CATEGORY_SPORTS} and category is not None:
            raise ValueError(f"{sport_name} does not support categories.")
        if sport_name in {s.lower() for s in CATEGORY_SPORTS} and category is None:
            raise ValueError(f"{sport_name} requires a category.")
        return category

class BatchPlayerPointsCreate(BaseModel):
    player_points: List[PlayerPointsCreate]

class TeamBonusPointsCreate(BaseModel):
    team_id: int
    sport_id: int
    bonus_points: conint(ge=0)


# separate models for match schedules. It does not have any relation with rest of the applicaiton.
class MatchScheduleCreate(BaseModel):
    player1: str
    player2: str
    team1: str
    team2: str
    sport: str
    category: Optional[SportCategoryEnum] = None
    venue: str
    comments: Optional[str] = None
    status: str
    date: date
    time: time

class MatchScheduleUpdate(BaseModel):
    player1: Optional[str] = None
    player2: Optional[str] = None
    team1: Optional[str] = None
    team2: Optional[str] = None
    sport: Optional[str] = None
    category: Optional[SportCategoryEnum] = None
    venue: Optional[str] = None
    comments: Optional[str] = None
    status: Optional[str] = None
    date: Optional[date] = None
    time: Optional[time] = None


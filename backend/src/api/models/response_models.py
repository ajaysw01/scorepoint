"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains pydantic response models.
"""
from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr
from datetime import datetime
from src.api.models.models import SportCategoryEnum

class UserResponse(BaseModel):
    name: str
    email: EmailStr
    message: str

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class PlayerResponse(BaseModel):
    id: int
    name: str
    team_id: int

    class Config:
        from_attributes = True

class PlayerResponse2(BaseModel):
    player_id: int
    name: str
    team_id: int
    team_name : str

    class Config:
        from_attributes = True

class TeamResponse(BaseModel):
    id: int
    name: str
    total_points: int
    players: List[PlayerResponse] = []

    class Config:
        from_attributes = True

class SportResponse(BaseModel):
    id: int
    name: str

    class Config :
        from_attributes = True

class PlayerPointsResponse(BaseModel):
    player_id: int
    sport_id: int
    category: Optional[SportCategoryEnum] = None
    competition_level: str
    points: int
    total_player_points: int

    class Config:
        from_attributes = True


class PlayerDetails(BaseModel):
    player_id: int
    name: str
    team_id: int
    team_name: str
    total_points: int

    class Config:
        from_attributes = True

class LeaderboardEntry(BaseModel):
    player_id: int
    player_name: str
    total_points: int

    class Config:
        from_attributes = True

class TeamLeaderboardResponse(BaseModel):
    team_name: str
    sports_scores: Dict[str, int]
    bonus_points: int
    total_points: int

    class Config:
        from_attributes = True

class TeamBonusResponse(BaseModel):
    id: int
    team_id: int
    sport_id: int
    bonus_points: int
    awarded_at: datetime

    class Config:
        from_attributes = True

class CompetitionLevelPoints(BaseModel):
    competition_level: str
    points: int

class CategoryPoints(BaseModel):
    category_total_points: int
    competitions: List[CompetitionLevelPoints]

class SportPoints(BaseModel):
    sport_total_points: int
    categories: Dict[str, CategoryPoints]

class PlayerHistoryResponse(BaseModel):
    player_name: str
    team_name: str
    player_total_points: int
    player_points: Dict[str, SportPoints]

    class Config:
        from_attributes = True

class PlayerResponse3(BaseModel):
    id: int
    name: str
    team_id: int

    class Config:
        from_attributes = True


# separate models for match schedules. It has no relation with rest of the application.
from datetime import date, time

class MatchScheduleResponse(BaseModel):
    id: int
    player1: str
    player2: str
    team1: str
    team2: str
    sport: str
    category: Optional[str] = None
    venue: str
    comments: Optional[str] = None
    status: str
    date: date
    time: time

    class Config:
        from_attributes = True



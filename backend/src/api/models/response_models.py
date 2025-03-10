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
    points: int

    class Config:
        from_attributes = True


class PlayerResponse2(BaseModel):
    player_id: int
    name: str
    team_id: int
    team_name : str

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

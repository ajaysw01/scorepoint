from typing import List, Optional
from pydantic import BaseModel, EmailStr


# ✅ Authentication Responses
class UserResponse(BaseModel):
    name: str
    email: EmailStr
    message: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# ✅ Player & Team Responses
class PlayerResponse(BaseModel):
    id: int
    name: str
    team_id: int

    class Config:
        from_attributes = True


class TeamResponse(BaseModel):
    id: int
    name: str
    players: List[PlayerResponse] = []  # Include players in response

    class Config:
        from_attributes = True


# ✅ Sport Responses
class SportResponse(BaseModel):
    id: int
    name: str
    category: Optional[str] = None  # "Singles", "Doubles", or None

    class Config:
        from_attributes = True


# ✅ Player Score Response
class PlayerScoreResponse(BaseModel):
    player_id: int
    sport_id: int
    points: int  # Points for this submission
    total_player_score: int  # Accumulated points for this sport

    class Config:
        from_attributes = True


# ✅ Leaderboard Responses
class LeaderboardEntry(BaseModel):
    player_id: int
    player_name: str
    total_points: int

    class Config:
        from_attributes = True


class LeaderboardResponse(BaseModel):
    leaderboard: List[LeaderboardEntry]

    class Config:
        from_attributes = True


class TeamLeaderboardResponse(BaseModel):
    team_name: str
    total_points: int

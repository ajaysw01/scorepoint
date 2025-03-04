from typing import List, Optional
from pydantic import BaseModel, EmailStr, conint, field_validator
from src.api.models.models import SportCategoryEnum

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
    category: Optional[SportCategoryEnum] = None  # Use Optional
    competition_level: str
    points: conint(ge=0)  # Ensures points cannot be negative

    @field_validator("category")
    @classmethod
    def validate_category(cls, category, info):
        sport_name = info.data.get("sport_name", "").strip().lower()

        if sport_name in {s.lower() for s in NON_CATEGORY_SPORTS} and category is not None:
            raise ValueError(f"{sport_name} does not support categories.")
        if sport_name in {s.lower() for s in CATEGORY_SPORTS} and category is None:
            raise ValueError(f"{sport_name} requires a category.")
        return category

class TeamBonusPointsCreate(BaseModel):
    team_id: int
    sport_id: int
    bonus_points: conint(ge=0)  # Ensures bonus points cannot be negative

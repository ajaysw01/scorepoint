from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, Query

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.models.models import User
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse
from src.api.services.team_service import (
    create_team, get_teams, get_team_by_id, update_team, delete_team,add_team_bonus
)

router = APIRouter()

def require_admin(user: User = Depends(get_current_user)):
    """Dependency to check if the user is an admin."""
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user  # Return user if needed in route


@router.post("/", response_model=TeamResponse)
def create_team_route(
    team_data: TeamCreate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can create teams
):
    return create_team(db, team_data, user.id)


@router.get("/", response_model=List[TeamResponse])
def get_teams_route(db: Session = Depends(get_db)):
    return get_teams(db)


@router.get("/{team_id}", response_model=TeamResponse)
def get_team_route(team_id: int, db: Session = Depends(get_db)):
    return get_team_by_id(db, team_id)


@router.put("/{team_id}", response_model=TeamResponse)
def update_team_route(
    team_id: int,
    team_data: TeamUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can update teams
):
    return update_team(db, team_id, team_data, user)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_route(
    team_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can delete teams
):
    delete_team(db, team_id, user)
    return  # No response body needed for 204


@router.post("/{team_id}/sports/{sport_id}/bonus", response_model=dict)
def add_team_bonus_route(
    team_id: int,
    sport_id: int,
    bonus: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)
):
    return add_team_bonus(db, team_id, sport_id, bonus)
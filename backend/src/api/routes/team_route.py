from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.models.models import User
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse
from src.api.services.team_service import (
    create_team, get_teams, get_team_by_id, update_team, delete_team, add_team_bonus
)
from src.api.auth.oauth2 import get_current_user

router = APIRouter()

@router.post("/", response_model=TeamResponse)
def create_team_route(
    team_data: TeamCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return create_team(db, team_data, user.id)

@router.get("/", response_model=list[TeamResponse])
def get_teams_route(db: Session = Depends(get_db)):
    return get_teams(db)

@router.get("/{team_id}", response_model=TeamResponse)
def get_team_route(
    team_id: int,
    db: Session = Depends(get_db)
):
    return get_team_by_id(db, team_id)

@router.put("/{team_id}", response_model=TeamResponse)
def update_team_route(
    team_id: int,
    team_data: TeamUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return update_team(db, team_id, team_data, user)

@router.delete("/{team_id}")
def delete_team_route(
    team_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return delete_team(db, team_id, user)

@router.post("/{team_id}/bonus/{sport_id}")
def add_team_bonus_route(
    team_id: int,
    sport_id: int,
    points: int,
    db: Session = Depends(get_db)
):
    return add_team_bonus(db, team_id, sport_id, points)

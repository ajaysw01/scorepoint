"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI endpoints for managing teams.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.api.database.db_conn import get_db
from src.api.auth.oauth2 import get_current_user
from src.api.utils.dependencies import require_admin
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse, PlayerResponse2
from src.api.services.team_service import (
    create_team, get_teams, get_team_by_id, update_team, delete_team, get_all_players_service
)

router = APIRouter()

@router.post("/", response_model=TeamResponse)
def create_new_team(
    team_data: TeamCreate,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
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
    user=Depends(require_admin)
):
    return update_team(db, team_id, team_data, user)

@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_route(
    team_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_admin)
):
    delete_team(db, team_id, user)

@router.get("/players/all", response_model=List[PlayerResponse2])
def get_all_players(db: Session = Depends(get_db)):
    return get_all_players_service(db)




"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI endpoints for managing points of players and teams.
"""
from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.models.models import SportCategoryEnum
from src.api.models.response_models import PlayerDetails
from src.api.services.points_service import (
    submit_player_points,
    get_player_points_by_category,
    get_player_points_by_sport,
    get_total_player_points,
    assign_team_bonus_points,
    get_team_points_by_category,
    get_team_points_by_sport,
    get_total_team_points,
    get_leaderboard, get_player_rankings_by_category, fetch_player_points_by_sport
)
from src.api.models.request_models import PlayerPointsCreate, TeamBonusPointsCreate
from src.api.utils.dependencies import require_admin

router = APIRouter()

@router.post("/player/submit", dependencies=[Depends(require_admin)])
def submit_points(payload: PlayerPointsCreate, db: Session = Depends(get_db)):
    return submit_player_points(db, payload)

@router.get("/player/category/{player_id}")
def player_points_by_category(player_id: int, db: Session = Depends(get_db)):
    return get_player_points_by_category(db, player_id)

@router.get("/player/sport/{player_id}")
def player_points_by_sport(player_id: int, db: Session = Depends(get_db)):
    return get_player_points_by_sport(db, player_id)

@router.get("/player/total/{player_id}")
def total_player_points(player_id: int, db: Session = Depends(get_db)):
    return get_total_player_points(db, player_id)

# Only Admins can assign team bonus points
@router.post("/team/bonus", dependencies=[Depends(require_admin)])
def assign_bonus(payload: TeamBonusPointsCreate, db: Session = Depends(get_db)):
    return assign_team_bonus_points(db, payload)

# Anyone can view team points
@router.get("/team/category/{team_id}")
def team_points_by_category(team_id: int, db: Session = Depends(get_db)):
    return get_team_points_by_category(db, team_id)

@router.get("/team/sport/{team_id}")
def team_points_by_sport(team_id: int, db: Session = Depends(get_db)):
    return get_team_points_by_sport(db, team_id)

@router.get("/team/total/{team_id}")
def total_team_points(team_id: int, db: Session = Depends(get_db)):
    return get_total_team_points(db, team_id)

# Anyone can view leaderboard
@router.get("/leaderboard")
def leaderboard(db: Session = Depends(get_db)):
    return get_leaderboard(db)


@router.get("/player/rankings")
def player_rankings_by_category(db: Session = Depends(get_db)):
    return get_player_rankings_by_category(db)

@router.get("/players", response_model=List[PlayerDetails])
def get_player_points_by_sports(sport_id: int, category: SportCategoryEnum, db: Session = Depends(get_db)):
    return fetch_player_points_by_sport(sport_id, category, db)
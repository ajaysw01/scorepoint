from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.services.points_service import (
    submit_player_points,
    get_player_points_by_category,
    get_player_points_by_sport,
    get_total_player_points,
    assign_team_bonus_points,
    get_team_points_by_category,
    get_team_points_by_sport,
    get_total_team_points,
    get_leaderboard
)
from src.api.models.request_models import PlayerPointsCreate, TeamBonusPointsCreate
from src.api.utils.dependencies import require_admin  # Enforce admin-only access

router = APIRouter()

# Only Admins can submit points
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

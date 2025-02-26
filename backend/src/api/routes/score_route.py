from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.models.response_models import PlayerScoreResponse,TeamLeaderboardResponse
from src.api.services.score_service import (
    submit_player_score,
    get_total_player_score,
    get_total_team_score,
    get_leaderboard
)

router = APIRouter()

@router.post("/{player_id}/{sport_id}", response_model=PlayerScoreResponse)
def submit_score(
    player_id: int,
    sport_id: int,
    points: int = Query(..., description="Points earned by the player"),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    return submit_player_score(player_id, sport_id, points, db)

@router.get("/player/{player_id}/{sport_id}", response_model=PlayerScoreResponse)
def get_player_score(player_id: int, sport_id: int, db: Session = Depends(get_db)):
    return get_total_player_score(player_id, sport_id, db)

@router.get("/team/{team_id}/{sport_id}")
def get_team_score(team_id: int, sport_id: int, db: Session = Depends(get_db)):
    return get_total_team_score(team_id, sport_id, db)

@router.get("/leaderboard", response_model=List[TeamLeaderboardResponse])
def leaderboard(
    sport_id: Optional[int] = Query(None, description="Filter leaderboard by sport"),
    db: Session = Depends(get_db)
):
    return get_leaderboard(db, sport_id)

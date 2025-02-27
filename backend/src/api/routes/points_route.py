from typing import List, Optional

from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.models.models import User
from src.api.models.response_models import PlayerPointsResponse, TeamLeaderboardResponse
from src.api.services.points_service import (
    submit_player_points, get_total_player_points, get_total_team_points, get_leaderboard
)

router = APIRouter()


def require_admin(user: Optional[User] = Depends(get_current_user)):
    """Dependency to check if the user is an admin."""
    if not user or user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user


@router.post("/submit/{player_id}/{sport_id}", response_model=PlayerPointsResponse)
def submit_points(
    player_id: int,
    sport_id: int,
    points: int = Query(..., description="Points earned by the player"),  # ✅ Required Query Parameter
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can submit points
):
    if points <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Points must be greater than 0")

    return submit_player_points(player_id, sport_id, points, db)


@router.get("/player/{player_id}/{sport_id}", response_model=PlayerPointsResponse)
def get_player_points(
    player_id: int,
    sport_id: int,
    db: Session = Depends(get_db)
):
    return get_total_player_points(player_id, sport_id, db)  # ✅ No need for extra fallback


@router.get("/team/{team_id}/{sport_id}", response_model=dict)
def get_team_points(
    team_id: int,
    sport_id: int,
    db: Session = Depends(get_db)
):
    points = get_total_team_points(team_id, sport_id, db)
    return points if points else {"team_id": team_id, "sport_id": sport_id, "total_team_points": 0}  # ✅ Consistent response format


@router.get("/leaderboard", response_model=List[TeamLeaderboardResponse])
def leaderboard(
    sport_id: Optional[int] = Query(None, description="Filter leaderboard by sport"),
    db: Session = Depends(get_db)
):
    result = get_leaderboard(db, sport_id)
    return result if result else []
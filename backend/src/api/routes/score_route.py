from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.models.request_models import PlayerScoreCreate
from src.api.models.response_models import PlayerScoreResponse, LeaderboardResponse
from src.api.services.score_service import submit_player_score, get_total_player_score, get_total_team_score, \
    get_leaderboard

router = APIRouter(prefix="/api/scores", tags=["Scores"])

# ✅ Submit a Player Score (Only for authenticated users)
@router.post("/", response_model=PlayerScoreResponse)
def submit_score(
    score_data: PlayerScoreCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    return submit_player_score(score_data, db)

# ✅ Get Player's Total Score in a Sport
@router.get("/player/{player_id}/{sport_id}", response_model=PlayerScoreResponse)
def get_player_score(player_id: int, sport_id: int, db: Session = Depends(get_db)):
    return get_total_player_score(player_id, sport_id, db)

# ✅ Get Team's Total Score in a Sport
@router.get("/team/{team_id}/{sport_id}")
def get_team_score(team_id: int, sport_id: int, db: Session = Depends(get_db)):
    return get_total_team_score(team_id, sport_id, db)

# ✅ Get Overall Leaderboard
@router.get("/leaderboard", response_model=list[LeaderboardResponse])
def leaderboard(db: Session = Depends(get_db)):
    return get_leaderboard(db)

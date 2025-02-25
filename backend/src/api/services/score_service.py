from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from src.api.models.models import Player, Sport, PlayerScore, Team
from src.api.models.request_models import PlayerScoreCreate


# ✅ Submit Player Score
def submit_player_score(score_data: PlayerScoreCreate, db: Session):
    player = db.query(Player).filter(Player.id == score_data.player_id).first()
    sport = db.query(Sport).filter(Sport.id == score_data.sport_id).first()

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    # ✅ Add player score
    new_score = PlayerScore(
        player_id=score_data.player_id,
        sport_id=score_data.sport_id,
        points=score_data.points
    )
    db.add(new_score)
    db.commit()
    db.refresh(new_score)

    # ✅ Calculate total player score
    total_points = db.query(func.sum(PlayerScore.points)).filter(
        PlayerScore.player_id == score_data.player_id,
        PlayerScore.sport_id == score_data.sport_id
    ).scalar() or 0

    # ✅ Calculate total team score
    team = db.query(Team).filter(Team.id == player.team_id).first()
    team_total_points = (
        db.query(func.sum(PlayerScore.points))
        .join(Player)
        .filter(Player.team_id == team.id, PlayerScore.sport_id == score_data.sport_id)
        .scalar() or 0
    ) if team else 0

    return {
        "id": new_score.id,
        "player_id": new_score.player_id,
        "sport_id": new_score.sport_id,
        "points": new_score.points,
        "total_player_score": total_points,
        "total_team_score": team_total_points
    }


# ✅ Get Player's Total Score
def get_total_player_score(player_id: int, sport_id: int, db: Session):
    total_points = db.query(func.sum(PlayerScore.points)).filter(
        PlayerScore.player_id == player_id,
        PlayerScore.sport_id == sport_id
    ).scalar() or 0

    return {"player_id": player_id, "sport_id": sport_id, "total_player_score": total_points}


# ✅ Get Team's Total Score
def get_total_team_score(team_id: int, sport_id: int, db: Session):
    total_points = db.query(func.sum(PlayerScore.points)).join(Player).filter(
        Player.team_id == team_id,
        PlayerScore.sport_id == sport_id
    ).scalar() or 0

    return {"team_id": team_id, "sport_id": sport_id, "total_team_score": total_points}


# ✅ Get Overall Leaderboard
def get_leaderboard(db: Session):
    leaderboard = db.query(
        Player.id.label("player_id"),
        Player.name.label("player_name"),
        func.sum(PlayerScore.points).label("total_points")
    ).join(PlayerScore).group_by(Player.id).order_by(func.sum(PlayerScore.points).desc()).all()

    return leaderboard

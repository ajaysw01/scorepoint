from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from src.api.models.models import Player, Sport, PlayerScore, Team
from src.api.models.response_models import PlayerScoreResponse

def submit_player_score(player_id: int, sport_id: int, points: int, db: Session):
    player = db.query(Player).filter(Player.id == player_id).first()
    sport = db.query(Sport).filter(Sport.id == sport_id).first()

    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    # ✅ Add player score
    new_score = PlayerScore(
        player_id=player_id,
        sport_id=sport_id,
        points=points
    )
    db.add(new_score)
    db.commit()
    db.refresh(new_score)

    # ✅ Calculate total player score
    total_points = db.query(func.sum(PlayerScore.points)).filter(
        PlayerScore.player_id == player_id,
        PlayerScore.sport_id == sport_id
    ).scalar() or 0

    # ✅ Calculate total team score per sport
    team = db.query(Team).filter(Team.id == player.team_id).first()
    if team:
        team_total_points = db.query(func.sum(PlayerScore.points)).join(Player).filter(
            Player.team_id == team.id,
            PlayerScore.sport_id == sport_id
        ).scalar() or 0
    else:
        team_total_points = 0  # Player may not belong to a team

    return {
        "id": new_score.id,
        "player_id": new_score.player_id,
        "sport_id": new_score.sport_id,
        "points": new_score.points,
        "total_player_score": total_points,
        "total_team_score": team_total_points
    }


# ✅ Get Player's Total Score
def get_total_player_score(player_id: int, sport_id: int, db: Session) -> PlayerScoreResponse:
    total_points = db.query(func.sum(PlayerScore.points)).filter(
        PlayerScore.player_id == player_id,
        PlayerScore.sport_id == sport_id
    ).scalar() or 0

    return PlayerScoreResponse(
        player_id=player_id,
        sport_id=sport_id,
        points=total_points,  # Include points to match response model
        total_player_score=total_points
    )

# ✅ Get Team's Total Score
def get_total_team_score(team_id: int, sport_id: int, db: Session):
    total_points = db.query(func.sum(PlayerScore.points)).join(Player).filter(
        Player.team_id == team_id,
        PlayerScore.sport_id == sport_id
    ).scalar() or 0

    return {"team_id": team_id, "sport_id": sport_id, "total_team_score": total_points}


def get_leaderboard(db: Session, sport_id: int = None):
    teams = db.query(Team).all()

    leaderboard = []
    for team in teams:
        team_sport_scores = db.query(
            Sport.id.label("sport_id"),
            Sport.name.label("sport_name"),
            func.sum(PlayerScore.points).label("total_points")
        ).join(PlayerScore, Sport.id == PlayerScore.sport_id) \
            .join(Player, Player.id == PlayerScore.player_id) \
            .filter(Player.team_id == team.id)

        if sport_id:  # Filter by sport if needed
            team_sport_scores = team_sport_scores.filter(Sport.id == sport_id)

        team_sport_scores = team_sport_scores.group_by(Sport.id).all()

        sports_data = [
            {"sport_name": row.sport_name, "total_points": row.total_points}
            for row in team_sport_scores
        ]

        leaderboard.append({
            "team_name": team.name,
            "sports": sports_data
        })

    return leaderboard

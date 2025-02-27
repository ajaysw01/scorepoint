from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy.sql.functions import coalesce  # ✅ Correct import

from src.api.models.models import Player, Sport, PlayerPoints, Team, TeamPoints
from src.api.models.response_models import PlayerPointsResponse


def submit_player_points(player_id: int, sport_id: int, points: int, db: Session):
    """Submit a player's points and update the total player and team points."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    if not db.query(Sport).filter(Sport.id == sport_id).first():
        raise HTTPException(status_code=404, detail="Sport not found")

    # Insert new player points
    new_points = PlayerPoints(player_id=player_id, sport_id=sport_id, points=points)
    db.add(new_points)
    db.commit()
    db.refresh(new_points)

    # Calculate total player points
    total_player_points = db.query(func.sum(PlayerPoints.points)).filter(
        PlayerPoints.player_id == player_id,
        PlayerPoints.sport_id == sport_id
    ).scalar() or 0

    # Update team points if player is in a team
    team_total_points = 0
    if player.team_id:
        team_total_points = db.query(func.sum(PlayerPoints.points)).join(Player).filter(
            Player.team_id == player.team_id,
            PlayerPoints.sport_id == sport_id
        ).scalar() or 0

        # Update or insert the team points
        existing_team_points = db.query(TeamPoints).filter(
            TeamPoints.team_id == player.team_id, TeamPoints.sport_id == sport_id
        ).first()

        if existing_team_points:
            existing_team_points.team_points += points  # ✅ Corrected field name
        else:
            new_team_points = TeamPoints(
                team_id=player.team_id,
                sport_id=sport_id,
                team_points=team_total_points  # ✅ Corrected field name
            )
            db.add(new_team_points)

        db.commit()

    return {
        "id": new_points.id,
        "player_id": new_points.player_id,
        "sport_id": new_points.sport_id,
        "points": new_points.points,
        "total_player_points": total_player_points,
        "total_team_points": team_total_points
    }


def get_total_player_points(player_id: int, sport_id: int, db: Session) -> PlayerPointsResponse:
    """Retrieve the total points for a player in a specific sport."""
    total_points = db.query(func.sum(PlayerPoints.points)).filter(
        PlayerPoints.player_id == player_id,
        PlayerPoints.sport_id == sport_id
    ).scalar() or 0

    return PlayerPointsResponse(
        player_id=player_id,
        sport_id=sport_id,
        points=total_points,
        total_player_points=total_points
    )


def get_total_team_points(team_id: int, sport_id: int, db: Session):
    """Retrieve the total points for a team in a specific sport."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    total_points = db.query(TeamPoints.team_points).filter(  # ✅ Corrected field name
        TeamPoints.team_id == team_id,
        TeamPoints.sport_id == sport_id
    ).scalar() or 0

    return {"team_id": team_id, "sport_id": sport_id, "total_team_points": total_points}
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Dict, Optional
from src.api.models.models import Team, Sport, TeamPoints
from sqlalchemy.sql.functions import coalesce

def get_leaderboard(db: Session, sport_id: Optional[int] = None) -> List[Dict]:
    """Retrieve leaderboard with sport-wise scores, bonus points, and total points."""
    sports_query = db.query(Sport.id, Sport.name)
    if sport_id:
        sports_query = sports_query.filter(Sport.id == sport_id)
    sports = sports_query.all()

    sport_columns = {sport.id: sport.name for sport in sports}  # {1: "Cricket", 2: "Football"}

    query = db.query(
        Team.id.label("team_id"),
        Team.name.label("team_name"),
        TeamPoints.sport_id,
        coalesce(func.sum(TeamPoints.team_points), 0).label("sport_points"),  # ✅ Use correct field name
        coalesce(func.sum(TeamPoints.bonus_points), 0).label("bonus_points")  # ✅ Use correct field name
    ).join(TeamPoints).group_by(Team.id, Team.name, TeamPoints.sport_id)

    if sport_id:
        query = query.filter(TeamPoints.sport_id == sport_id)

    results = query.all()

    leaderboard = {}
    for row in results:
        team_id = row.team_id
        sport_name = sport_columns.get(row.sport_id, f"Sport {row.sport_id}")
        sport_points = row.sport_points

        if team_id not in leaderboard:
            leaderboard[team_id] = {
                "team_name": row.team_name,
                "bonus_points": 0,
                "total_points": 0,
                "sports_scores": {sport: 0 for sport in sport_columns.values()}
            }

        leaderboard[team_id]["sports_scores"][sport_name] = sport_points
        leaderboard[team_id]["bonus_points"] += row.bonus_points
        leaderboard[team_id]["total_points"] += sport_points

    formatted_leaderboard = sorted([
        {
            "team_name": data["team_name"],
            "sports_scores": data["sports_scores"],
            "bonus_points": data["bonus_points"],
            "total_points": data["total_points"] + data["bonus_points"]
        }
        for data in leaderboard.values()
    ], key=lambda x: x["total_points"], reverse=True)

    return formatted_leaderboard

from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from src.api.models.models import PlayerPoints, TeamPoints, Player, Team, Sport
def submit_player_points(db: Session, payload):
    """Submit points for a player in a specific sport & category."""
    # Fetch Sport and Player separately
    sport = db.query(Sport).filter(Sport.id == payload.sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    player = db.query(Player).filter(Player.id == payload.player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Validate category
    if sport.name in {"Badminton", "Carrom", "Table Tennis"} and not payload.category:
        raise HTTPException(status_code=400, detail="This sport requires a category.")
    if sport.name in {"Cricket", "Darts", "Fun Fridays"} and payload.category:
        raise HTTPException(status_code=400, detail="This sport does not have categories.")

    new_points = PlayerPoints(
        player_id=payload.player_id,
        sport_id=payload.sport_id,
        category=payload.category,
        competition_level=payload.competition_level,
        points=payload.points
    )
    db.add(new_points)
    db.commit()
    db.refresh(new_points)
    return {"message": "Player points submitted successfully", "points_id": new_points.id}


def get_player_points_by_category(db: Session, player_id: int):
    """Get player points categorized by sport category."""
    results = db.query(Sport.name, PlayerPoints.category, func.sum(PlayerPoints.points)) \
        .join(Sport, Sport.id == PlayerPoints.sport_id) \
        .filter(PlayerPoints.player_id == player_id) \
        .group_by(Sport.name, PlayerPoints.category) \
        .all()
    return [{"sport": r[0], "category": r[1], "points": r[2]} for r in results]


def get_player_points_by_sport(db: Session, player_id: int):
    """Get player points for each sport (ignoring category)."""
    results = db.query(Sport.name, func.sum(PlayerPoints.points)) \
        .join(Sport, Sport.id == PlayerPoints.sport_id) \
        .filter(PlayerPoints.player_id == player_id) \
        .group_by(Sport.name) \
        .all()
    return [{"sport": r[0], "points": r[1]} for r in results]


def get_total_player_points(db: Session, player_id: int):
    """Get total points for a player across all sports."""
    total = db.query(func.sum(PlayerPoints.points)) \
        .filter(PlayerPoints.player_id == player_id) \
        .scalar()
    return {"player_id": player_id, "total_points": total or 0}


def assign_team_bonus_points(db: Session, payload):
    """Assign bonus points to a team for a specific sport."""
    team = db.query(Team).filter(Team.id == payload.team_id).first()
    sport = db.query(Sport).filter(Sport.id == payload.sport_id).first()

    if not team or not sport:
        raise HTTPException(status_code=404, detail="Team or Sport not found")

    # Fetch or create TeamPoints
    team_points = db.query(TeamPoints).filter_by(
        team_id=payload.team_id, sport_id=payload.sport_id
    ).first()

    if not team_points:
        team_points = TeamPoints(team_id=payload.team_id, sport_id=payload.sport_id, bonus_points=payload.bonus_points)
        db.add(team_points)
    else:
        team_points.bonus_points += payload.bonus_points

    db.commit()
    return {"message": "Bonus points assigned successfully"}


def get_team_points_by_category(db: Session, team_id: int):
    """Get team points per sport category."""
    results = db.query(Sport.name, TeamPoints.category, func.sum(TeamPoints.team_points)) \
        .join(Sport, Sport.id == TeamPoints.sport_id) \
        .filter(TeamPoints.team_id == team_id) \
        .group_by(Sport.name, TeamPoints.category) \
        .all()
    return [{"sport": r[0], "category": r[1], "points": r[2]} for r in results]


def get_team_points_by_sport(db: Session, team_id: int):
    """Get team points per sport (ignoring category)."""
    results = db.query(Sport.name, func.sum(TeamPoints.team_points + TeamPoints.bonus_points)) \
        .join(Sport, Sport.id == TeamPoints.sport_id) \
        .filter(TeamPoints.team_id == team_id) \
        .group_by(Sport.name) \
        .all()
    return [{"sport": r[0], "points": r[1]} for r in results]


def get_total_team_points(db: Session, team_id: int):
    """Get total points for a team across all sports."""
    total = db.query(func.sum(TeamPoints.team_points + TeamPoints.bonus_points)) \
        .filter(TeamPoints.team_id == team_id) \
        .scalar()
    return {"team_id": team_id, "total_points": total or 0}


def get_leaderboard(db: Session):
    """Get leaderboard with teams and their sport-wise points."""
    results = db.query(Team.name, Sport.name, func.sum(TeamPoints.team_points + TeamPoints.bonus_points)) \
        .join(Sport, Sport.id == TeamPoints.sport_id) \
        .join(Team, Team.id == TeamPoints.team_id) \
        .group_by(Team.name, Sport.name) \
        .all()

    leaderboard = {}
    for team_name, sport, points in results:
        if team_name not in leaderboard:
            leaderboard[team_name] = {"total_points": 0}
        leaderboard[team_name][sport] = points
        leaderboard[team_name]["total_points"] += points

    return [{"team": team, "total_points": data["total_points"], "sports": {k: v for k, v in data.items() if k != "total_points"}} for team, data in leaderboard.items()]

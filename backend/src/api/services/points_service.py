"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI services for managing points of players and teams.
"""
from typing import List, Dict

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from src.api.models.models import PlayerPoints, TeamPoints, Player, Team, Sport, SportCategoryEnum
from src.api.models.request_models import BatchPlayerPointsCreate, CATEGORY_SPORTS, NON_CATEGORY_SPORTS
from src.api.models.response_models import PlayerDetails


def submit_player_points(db: Session, payload):
    """Submit points for a player in a specific sport & category."""
    sport = db.query(Sport).filter(Sport.id == payload.sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    player = db.query(Player).filter(Player.id == payload.player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

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

    team_points = db.query(TeamPoints).filter(
        TeamPoints.team_id == player.team_id,
        TeamPoints.sport_id == payload.sport_id,
        TeamPoints.category == payload.category
    ).first()

    if team_points:
        team_points.team_points += payload.points
    else:
        team_points = TeamPoints(
            team_id=player.team_id,
            sport_id=payload.sport_id,
            category=payload.category,
            team_points=payload.points,
            bonus_points=0
        )
        db.add(team_points)

    db.commit()
    db.refresh(new_points)
    db.refresh(team_points)

    return {
        "message": "Player points submitted successfully",
        "points_id": new_points.id,
        "team_total_points": team_points.team_points + team_points.bonus_points
    }

def submit_batch_player_points(db: Session, payload: BatchPlayerPointsCreate):
    """Submit points for multiple players in a batch."""
    response = []
    try:
        for player_point in payload.player_points:
            # Validate sport
            sport = db.query(Sport).filter(Sport.id == player_point.sport_id).first()
            if not sport:
                raise HTTPException(status_code=404, detail=f"Sport with ID {player_point.sport_id} not found")

            # Validate player
            player = db.query(Player).filter(Player.id == player_point.player_id).first()
            if not player:
                raise HTTPException(status_code=404, detail=f"Player with ID {player_point.player_id} not found")

            # Category validation
            if sport.name in CATEGORY_SPORTS and not player_point.category:
                raise HTTPException(
                    status_code=400,
                    detail=f"Sport '{sport.name}' requires a category for player ID {player_point.player_id}."
                )
            if sport.name in NON_CATEGORY_SPORTS and player_point.category:
                raise HTTPException(
                    status_code=400,
                    detail=f"Sport '{sport.name}' does not support categories for player ID {player_point.player_id}."
                )

            # Create and store player points
            new_points = PlayerPoints(
                player_id=player_point.player_id,
                sport_id=player_point.sport_id,
                category=player_point.category,
                competition_level=player_point.competition_level,
                points=player_point.points
            )
            db.add(new_points)

            # Update or create team points
            team_points = db.query(TeamPoints).filter(
                TeamPoints.team_id == player.team_id,
                TeamPoints.sport_id == player_point.sport_id,
                TeamPoints.category == player_point.category
            ).first()

            if team_points:
                team_points.team_points += player_point.points
            else:
                team_points = TeamPoints(
                    team_id=player.team_id,
                    sport_id=player_point.sport_id,
                    category=player_point.category,
                    team_points=player_point.points,
                    bonus_points=0
                )
                db.add(team_points)

            db.flush()

            response.append({
                "player_id": player_point.player_id,
                "message": "Player points submitted successfully",
                "points_id": new_points.id,
                "team_total_points": team_points.team_points + team_points.bonus_points
            })

        db.commit()
        return response

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to submit player points: {str(e)}")


# def get_player_points_by_category(db: Session, player_id: int):
#     """Get player points categorized by sport category."""
#     results = db.query(Sport.name, PlayerPoints.category, func.sum(PlayerPoints.points)) \
#         .join(Sport, Sport.id == PlayerPoints.sport_id) \
#         .filter(PlayerPoints.player_id == player_id) \
#         .group_by(Sport.name, PlayerPoints.category) \
#         .all()
#     return [{"sport": r[0], "category": r[1], "points": r[2]} for r in results]

def get_player_points_by_category(db: Session, player_id: int):
    """Get player points categorized by sport category with player, team, and matches played."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    team = db.query(Team).filter(Team.id == player.team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    results = (
        db.query(
            Sport.name.label("sport"),
            PlayerPoints.category,
            func.sum(PlayerPoints.points).label("total_points"),
            func.count(PlayerPoints.competition_level).label("matches_played")
        )
        .join(Sport, Sport.id == PlayerPoints.sport_id)
        .filter(PlayerPoints.player_id == player_id)
        .group_by(Sport.name, PlayerPoints.category)
        .all()
    )

    # Format response
    return {
        "player_name": player.name,
        "team_name": team.name,
        "points": [
            {
                "sport": r.sport,
                "category": r.category,
                "points": r.total_points,
                "matches_played": r.matches_played
            } for r in results
        ]
    }


def get_player_points_by_sport(db: Session, player_id: int):
    """Get player points for each sport (ignoring category), including player name and team name."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    team = db.query(Team).filter(Team.id == player.team_id).first()
    team_name = team.name if team else "No Team"

    results = (
        db.query(
            Sport.name.label("sport"),
            func.coalesce(func.sum(PlayerPoints.points), 0).label("total_points")
        )
        .join(Sport, Sport.id == PlayerPoints.sport_id)
        .filter(PlayerPoints.player_id == player_id)
        .group_by(Sport.name)
        .all()
    )

    return {
        "player_name": player.name,
        "team_name": team_name,
        "points": [
            {
                "sport": r.sport,
                "points": r.total_points
            } for r in results
        ]
    }


def get_team_points_by_sport(db: Session, team_id: int):
    """Get team points per sport (ignoring category), including team name."""

    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    results = (
        db.query(
            Sport.name.label("sport"),
            func.coalesce(func.sum(TeamPoints.team_points + TeamPoints.bonus_points), 0).label("total_points")
        )
        .join(Sport, Sport.id == TeamPoints.sport_id)
        .filter(TeamPoints.team_id == team_id)
        .group_by(Sport.name)
        .all()
    )

    return {
        "team_name": team.name,
        "points": [
            {
                "sport": r.sport,
                "points": r.total_points
            } for r in results
        ]
    }




def get_team_points_by_category(db: Session, team_id: int):
    """Get team points per sport category, including team name."""

    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    results = (
        db.query(
            Sport.name.label("sport"),
            TeamPoints.category,
            func.sum(TeamPoints.team_points + TeamPoints.bonus_points).label("total_points")  # Include bonus points
        )
        .join(Sport, Sport.id == TeamPoints.sport_id)
        .filter(TeamPoints.team_id == team_id)
        .group_by(Sport.name, TeamPoints.category)
        .all()
    )

    return {
        "team_name": team.name,
        "points": [
            {
                "sport": r.sport,
                "category": r.category,
                "points": r.total_points
            } for r in results
        ]
    }

def get_total_team_points(db: Session, team_id: int):
    """Get team points per sport (ignoring category), including team name."""

    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    results = (
        db.query(
            Sport.name.label("sport"),
            func.sum(TeamPoints.team_points + TeamPoints.bonus_points).label("total_points")  # Sum of points and bonus points
        )
        .join(Sport, Sport.id == TeamPoints.sport_id)
        .filter(TeamPoints.team_id == team_id)
        .group_by(Sport.name)
        .all()
    )

    return {
        "team_name": team.name,
        "points": [
            {
                "sport": r.sport,
                "points": r.total_points or 0
            } for r in results
        ]
    }



# def get_player_points_by_sport(db: Session, player_id: int):
#     """Get player points for each sport (ignoring category)."""
#     results = db.query(Sport.name, func.sum(PlayerPoints.points)) \
#         .join(Sport, Sport.id == PlayerPoints.sport_id) \
#         .filter(PlayerPoints.player_id == player_id) \
#         .group_by(Sport.name) \
#         .all()
#     return [{"sport": r[0], "points": r[1]} for r in results]
#
#
# def get_total_player_points(db: Session, player_id: int):
#     """Get total points for a player across all sports."""
#     total = db.query(func.sum(PlayerPoints.points)) \
#         .filter(PlayerPoints.player_id == player_id) \
#         .scalar()
#     return {"player_id": player_id, "total_points": total or 0}



def get_total_player_points(db: Session, player_id: int):
    """Get total points for a player across all sports, including player name and team name."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    team = db.query(Team).filter(Team.id == player.team_id).first()
    team_name = team.name if team else "No Team"

    total_points = (
        db.query(func.coalesce(func.sum(PlayerPoints.points), 0))
        .filter(PlayerPoints.player_id == player_id)
        .scalar()
    )

    return {
        "player_id": player_id,
        "player_name": player.name,
        "team_name": team_name,
        "total_points": total_points
    }



def assign_team_bonus_points(db: Session, payload):
    """Assign bonus points to a team for a specific sport."""
    team = db.query(Team).filter(Team.id == payload.team_id).first()
    sport = db.query(Sport).filter(Sport.id == payload.sport_id).first()

    if not team or not sport:
        raise HTTPException(status_code=404, detail="Team or Sport not found")

    team_points = db.query(TeamPoints).filter_by(
        team_id=payload.team_id, sport_id=payload.sport_id
    ).first()

    if not team_points:
        team_points = TeamPoints(team_id=payload.team_id, sport_id=payload.sport_id, bonus_points=payload.bonus_points)
        db.add(team_points)
    else:
        team_points.bonus_points += payload.bonus_points

    db.commit()
    db.refresh(team_points)

    team_total_points = team_points.team_points + team_points.bonus_points

    return {
        "message": "Bonus points assigned successfully",
        "team_total_points": team_total_points
    }



# def get_team_points_by_category(db: Session, team_id: int):
#     """Get team points per sport category."""
#     results = db.query(Sport.name, TeamPoints.category, func.sum(TeamPoints.team_points)) \
#         .join(Sport, Sport.id == TeamPoints.sport_id) \
#         .filter(TeamPoints.team_id == team_id) \
#         .group_by(Sport.name, TeamPoints.category) \
#         .all()
#     return [{"sport": r[0], "category": r[1], "points": r[2]} for r in results]

#
# def get_team_points_by_sport(db: Session, team_id: int):
#     """Get team points per sport (ignoring category)."""
#     results = db.query(
#         Sport.name,
#         func.sum(TeamPoints.team_points + TeamPoints.bonus_points)
#     ).join(Sport, Sport.id == TeamPoints.sport_id) \
#         .filter(TeamPoints.team_id == team_id) \
#         .group_by(Sport.name) \
#         .all()
#     return [{"sport": r[0], "points": r[1] or 0} for r in results]


# def get_total_team_points(db: Session, team_id: int):
#     """Get total points for a team across all sports."""
#     total = db.query(
#         func.sum(TeamPoints.team_points + TeamPoints.bonus_points)
#     ).filter(TeamPoints.team_id == team_id).scalar()
#
#     return {"team_id": team_id, "total_points": total or 0}


def get_leaderboard(db: Session):
    """Get leaderboard with teams and their sport-wise points."""
    results = db.query(
        Team.name,
        Sport.name,
        func.sum(TeamPoints.team_points + TeamPoints.bonus_points)
    ).join(Sport, Sport.id == TeamPoints.sport_id) \
        .join(Team, Team.id == TeamPoints.team_id) \
        .group_by(Team.name, Sport.name) \
        .all()

    leaderboard = {}
    for team_name, sport, points in results:
        if team_name not in leaderboard:
            leaderboard[team_name] = {"total_points": 0}
        leaderboard[team_name][sport] = points or 0
        leaderboard[team_name]["total_points"] += points or 0

    return [
        {
            "team": team,
            "total_points": data["total_points"],
            "sports": {k: v for k, v in data.items() if k != "total_points"}
        }
        for team, data in leaderboard.items()
    ]


def get_player_rankings(db: Session):
    """Get player rankings grouped by sport and category, counting competition levels."""
    results = (
        db.query(
            Sport.name.label("sport_name"),
            PlayerPoints.category,
            Player.name,
            Team.name.label("team"),
            func.count(PlayerPoints.competition_level).label("matches_played"),
            func.sum(PlayerPoints.points).label("total_points")
        )
        .join(Sport, Sport.id == PlayerPoints.sport_id)
        .join(Player, Player.id == PlayerPoints.player_id)
        .join(Team, Team.id == Player.team_id)
        .group_by(Sport.name, PlayerPoints.category, Player.name, Team.name)
        .order_by(Sport.name, PlayerPoints.category, func.sum(PlayerPoints.points).desc())
        .all()
    )

    sport_rankings = {}
    for sport_name, category, player_name, team_name, matches_played, total_points in results:
        if sport_name not in sport_rankings:
            sport_rankings[sport_name] = {}

        if category not in sport_rankings[sport_name]:
            sport_rankings[sport_name][category] = {"playerData": []}

        sport_rankings[sport_name][category]["playerData"].append({
            "name": player_name,
            "team": team_name,
            "matches_played": matches_played,
            "points": total_points
        })

    return sport_rankings


#
# def fetch_player_points_by_sport(
#     sport_id: int, category: SportCategoryEnum | None, db: Session
# ) -> List[PlayerDetails]:
#
#     # Adjust category check for non-category sports
#     points_query = (
#         db.query(Player.id, Player.name, Team.id.label("team_id"), Team.name.label("team_name"), PlayerPoints.points)
#         .join(PlayerPoints, Player.id == PlayerPoints.player_id)
#         .join(Team, Player.team_id == Team.id)
#         .filter(PlayerPoints.sport_id == sport_id)
#     )
#
#     if category is None or category == SportCategoryEnum.NONE:
#         points_query = points_query.filter(PlayerPoints.category.is_(None))
#     else:
#         points_query = points_query.filter(PlayerPoints.category == category)
#
#     points_query = points_query.all()
#
#     if not points_query:
#         raise HTTPException(status_code=404, detail="No player points found for the given sport and category")
#
#     return [
#         {"player_id": player_id, "name": player_name, "team_id": team_id, "team_name": team_name, "points": points}
#         for player_id, player_name, team_id, team_name, points in points_query
#     ]


def fetch_player_points_by_sport(
    sport_id: int, category: SportCategoryEnum | None, db: Session
) -> List[PlayerDetails]:

    # Adjust category check for non-category sports
    points_query = (
        db.query(
            Player.id,
            Player.name,
            Team.id.label("team_id"),
            Team.name.label("team_name"),
            func.sum(PlayerPoints.points).label("total_points")  # Properly labeled
        )
        .join(PlayerPoints, Player.id == PlayerPoints.player_id)
        .join(Team, Player.team_id == Team.id)
        .filter(PlayerPoints.sport_id == sport_id)
    )

    if category is None or category == SportCategoryEnum.NONE:
        points_query = points_query.filter(PlayerPoints.category.is_(None))
    else:
        points_query = points_query.filter(PlayerPoints.category == category)

    # Group by player to get total points across matches
    points_query = points_query.group_by(Player.id, Player.name, Team.id, Team.name).all()

    if not points_query:
        raise HTTPException(status_code=404, detail="No player points found for the given sport and category")

    return [
        {
            "player_id": player_id,
            "name": player_name,
            "team_id": team_id,
            "team_name": team_name,
            "total_points": total_points
        }
        for player_id, player_name, team_id, team_name, total_points in points_query
    ]


# player points history
def fetch_player_history(player_id: int, db: Session) -> Dict:
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    team = db.query(Team).filter(Team.id == player.team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    player_points = (
        db.query(PlayerPoints, Sport.name)
        .join(Sport, PlayerPoints.sport_id == Sport.id)
        .filter(PlayerPoints.player_id == player_id)
        .all()
    )

    player_history = {}
    total_player_points = 0

    for points, sport_name in player_points:
        category = points.category.value if points.category else "none"
        competition_points = {"competition_level": points.competition_level, "points": points.points}

        # Initialize sport and category if not already present
        if sport_name not in player_history:
            player_history[sport_name] = {
                "sport_total_points": 0,
                "categories": {}
            }
        if category not in player_history[sport_name]["categories"]:
            player_history[sport_name]["categories"][category] = {
                "category_total_points": 0,
                "competitions": []
            }

        player_history[sport_name]["categories"][category]["competitions"].append(competition_points)
        player_history[sport_name]["categories"][category]["category_total_points"] += points.points
        player_history[sport_name]["sport_total_points"] += points.points
        total_player_points += points.points

    return {
        "player_name": player.name,
        "team_name": team.name,
        "player_total_points": total_player_points,
        "player_points": player_history
    }

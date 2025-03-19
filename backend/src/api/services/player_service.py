"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI services for managing players.
"""

from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Player, PlayerPoints, TeamPoints
from src.api.models.request_models import PlayerUpdate2

def update_player_details(db: Session, player_id: int, payload: PlayerUpdate2):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    player.name = payload.name
    db.commit()
    db.refresh(player)

    return player

# still in dev, some problems are there
def delete_player(db: Session, player_id: int):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")

    # Get the team ID and player points before deleting the player
    team_id = player.team_id
    player_points = db.query(func.sum(PlayerPoints.points)).filter(PlayerPoints.player_id == player_id).scalar() or 0

    # Delete player points explicitly
    db.query(PlayerPoints).filter(PlayerPoints.player_id == player_id).delete()

    # Delete the player
    db.delete(player)
    db.commit()

    # Deduct the deleted player's points from the team's total points
    team_points = db.query(TeamPoints).filter(TeamPoints.team_id == team_id).first()
    if team_points:
        team_points.team_points = max(0, team_points.team_points - player_points)
        db.commit()

    return {"message": "Player and associated points deleted successfully"}


def get_all_players(db: Session):
    players = db.query(Player).all()
    return players

def get_player_by_id(db: Session, player_id: int):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

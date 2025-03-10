"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI services for managing teams.
"""

import logging
from typing import List

from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Team, User, Player, Sport, TeamPoints
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse, PlayerResponse, PlayerResponse2

logger = logging.getLogger(__name__)

def create_team(db: Session, team_data: TeamCreate, id: int):
    existing_team = db.query(Team).filter(Team.name == team_data.name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team name already exists")

    team = Team(name=team_data.name, user_id=id)
    db.add(team)
    db.commit()
    db.refresh(team)

    players = []
    for player_data in team_data.players:
        player = Player(name=player_data.name, team_id=team.id)
        db.add(player)
        db.commit()
        db.refresh(player)
        players.append(player)

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_points=0,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in players]
    )

def get_teams(db: Session):
    teams = db.query(Team).all()
    return [
        TeamResponse(
            id=team.id,
            name=team.name,
            total_points=sum(score.team_points + score.bonus_points for score in team.scores),
            players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
        )
        for team in teams
    ]

def get_team_by_id(db: Session, team_id: int):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    total_points = sum(score.team_points + score.bonus_points for score in team.scores)

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_points=total_points,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
    )

def update_team(db: Session, team_id: int, team_data: TeamUpdate, user: User):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    team.name = team_data.name
    db.commit()

    existing_players = {p.name for p in team.players}
    new_players = {p.name for p in team_data.players}

    db.query(Player).filter(Player.team_id == team_id, Player.name.not_in(new_players)).delete(synchronize_session=False)

    new_entries = [Player(name=p.name, team_id=team.id) for p in team_data.players if p.name not in existing_players]
    db.bulk_save_objects(new_entries)

    db.commit()
    db.refresh(team)

    total_points = sum(score.team_points + score.bonus_points for score in team.scores)

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_points=total_points,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
    )

def delete_team(db: Session, team_id: int, user: User):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    db.query(Player).filter(Player.team_id == team_id).delete(synchronize_session=False)
    db.query(TeamPoints).filter(TeamPoints.team_id == team_id).delete(synchronize_session=False)
    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully"}

def get_all_players_service(db: Session) -> List[PlayerResponse2]:
    players_query = (
        db.query(Player.id, Player.name, Team.id.label("team_id"), Team.name.label("team_name"))
        .join(Team, Player.team_id == Team.id)
        .all()
    )

    if not players_query:
        raise HTTPException(status_code=404, detail="No players found")

    return [{"player_id": player_id, "name": player_name, "team_id": team_id, "team_name": team_name}
            for player_id, player_name, team_id, team_name in players_query]



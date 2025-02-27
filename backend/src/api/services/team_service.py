import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException

from src.api.models.models import Team, User, Player, Sport, TeamPoints
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse, PlayerResponse

logger = logging.getLogger(__name__)

def create_team(db: Session, team_data: TeamCreate, user_id: int):
    # ✅ Check for duplicate team name
    existing_team = db.query(Team).filter(Team.name == team_data.name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team name already exists")

    team = Team(name=team_data.name, user_id=user_id)
    db.add(team)
    db.commit()
    db.refresh(team)

    players = []
    for player_data in team_data.players:
        player = Player(name=player_data.name, team_id=team.id)  # ✅ Assign team_id
        db.add(player)
        db.commit()
        db.refresh(player)
        players.append(player)

    return {
        "id": team.id,
        "name": team.name,
        "total_points": 0,
        "players": [{"id": p.id, "name": p.name, "team_id": p.team_id} for p in players]  # ✅ Include `team_id`
    }



def get_teams(db: Session):
    teams = db.query(Team).all()
    return [
        {
            "id": team.id,
            "name": team.name,
            "total_points": sum(score.team_points + score.bonus_points for score in team.scores),
            "players": [{"id": p.id, "name": p.name, "team_id": p.team_id} for p in team.players],  # ✅ Return objects
        }
        for team in teams
    ]


def get_team_by_id(db: Session, team_id: int):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    total_points = sum(score.team_points + score.bonus_points for score in team.scores)

    return {
        "id": team.id,
        "name": team.name,
        "total_points": total_points,
        "players": [{"id": p.id, "name": p.name, "team_id": p.team_id} for p in team.players],  # ✅ Return objects
    }


def update_team(db: Session, team_id: int, team_data: TeamUpdate, user: User):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to update this team")

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

    return {
        "id": team.id,
        "name": team.name,
        "total_points": total_points,
        "players": [{"id": p.id, "name": p.name, "team_id": p.team_id} for p in team.players],  # ✅ Return objects
    }

def delete_team(db: Session, team_id: int, user: User):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this team")

    db.query(Player).filter(Player.team_id == team_id).delete(synchronize_session=False)
    db.query(TeamPoints).filter(TeamPoints.team_id == team_id).delete(synchronize_session=False)
    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully"}

def add_team_bonus(db: Session, team_id: int, sport_id: int, bonus: int):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    score = db.query(TeamPoints).filter(TeamPoints.team_id == team_id, TeamPoints.sport_id == sport_id).first()
    if score:
        score.bonus_points += bonus  # ✅ Only adding bonus points
    else:
        score = TeamPoints(team_id=team_id, sport_id=sport_id, team_points=0, bonus_points=bonus)
        db.add(score)

    db.commit()
    db.refresh(score)

    total_score = sum(s.team_points + s.bonus_points for s in team.scores)  # ✅ Total across all sports
    sport_specific_score = score.team_points + score.bonus_points  # ✅ Total for this sport

    return {
        "message": f"Bonus updated: {bonus} points for team '{team.name}' in '{sport.name}'.",
        "total_score": total_score,
        "sport_specific_score": sport_specific_score
    }
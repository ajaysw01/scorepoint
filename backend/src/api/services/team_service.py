from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Team, User, Player, Sport, TeamBonus
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse, PlayerResponse

def create_team(db: Session, team_data: TeamCreate, user_id: int) -> TeamResponse:
    existing_team = db.query(Team).filter(Team.name == team_data.name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team with this name already exists")

    team = Team(name=team_data.name, user_id=user_id)
    db.add(team)
    db.commit()
    db.refresh(team)

    players = []
    for player_data in team_data.players:
        player = Player(name=player_data.name, team_id=team.id)
        db.add(player)
        players.append(player)

    db.commit()

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_bonus=0,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in players]
    )

def get_teams(db: Session) -> list[TeamResponse]:
    teams = db.query(Team).all()
    return [
        TeamResponse(
            id=team.id,
            name=team.name,
            total_bonus=sum(b.bonus_points for b in team.bonuses),
            players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
        )
        for team in teams
    ]

def get_team_by_id(db: Session, team_id: int) -> TeamResponse:
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    total_bonus = sum(b.bonus_points for b in team.bonuses)

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_bonus=total_bonus,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
    )

def update_team(db: Session, team_id: int, team_data: TeamUpdate, user: User) -> TeamResponse:
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to update this team")

    team.name = team_data.name

    existing_players = {p.name: p for p in team.players}
    new_players = {p.name: p for p in team_data.players}

    for player in list(existing_players.values()):
        if player.name not in new_players:
            db.delete(player)

    for player_name, player_data in new_players.items():
        if player_name not in existing_players:
            new_player = Player(name=player_data.name, team_id=team.id)
            db.add(new_player)

    db.commit()
    db.refresh(team)

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_bonus=sum(b.bonus_points for b in team.bonuses),
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
    )

def delete_team(db: Session, team_id: int, user: User):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this team")

    db.query(Player).filter(Player.team_id == team_id).delete()

    db.query(TeamBonus).filter(TeamBonus.team_id == team_id).delete()

    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully"}


def add_team_bonus(db: Session, team_id: int, sport_id: int, points: int) -> dict:

    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    all_sports = db.query(Sport).all()

    sport = db.query(Sport).filter(Sport.id == int(sport_id)).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    existing_bonus = db.query(TeamBonus).filter(
        TeamBonus.team_id == team_id, TeamBonus.sport_id == sport_id
    ).first()

    if existing_bonus:
        existing_bonus.bonus_points += points
        db.commit()
        db.refresh(existing_bonus)
    else:
        new_bonus = TeamBonus(team_id=team_id, sport_id=sport_id, bonus_points=points)
        db.add(new_bonus)
        db.commit()
        db.refresh(new_bonus)

    return {
        "message": f"Bonus of {points} points added to team {team.name} for sport {sport.name}.",
        "total_bonus": existing_bonus.bonus_points if existing_bonus else new_bonus.bonus_points
    }

from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Team, User, Player, Sport, TeamBonus
from src.api.models.request_models import TeamCreate, TeamUpdate
from src.api.models.response_models import TeamResponse, PlayerResponse

def create_team(db: Session, team_data: TeamCreate, user_id: int) -> TeamResponse:
    existing_team = db.query(Team).filter(Team.name == team_data.name).first()
    if existing_team:
        raise HTTPException(status_code=400, detail="Team with this name already exists")

    # ✅ Create Team
    team = Team(name=team_data.name, user_id=user_id)
    db.add(team)
    db.commit()
    db.refresh(team)  # Ensure team ID is available

    # ✅ Add Players to Team
    players = []
    for player_data in team_data.players:
        player = Player(name=player_data.name, team_id=team.id)
        db.add(player)
        players.append(player)

    db.commit()  # ✅ Commit players

    return TeamResponse(
        id=team.id,
        name=team.name,
        total_bonus=0,  # 🚀 Default 0 (we calculate later when querying)
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in players]
    )

def get_teams(db: Session) -> list[TeamResponse]:
    """Get all teams with players and total bonus points."""
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
    """Get a single team with players and total bonus points."""
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
    """Update a team's name and modify players (Only team owner can update)."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to update this team")

    team.name = team_data.name

    existing_players = {p.name: p for p in team.players}
    new_players = {p.name: p for p in team_data.players}

    # Remove players not in request
    for player in list(existing_players.values()):
        if player.name not in new_players:
            db.delete(player)

    # Add new players
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
    # Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    # Optional: Check if the user has permission to delete the team (if applicable)
    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this team")

    # ✅ Delete all players in the team
    db.query(Player).filter(Player.team_id == team_id).delete()

    # ✅ Delete related bonuses
    db.query(TeamBonus).filter(TeamBonus.team_id == team_id).delete()

    # ✅ Now delete the team
    db.delete(team)
    db.commit()

    return {"message": "Team deleted successfully"}


def add_team_bonus(db: Session, team_id: int, sport_id: int, points: int) -> dict:
    """Add bonus points to a team for a specific sport."""

    # ✅ Check if team exists
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    all_sports = db.query(Sport).all()
    print(f"DEBUG: All Sports IDs -> {[s.id for s in all_sports]}")  # Print sport IDs
    print(f"DEBUG: Type of sport_id -> {type(sport_id)}, Value -> {sport_id}")

    # ✅ Check if sport exists
    sport = db.query(Sport).filter(Sport.id == int(sport_id)).first()
    print(f"DEBUG: Found Sport -> {sport}")
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    # ✅ Check if a bonus record already exists
    existing_bonus = db.query(TeamBonus).filter(
        TeamBonus.team_id == team_id, TeamBonus.sport_id == sport_id
    ).first()

    if existing_bonus:
        existing_bonus.bonus_points += points
        db.commit()
        db.refresh(existing_bonus)  # ✅ Refresh the updated row
    else:
        new_bonus = TeamBonus(team_id=team_id, sport_id=sport_id, bonus_points=points)
        db.add(new_bonus)
        db.commit()
        db.refresh(new_bonus)  # ✅ Refresh the new entry

    return {
        "message": f"Bonus of {points} points added to team {team.name} for sport {sport.name}.",
        "total_bonus": existing_bonus.bonus_points if existing_bonus else new_bonus.bonus_points
    }

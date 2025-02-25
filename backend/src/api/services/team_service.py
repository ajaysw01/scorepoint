from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Team, User, Player
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
    db.refresh(team)  # Refresh to get the generated ID

    # ✅ Add Players
    players = []
    for player_data in team_data.players:
        player = Player(name=player_data.name, team_id=team.id)
        db.add(player)
        db.commit()  # Commit each player
        db.refresh(player)  # Refresh player to ensure it's fetched
        players.append(player)

    return TeamResponse(
        id=team.id,
        name=team.name,
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in players]
    )


def get_teams(db: Session) -> list[TeamResponse]:
    """Get all teams with their players."""
    teams = db.query(Team).all()
    return [
        TeamResponse(
            id=team.id,
            name=team.name,
            players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
        )
        for team in teams
    ]


def get_team_by_id(db: Session, team_id: int) -> TeamResponse:
    """Get a team by ID including its players."""
    team = db.query(Team).filter(Team.id == team_id).first()

    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    return TeamResponse(
        id=team.id,
        name=team.name,
        players=[PlayerResponse(id=player.id, name=player.name, team_id=player.team_id) for player in team.players]
    )


def update_team(db: Session, team_id: int, team_data: TeamUpdate, user: User) -> TeamResponse:
    """Update a team's name and modify players."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to update this team")

    # ✅ Update Team Name
    team.name = team_data.name

    # ✅ Update Players
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
        players=[PlayerResponse(id=p.id, name=p.name, team_id=p.team_id) for p in team.players]
    )


def delete_team(db: Session, team_id: int, user: User) -> dict:
    """Delete a team along with its players (Only the owner can delete)."""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this team")

    # ✅ Delete Players First
    db.query(Player).filter(Player.team_id == team.id).delete()

    # ✅ Delete Team
    db.delete(team)
    db.commit()

    return {"message": "Team and players deleted successfully"}


from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.api.database.db_conn import get_db
from src.api.models.models import User, Player, PlayerPoints, Team, TeamPoints, Sport  
from src.api.auth.oauth2 import get_current_user

router = APIRouter()

@router.get("/search", response_model=List[dict])
def search_player(
    name: str = Query(..., description="Player name to search"),
    db: Session = Depends(get_db)
):
    """
    Search for players by name and return details including sport, player points, and team points.
    If only some fields are available, only return the present ones.
    """
    try:
        query = (
            db.query(
                Player.name,
                Sport.name.label("sport_name"),
                PlayerPoints.points.label("player_points"),
                TeamPoints.team_points.label("team_points")
            )
            .join(PlayerPoints, Player.id == PlayerPoints.player_id, isouter=True)
            .join(Sport, PlayerPoints.sport_id == Sport.id, isouter=True)
            .join(Team, Player.team_id == Team.id, isouter=True)
            .join(TeamPoints, (Team.id == TeamPoints.team_id) & (Sport.id == TeamPoints.sport_id), isouter=True)
            .filter(Player.name.ilike(f"%{name}%"))
        )

        result = db.execute(query).fetchall()

        if not result:
            raise HTTPException(status_code=404, detail="No players found")

        return [
            {key: value for key, value in {
                "player_name": row[0],
                "sport_name": row[1],
                "player_points": row[2],
                "team_points": row[3]
            }.items() if value is not None}
            for row in result
        ]

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")



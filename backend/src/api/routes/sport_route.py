from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.models.models import User
from src.api.services.sport_service import (
    create_sport, get_all_sports, get_sport_by_id, update_sport, delete_sport
)
from src.api.models.request_models import SportCreate, SportUpdate
from src.api.models.response_models import SportResponse

router = APIRouter()

def require_admin(user: User = Depends(get_current_user)):
    """Dependency to check if the user is an admin."""
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user  # Return user if needed in route


@router.post("/", response_model=SportResponse)
def create_sport_route(
    sport_data: SportCreate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can create sports
):
    return create_sport(sport_data, db)


@router.get("/", response_model=List[SportResponse])
def get_sports_route(db: Session = Depends(get_db)):
    return get_all_sports(db)


@router.get("/{sport_id}", response_model=SportResponse)
def get_sport_route(sport_id: int, db: Session = Depends(get_db)):
    return get_sport_by_id(db, sport_id)


@router.put("/{sport_id}", response_model=SportResponse)
def update_sport_route(
    sport_id: int,
    sport_data: SportUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can update sports
):
    return update_sport(sport_id, sport_data, db)


@router.delete("/{sport_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sport_route(
    sport_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)  # ✅ Only admins can delete sports
):
    delete_sport(sport_id, db)
    return  # No response body needed for 204

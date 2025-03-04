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
from src.api.utils.dependencies import require_admin

router = APIRouter()

@router.post("/", response_model=SportResponse)
def create_sport_route(
    sport_data: SportCreate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)
):
    """Create a new sport"""
    return create_sport(sport_data, db)

@router.get("/", response_model=List[SportResponse], response_model_exclude_unset=True)
def get_sports_route(db: Session = Depends(get_db)):
    """Fetch all sports"""
    return get_all_sports(db)

@router.get("/{sport_id}", response_model=SportResponse, response_model_exclude_unset=True)
def get_sport_route(sport_id: int, db: Session = Depends(get_db)):
    """Fetch sport by ID"""
    return get_sport_by_id(db, sport_id)

@router.put("/{sport_id}", response_model=SportResponse, response_model_exclude_unset=True)
def update_sport_route(
    sport_id: int,
    sport_data: SportUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)
):
    """Update sport details"""
    return update_sport(sport_id, sport_data, db)

@router.delete("/{sport_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sport_route(
    sport_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(require_admin)
):
    """Delete a sport"""
    delete_sport(sport_id, db)

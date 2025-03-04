"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI services for managing sports.
"""

from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Sport, TeamPoints, PlayerPoints
from src.api.models.request_models import SportCreate, SportUpdate


def create_sport(sport_data: SportCreate, db: Session):
    """Create a new sport"""

    sport_name = sport_data.name.strip()
    existing_sport = db.query(Sport).filter(Sport.name.ilike(sport_name)).first()

    if existing_sport:
        raise HTTPException(status_code=400, detail="Sport already exists")

    new_sport = Sport(name=sport_name)
    db.add(new_sport)
    db.commit()
    db.refresh(new_sport)
    return new_sport


def get_all_sports(db: Session):
    """Fetch all sports"""
    return db.query(Sport).all()


def get_sport_by_id(db: Session, sport_id: int):
    """Fetch sport by ID"""
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")
    return sport


def update_sport(sport_id: int, sport_data: SportUpdate, db: Session):
    """Update sport details"""
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    if sport_data.name:
        sport_name = sport_data.name.strip()
        existing_sport = db.query(Sport).filter(Sport.name.ilike(sport_name), Sport.id != sport_id).first()
        if existing_sport:
            raise HTTPException(status_code=400, detail="Sport name already exists")
        sport.name = sport_name

    db.commit()
    db.refresh(sport)
    return sport


def delete_sport(sport_id: int, db: Session):
    """Delete sport if no related team or player scores exist"""
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    if db.query(TeamPoints).filter(TeamPoints.sport_id == sport_id).first():
        raise HTTPException(status_code=400, detail="Cannot delete sport with existing team scores")

    if db.query(PlayerPoints).filter(PlayerPoints.sport_id == sport_id).first():
        raise HTTPException(status_code=400, detail="Cannot delete sport with existing player scores")

    db.delete(sport)
    db.commit()
    return None

"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI services for managing the match schedules.
"""
from typing import List

from sqlalchemy.orm import Session
from src.api.models.models import MatchSchedule, SportCategoryEnum
from src.api.models.request_models import MatchScheduleCreate, MatchScheduleUpdate

def create_match(db: Session, match_data: MatchScheduleCreate):
    new_match = MatchSchedule(**match_data.dict())
    db.add(new_match)
    db.commit()
    db.refresh(new_match)
    return new_match

def get_match(db: Session, match_id: int):
    return db.query(MatchSchedule).filter(MatchSchedule.id == match_id).first()

def get_all_matches(db: Session, skip: int = 0, limit: int = 10):
    return db.query(MatchSchedule).offset(skip).limit(limit).all()

def update_match(db: Session, match_id: int, match_data: MatchScheduleCreate):
    match = db.query(MatchSchedule).filter(MatchSchedule.id == match_id).first()
    if not match:
        return None
    for key, value in match_data.dict().items():
        setattr(match, key, value)
    db.commit()
    db.refresh(match)
    return match


def patch_match(db: Session, match_id: int, match_data: MatchScheduleUpdate):
    match = db.query(MatchSchedule).filter(MatchSchedule.id == match_id).first()
    if not match:
        return None
    for key, value in match_data.dict(exclude_unset=True).items():
        setattr(match, key, value)
    db.commit()
    db.refresh(match)
    return match

def delete_match(db: Session, match_id: int):
    match = db.query(MatchSchedule).filter(MatchSchedule.id == match_id).first()
    if not match:
        return None
    db.delete(match)
    db.commit()
    return match


def get_matches_by_sport_and_category_service(db: Session, sport: str, category: SportCategoryEnum):
    return db.query(MatchSchedule).filter(
        MatchSchedule.sport == sport,
        MatchSchedule.category == category
    ).all()


def create_matches_batch(db: Session, matches: List[MatchScheduleCreate]):
    match_objs = [MatchSchedule(**match.dict()) for match in matches]
    db.add_all(match_objs)
    db.commit()
    for match in match_objs:
        db.refresh(match)
    return match_objs

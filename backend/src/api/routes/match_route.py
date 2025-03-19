"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI endpoints for managing match schedules.
"""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.models.models import SportCategoryEnum
from src.api.models.response_models import MatchScheduleResponse
from src.api.services.match_service import (
    create_match,
    get_match,
    get_all_matches,
    update_match,
    patch_match,
    delete_match, get_matches_by_sport_and_category_service, create_matches_batch
)
from src.api.models.request_models import MatchScheduleCreate, MatchScheduleUpdate
from src.api.utils.dependencies import require_admin

router = APIRouter()

@router.post("/", response_model=MatchScheduleResponse, dependencies=[Depends(require_admin)])
def create_match_route(data: MatchScheduleCreate, db: Session = Depends(get_db)):
    return create_match(db, data)

# Get a match by ID
@router.get("/{match_id}", response_model=MatchScheduleResponse)
def get_match_route(match_id: int, db: Session = Depends(get_db)):
    match = get_match(db, match_id)
    if not match:
        raise HTTPException(status_code=404, detail="Match schedule not found")
    return match

# Get all matches
@router.get("/", response_model=list[MatchScheduleResponse])
def get_all_matches_route(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_all_matches(db, skip=skip, limit=limit)

# Update a match (Admin only)
@router.put("/{match_id}", response_model=MatchScheduleResponse, dependencies=[Depends(require_admin)])
def update_match_route(match_id: int, data: MatchScheduleCreate, db: Session = Depends(get_db)):
    updated_match = update_match(db, match_id, data)
    if not updated_match:
        raise HTTPException(status_code=404, detail="Match schedule not found")
    return updated_match


# Patch a match (Admin only)
@router.patch("/{match_id}", response_model=MatchScheduleResponse, dependencies=[Depends(require_admin)])
def patch_match_route(match_id: int, data: MatchScheduleUpdate, db: Session = Depends(get_db)):
    patched_match = patch_match(db, match_id, data)
    if not patched_match:
        raise HTTPException(status_code=404, detail="Match schedule not found")
    return patched_match


# Delete a match (Admin only)
@router.delete("/{match_id}", response_model=dict, dependencies=[Depends(require_admin)])
def delete_match_route(match_id: int, db: Session = Depends(get_db)):
    deleted_match = delete_match(db, match_id)
    if not deleted_match:
        raise HTTPException(status_code=404, detail="Match schedule not found")
    return {"detail": "Match schedule deleted successfully"}


@router.get("/{sport}/{category}", response_model=List[MatchScheduleResponse])
def get_matches_by_sport_and_category(
    sport: str, category: SportCategoryEnum, db: Session = Depends(get_db)
):
    matches = get_matches_by_sport_and_category_service(db, sport, category)
    if not matches:
        raise HTTPException(status_code=404, detail="No matches found for the given sport and category")
    return matches


@router.post("/batch/schedules", response_model=List[MatchScheduleResponse], dependencies=[Depends(require_admin)])
def create_matches_batch_route(matches: List[MatchScheduleCreate], db: Session = Depends(get_db)):
    created_matches = create_matches_batch(db, matches)
    return created_matches

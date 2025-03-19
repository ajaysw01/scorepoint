"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains FastAPI endpoints for managing players.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.api.database.db_conn import get_db
from src.api.services.player_service import (
    update_player_details,
    delete_player,
    get_all_players,
    get_player_by_id
)
from src.api.models.request_models import PlayerUpdate2
from src.api.models.response_models import PlayerResponse3

router = APIRouter()

@router.put("/{player_id}", response_model=PlayerResponse3)
def update_player(player_id: int, payload: PlayerUpdate2, db: Session = Depends(get_db)):
    return update_player_details(db, player_id, payload)

@router.delete("/{player_id}")
def delete_player_route(player_id: int, db: Session = Depends(get_db)):
    return delete_player(db, player_id)

@router.get("/", response_model=list[PlayerResponse3])
def get_all_players_route(db: Session = Depends(get_db)):
    return get_all_players(db)

@router.get("/{player_id}", response_model=PlayerResponse3)
def get_player_by_id_route(player_id: int, db: Session = Depends(get_db)):
    return get_player_by_id(db, player_id)

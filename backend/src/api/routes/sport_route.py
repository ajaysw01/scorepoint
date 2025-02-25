from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.api.auth.oauth2 import get_current_user
from src.api.database.db_conn import get_db
from src.api.services.sport_service import (
    create_sport,
    get_all_sports,
    get_sport_by_id,
    update_sport,
    delete_sport,
)
from src.api.models.request_models import SportCreate, SportUpdate
from src.api.models.response_models import SportResponse

router = APIRouter(prefix="/api/sports", tags=["Sports"])


# ✅ Create a Sport
@router.post("/", response_model=SportResponse)
def create_sport_route(sport_data: SportCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return create_sport(sport_data, db)


# ✅ Get All Sports
@router.get("/", response_model=list[SportResponse])
def get_sports_route(db: Session = Depends(get_db)):
    return get_all_sports(db)


# ✅ Get a Sport by ID
@router.get("/{sport_id}", response_model=SportResponse)
def get_sport_route(sport_id: int, db: Session = Depends(get_db)):
    return get_sport_by_id(sport_id, db)


# ✅ Update a Sport
@router.put("/{sport_id}", response_model=SportResponse)
def update_sport_route(sport_id: int, sport_data: SportUpdate, db: Session = Depends(get_db),
                       user: dict = Depends(get_current_user)):
    return update_sport(sport_id, sport_data, db)


# ✅ Delete a Sport
@router.delete("/{sport_id}")
def delete_sport_route(sport_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return delete_sport(sport_id, db)

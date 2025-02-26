from sqlalchemy.orm import Session
from fastapi import HTTPException
from src.api.models.models import Sport
from src.api.models.request_models import SportCreate, SportUpdate


# ✅ Create a Sport
def create_sport(sport_data: SportCreate, db: Session):


    new_sport = Sport(name=sport_data.name, category=sport_data.category)
    db.add(new_sport)
    db.commit()
    db.refresh(new_sport)
    return new_sport


# ✅ Get All Sports
def get_all_sports(db: Session):
    return db.query(Sport).all()


# ✅ Get a Sport by ID
def get_sport_by_id(sport_id: int, db: Session):
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")
    return sport


# ✅ Update a Sport
def update_sport(sport_id: int, sport_data: SportUpdate, db: Session):
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    sport.name = sport_data.name
    sport.category = sport_data.category
    db.commit()
    db.refresh(sport)
    return sport


# ✅ Delete a Sport
def delete_sport(sport_id: int, db: Session):
    sport = db.query(Sport).filter(Sport.id == sport_id).first()
    if not sport:
        raise HTTPException(status_code=404, detail="Sport not found")

    db.delete(sport)
    db.commit()
    return {"message": "Sport deleted successfully"}

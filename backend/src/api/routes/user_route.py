import logging
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.api.database import db_conn
from src.api.models import request_models, response_models
from src.api.services import user_service

router = APIRouter()

get_db = db_conn.get_db

logger = logging.getLogger(__name__)

@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=response_models.UserResponse)
def create_user(request: request_models.UserRegister, db: Session = Depends(get_db)):
    logger.info(f"Registering user with email: {request.email}")
    user = user_service.create(request, db)
    logger.info(f"User registered successfully: {user.email}")

    return response_models.UserResponse(
        name=user.name,
        email=user.email,
        message="User saved Successfully!"
    )
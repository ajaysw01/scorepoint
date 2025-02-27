import logging
from datetime import timedelta

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from src.api.database import db_conn
from src.api.models import models
from src.api.utils import hashing
from src.api.customexception.exceptions import InvalidCredentialsException, UserNotFoundException
from src.api.auth import jwt_token
from src.api.configurations import  config

settings = config.get_settings()

router = APIRouter(tags=["Authentication"])

logger = logging.getLogger(__name__)

ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES  # Move to a config file if needed

@router.post("/login")
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db_conn.get_db)):
    try:
        user = db.query(models.User).filter(models.User.email == request.username).first()
        if not user:
            raise UserNotFoundException()

        if not hashing.Hash.verify(request.password, user.hashed_password):
            raise InvalidCredentialsException()

        # Generate JWT Token
        access_token = jwt_token.create_access_token(
            data={"sub": user.email, "role": user.role},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )

        return JSONResponse(
            status_code=200,
            content={"access_token": access_token, "message": "Login Successful!"}
        )

    except Exception:
        logger.exception("An unexpected error occurred during login.")  # Avoid exposing user details
        return JSONResponse(status_code=500, content={"detail": "Internal Server Error."})

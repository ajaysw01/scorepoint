"""
Author: Ajay Wankhade
Version: 1.0
Description: This is the main file of the application.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.api.auth import authentication
from src.api.customexception.exceptions import AuthException, InvalidCredentialsException, UserExistsException, UserNotFoundException
from src.api.configurations.config import get_settings
from src.api.database.db_conn import Base, engine, SessionLocal
from src.api.routes import user_route, team_route, sport_route, points_route
from src.api.customexception import exception_handlers
from src.api.models.models import User
from src.api.utils.hashing import Hash
import time

Base.metadata.create_all(bind=engine)

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG_MODE
)

@app.get("/")
async def health_check():
    return {"message": "App is running ..."}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(AuthException, exception_handlers.auth_exception_handler)
app.add_exception_handler(UserExistsException, exception_handlers.user_exists_exception_handler)
app.add_exception_handler(InvalidCredentialsException, exception_handlers.invalid_credentials_exception_handler)
app.add_exception_handler(UserNotFoundException, exception_handlers.user_not_found_exception_handler)

app.include_router(user_route.router, prefix=settings.API_PREFIX + "/users", tags=["User registration"])
app.include_router(authentication.router, prefix=settings.API_PREFIX + "/auth", tags=["Login"])
app.include_router(team_route.router, prefix=settings.API_PREFIX + "/teams", tags=["Team Endpoints"])
app.include_router(sport_route.router, prefix=settings.API_PREFIX + "/sports", tags=["Sports Endpoints"])
app.include_router(points_route.router, prefix=settings.API_PREFIX + "/points", tags=["Points Endpoints"])


def create_admin():
    db: Session = SessionLocal()

    try:
        admin_email = "ajaysw45@mail.com"
        admin = db.query(User).filter(User.email == admin_email).first()

        if not admin:
            new_admin = User(
                name="Ajay",
                email=admin_email,
                hashed_password=Hash.bcrypt("Ajay@123"),
                role="admin"
            )
            db.add(new_admin)
            db.commit()
    finally:
        db.close()

create_admin()


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = round(time.time() - start_time, 4)
    response.headers["X-Process-Time"] = str(process_time)
    return response

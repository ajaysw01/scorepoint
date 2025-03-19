"""
Author: Ajay Wankhade
Version: 1.0
Description: This file contains configurations of the whole application.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os
 
load_dotenv()
 
class Settings(BaseSettings):
    APP_NAME: str = "CS_Sports"
    DEBUG_MODE: bool = False
    API_PREFIX: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    DATABASE_URL: str = os.getenv("DATABASE_URL")
 
settings = Settings()
 
@lru_cache
def get_settings():
    return Settings()
 

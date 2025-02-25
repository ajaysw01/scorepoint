from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.api.configurations.config import get_settings


engine = create_engine(get_settings().DATABASE_URL)

SessionLocal = sessionmaker(autoflush=False, autocommit = False,bind=engine )

Base = declarative_base()

def get_db() :
    db = SessionLocal()
    try :
        yield db
    finally:
        db.close()
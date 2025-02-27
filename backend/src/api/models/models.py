from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from src.api.database.db_conn import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")

    teams = relationship("Team", back_populates="user")


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="teams")
    players = relationship("Player", back_populates="team")
    scores = relationship("TeamPoints", back_populates="team", cascade="all, delete-orphan")


class Sport(Base):
    __tablename__ = "sports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    category = Column(String(50), nullable=True)

    players = relationship("PlayerPoints", back_populates="sport")
    scores = relationship("TeamPoints", back_populates="sport", cascade="all, delete-orphan")


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)

    team = relationship("Team", back_populates="players")
    scores = relationship("PlayerPoints", back_populates="player")


class PlayerPoints(Base):
    __tablename__ = "player_points"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False, index=True)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False, index=True)
    points = Column(Integer, nullable=False, default=0)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())

    player = relationship("Player", back_populates="scores")
    sport = relationship("Sport", back_populates="players")


class TeamPoints(Base):
    __tablename__ = "team_points"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False)
    team_points = Column(Integer, nullable=False, default=0)
    bonus_points = Column(Integer, nullable=False, default=0)
    awarded_at = Column(DateTime(timezone=True), server_default=func.now())

    team = relationship("Team", back_populates="scores")
    sport = relationship("Sport", back_populates="scores")

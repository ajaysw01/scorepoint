from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Enum, Date, Time
from sqlalchemy.orm import relationship
from src.api.database.db_conn import Base
import enum


class SportCategoryEnum(str, enum.Enum):
    MEN_SINGLES = "men_singles"
    WOMEN_SINGLES = "women_singles"
    MEN_DOUBLES = "men_doubles"
    WOMEN_DOUBLES = "women_doubles"
    MIXED_DOUBLES = "mixed_doubles"
    NONE = "none"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")

    teams = relationship("Team", back_populates="user")


class Sport(Base):
    __tablename__ = "sports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)

    players = relationship("PlayerPoints", back_populates="sport")
    scores = relationship("TeamPoints", back_populates="sport", cascade="all, delete-orphan")


class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="teams")
    players = relationship("Player", back_populates="team", cascade="all, delete-orphan")
    scores = relationship("TeamPoints", back_populates="team", cascade="all, delete-orphan")


class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)

    team = relationship("Team", back_populates="players")
    scores = relationship("PlayerPoints", back_populates="player", cascade="all, delete-orphan")


class PlayerPoints(Base):
    __tablename__ = "player_points"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False, index=True)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False, index=True)
    category = Column(Enum(SportCategoryEnum), nullable=True)
    competition_level = Column(String, nullable=False)
    points = Column(Integer, nullable=False, default=0)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())

    player = relationship("Player", back_populates="scores")
    sport = relationship("Sport", back_populates="players")


class TeamPoints(Base):
    __tablename__ = "team_points"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False)
    category = Column(Enum(SportCategoryEnum), nullable=True)
    team_points = Column(Integer, nullable=False, default=0)
    bonus_points = Column(Integer, nullable=False, default=0)
    awarded_at = Column(DateTime(timezone=True), server_default=func.now())

    team = relationship("Team", back_populates="scores")
    sport = relationship("Sport", back_populates="scores")


class MatchSchedule(Base):
    __tablename__ = "match_schedules"

    id = Column(Integer, primary_key=True, index=True)
    player1 = Column(String(100), nullable=False)
    player2 = Column(String(100), nullable=False)
    team1 = Column(String(100), nullable=False)
    team2 = Column(String(100), nullable=False)
    sport = Column(String, nullable=False)
    category = Column(Enum(SportCategoryEnum), nullable=True)
    venue = Column(String(100), nullable=False)
    comments = Column(String(100), nullable=True)
    status = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)

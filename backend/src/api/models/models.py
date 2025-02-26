from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from src.api.database.db_conn import Base


# ✅ User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    teams = relationship("Team", back_populates="user")


# ✅ Team Model
class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="teams")
    players = relationship("Player", back_populates="team")
    bonuses = relationship("TeamBonus", back_populates="team", cascade="all, delete-orphan")


# ✅ Sport Model
class Sport(Base):
    __tablename__ = "sports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    category = Column(String(50), nullable=True)  # "Singles", "Doubles", or NULL for Cricket, Darts

    players = relationship("PlayerScore", back_populates="sport")
    bonuses = relationship("TeamBonus", back_populates="sport", cascade="all, delete-orphan")


# ✅ Player Model
class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)

    team = relationship("Team", back_populates="players")
    scores = relationship("PlayerScore", back_populates="player")


# ✅ Player Score Model
class PlayerScore(Base):
    __tablename__ = "player_scores"

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False)
    points = Column(Integer, nullable=False)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())

    player = relationship("Player", back_populates="scores")
    sport = relationship("Sport", back_populates="players")


# ✅ Team Bonus Model (New)
class TeamBonus(Base):
    __tablename__ = "team_bonuses"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    sport_id = Column(Integer, ForeignKey("sports.id"), nullable=False)
    bonus_points = Column(Integer, nullable=False, default=0)
    awarded_at = Column(DateTime(timezone=True), server_default=func.now())

    team = relationship("Team", back_populates="bonuses")
    sport = relationship("Sport", back_populates="bonuses")

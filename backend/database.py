import os
from sqlalchemy import create_engine, Column, String, Boolean, Float, ForeignKey, Integer, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import datetime

Base = declarative_base()

class App(Base):
    __tablename__ = 'apps'
    id = Column(String, primary_key=True)
    app_name = Column(String, unique=True, index=True)
    category = Column(String)
    summary = Column(String)
    auth = Column(String)
    self_serve = Column(Boolean)
    api_surface = Column(String)
    mcp = Column(Boolean)
    buildability = Column(String)
    blockers = Column(String)
    confidence = Column(Float)
    agent_readiness_score = Column(Integer) # 0-100

    evidence = relationship("Evidence", back_populates="app")
    verification_runs = relationship("VerificationRun", back_populates="app")
    human_reviews = relationship("HumanReview", back_populates="app")

class Evidence(Base):
    __tablename__ = 'evidence'
    id = Column(String, primary_key=True)
    app_id = Column(String, ForeignKey('apps.id'))
    field = Column(String)
    source_url = Column(String)
    snippet = Column(String)
    app = relationship("App", back_populates="evidence")

class AgentRun(Base):
    __tablename__ = 'agent_runs'
    id = Column(String, primary_key=True)
    agent_name = Column(String)
    status = Column(String)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime)
    target = Column(String) # app_id or global
    logs = Column(Text)

class VerificationRun(Base):
    __tablename__ = 'verification_runs'
    id = Column(String, primary_key=True)
    app_id = Column(String, ForeignKey('apps.id'))
    initial_confidence = Column(Float)
    validated_confidence = Column(Float)
    human_reviewed = Column(Boolean)
    issues_found = Column(Integer)
    fixes_made = Column(Integer)
    app = relationship("App", back_populates="verification_runs")

class Insight(Base):
    __tablename__ = 'insights'
    id = Column(String, primary_key=True)
    category = Column(String) # e.g. Easy Win, Strategic Target, Outreach Required
    app_id = Column(String, ForeignKey('apps.id'), nullable=True) # Optional link
    title = Column(String)
    reason = Column(Text)

class HumanReview(Base):
    __tablename__ = 'human_reviews'
    id = Column(String, primary_key=True)
    app_id = Column(String, ForeignKey('apps.id'))
    reviewer_notes = Column(Text)
    corrected_fields = Column(Text) # JSON string
    reviewed_at = Column(DateTime, default=datetime.datetime.utcnow)
    app = relationship("App", back_populates="human_reviews")

def get_engine():
    db_path = os.path.join(os.path.dirname(__file__), 'data', 'intelligence.db')
    engine = create_engine(f'sqlite:///{db_path}')
    Base.metadata.drop_all(engine) # Recreate to apply new schema
    Base.metadata.create_all(engine)
    return engine

def get_session():
    engine = get_engine()
    Session = sessionmaker(bind=engine)
    return Session()

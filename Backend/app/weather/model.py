import uuid
import bcrypt
from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database import db

"""

DEPRECREATED: Using raw SQL queries in service layer instead of ORM models for better compatibility with Cloud SQL.
Previously used SQLAlchemy ORM model for Weather data. Connected to service layer via SQLAlchemy session.
Now using raw SQL queries in service layer to avoid compatibility issues with Cloud SQL and connection pooling.


"""



class weather(db.Model):
    """Weather model using SQLAlchemy ORM"""
    __tablename__ = 'weather'    
    
    # Weather fields
    station_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    weather_date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    temperature: Mapped[float] = mapped_column(nullable=False)
    humidity: Mapped[float] = mapped_column(nullable=False)
    windspeed: Mapped[float] = mapped_column(nullable=False)
    
    
    def __repr__(self) -> str:
        return f"<Weather(station_id='{self.station_id}', station_name='{self.station_name}', temperature='{self.temperature}', humidity='{self.humidity}')>"
    
    def to_dict(self) -> dict:
        """Convert model to dictionary"""
        return {
            
            'station_name': self.station_name,
            'weather_date': self.weather_date.isoformat() if self.weather_date else None,
            'temperature': self.temperature,
            'humidity': self.humidity,
            'windspeed': self.windspeed
            
        }
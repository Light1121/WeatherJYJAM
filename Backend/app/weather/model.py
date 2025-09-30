import uuid
import bcrypt
from datetime import datetime
from typing import Optional

from sqlalchemy import String, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database import db

class weather(db.Model):
    """Weather model using SQLAlchemy ORM"""
    __tablename__ = 'weather'
    
    
    
    # Weather fields
    station_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    weather_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
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
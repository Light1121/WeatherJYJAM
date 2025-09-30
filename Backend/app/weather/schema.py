from datetime import datetime
from typing import Optional

from pydantic import BaseModel
class WeatherSchema(BaseModel):
    """Basic weather schema"""
    station_name: str
    weather_date: datetime
    temperature: float
    humidity: float
    windspeed: float
    
    class Config:
        from_attributes = True
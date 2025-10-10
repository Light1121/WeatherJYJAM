from typing import List, Optional


from app.database import db
from app.user.model import weather

class WeatherService:
    """Weather service layer for business logic"""
    
    def get_weather_by_station(self, station_name: str) -> Optional[weather]:
        """Get weather data by station name"""
        return db.session.query(weather).filter_by(station_name=station_name).first()
    
    def get_all_weather_stations(self) -> List[weather]:
        """Get all weather stations"""
        return db.session.query(weather).all()
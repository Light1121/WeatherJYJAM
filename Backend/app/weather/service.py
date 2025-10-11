from typing import List, Optional

from decimal import Decimal

from sqlalchemy import text as sqlalchemy_text
from app.database import db

class WeatherService:
    """Weather service layer for business logic"""
    
    def get_weather_by_station(self, station_name: str) -> dict:
        """Return weather data for a station as a list for charting"""
        with db.engine.connect() as conn:
            result = conn.execute(sqlalchemy_text(
                "SELECT * FROM weather_data WHERE station_name = :station_name ORDER BY date ASC"
            ), {"station_name": station_name})
            rows = result.fetchall()
        
        return [{"name": row["date"], "value": row["temperature"]} for row in rows]
    
    def get_all_weather_stations(self) -> list[dict]:
        """Get all weather stations"""
        with db.engine.connect() as conn:
            result = conn.execute(sqlalchemy_text(
                "SELECT * FROM weather_data"
            ))
            rows = result.fetchall()
        return [dict(r) for r in rows]


    def get_nearest_station(self, lat: float, lng: float) -> dict:
        """
        Get the nearest weather station to a given latitude and longitude
        using SQL to calculate the distance directly.
        """
        with db.engine.connect() as conn:
            # Simple Euclidean approximation (works for small distances)
            query = """
                SELECT *,
                    SQRT(POW(lat - :lat, 2) + POW(lon - :lng, 2)) AS distance
                FROM stations
                ORDER BY distance ASC
                LIMIT 1
            """
            # result = conn.execute(sqlalchemy_text(query), {"lat": lat, "lng": lng})
            result = conn.execute(sqlalchemy_text("SELECT `Station Name` FROM stations LIMIT 1"))
            row = result.mappings().first()  # safer
            if not row:
                return None

            # Convert Decimals to float
            data = {k: float(v) if isinstance(v, Decimal) else v for k, v in row.items()}

            return data
            
        return dict(row) if row else None
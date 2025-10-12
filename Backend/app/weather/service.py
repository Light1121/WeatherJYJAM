from typing import List, Optional

from decimal import Decimal

from sqlalchemy import text as sqlalchemy_text
from app.database import db

class WeatherService:
    """Weather service layer for business logic"""
    
    def get_weather_by_station(self, station_name: str) -> dict:
        """Return weather data for a station as a list for charting"""

        print(f"Searching for station: '{station_name}'")

        query = """
            SELECT
                w.`Station Name`,
                DATE_FORMAT(MIN(w.Date), '%Y-%m-%d') AS Date,
                AVG(w.`Rain 0900-0900 (mm)`) AS Avg_Rainfall,
                AVG((w.`Maximum Temperature (°C)` + w.`Minimum Temperature (°C)`) / 2) AS Avg_Temperature,
                AVG((w.`Maximum Relative Humidity (%)` + w.`Minimum Relative Humidity (%)`) / 2) AS Avg_Relative_Humidity,
                AVG(w.`Average 10m Wind Speed (m/sec)`) AS Avg_Wind_Speed
            FROM
                weather_data w
            JOIN
                Dates d ON w.Date = d.Date
            WHERE
            `Station Name` = 'ADELAIDE AIRPORT'
            GROUP BY
                d.Year,
                d.Month,
                w.`Station Name`
            ORDER BY
                d.Year,
                d.Month
                ASC;
        """

        def clean_row(row):
            return {
                k: float(v) if isinstance(v, Decimal) else v
                for k, v in row.items()
            }

        with db.engine.connect() as conn:
            result = conn.execute(sqlalchemy_text(query), {"station_name": f"%{station_name}%"})
        
        
        rows = result.mappings().all()  # <--- use mappings()


        cleaned = [clean_row(row) for row in rows]

        if cleaned:
            print("First cleaned row:", cleaned[0])

        return cleaned
    
    def get_avg_weather_by_station(self, station_name: str) -> dict:
        """Return weather data for a station as a list for charting"""

        print(f"Searching for station: '{station_name}'")

        query = """
            SELECT
                w.`Station Name`,
                DATE_FORMAT(MIN(w.Date), '%Y-%m-%d') AS Date,
                AVG(w.`Rain 0900-0900 (mm)`) AS Avg_Rainfall,
                AVG((w.`Maximum Temperature (°C)` + w.`Minimum Temperature (°C)`) / 2) AS Avg_Temperature,
                AVG((w.`Maximum Relative Humidity (%)` + w.`Minimum Relative Humidity (%)`) / 2) AS Avg_Relative_Humidity,
                AVG(w.`Average 10m Wind Speed (m/sec)`) AS Avg_Wind_Speed
            FROM
                weather_data w
            JOIN
                Dates d ON w.Date = d.Date
            WHERE
            `Station Name` = 'ADELAIDE AIRPORT'
            GROUP BY
                d.Year,
                d.Month,
                w.`Station Name`
            ORDER BY
                d.Year,
                d.Month
                ASC;
        """

        def clean_row(row):
            return {
                k: float(v) if isinstance(v, Decimal) else v
                for k, v in row.items()
            }

        with db.engine.connect() as conn:
            result = conn.execute(sqlalchemy_text(query), {"station_name": f"%{station_name}%"})
        
        
        rows = result.mappings().all()  # <--- use mappings()


        cleaned = [clean_row(row) for row in rows]

        if cleaned:
            print("First cleaned row:", cleaned[0])

        return cleaned

    
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
            result = conn.execute(sqlalchemy_text(query), {"lat": lat, "lng": lng})
            # result = conn.execute(sqlalchemy_text("SELECT `Station Name` FROM stations LIMIT 1"))
            row = result.mappings().first()  # safer
            if not row:
                return None

            # Convert Decimals to float
            data = {k: float(v) if isinstance(v, Decimal) else v for k, v in row.items()}

            return data
            
        return dict(row) if row else None
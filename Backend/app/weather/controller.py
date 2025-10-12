from flask import request
from flask_restx import Resource, Namespace

from app.database import db
import sqlalchemy

from app.weather.service import WeatherService
from app._utils.serializer import to_dict

api = Namespace('weather')
weather_service = WeatherService()

@api.route('/')
class WeatherListApi(Resource):
    def get(self):
        """Get all weather stations"""
        weathers = weather_service.get_all_weather_stations()
        return [to_dict(weather) for weather in weathers]
    
@api.route('/<string:station_name>')
class WeatherApi(Resource):
    def get(self, station_name):
        """Get weather data by station name"""
        print(f"Fetching weather data for station: {station_name}")

        weather = weather_service.get_weather_by_station(station_name)

        if not weather:
            api.abort(404, f"Weather data for station '{station_name}' not found")

        return weather, 200
    
@api.route('/avg_<string:station_name>')
class WeatherApi(Resource):
    def get(self, station_name):
        """Get weather data by station name"""
        print(f"Fetching weather data for station: {station_name}")

        weather = weather_service.get_avg_weather_by_station(station_name)

        if not weather:
            api.abort(404, f"Weather data for station '{station_name}' not found")

        return weather, 200

@api.route("/nearest")
class NearestStation(Resource):
    def get(self,):
        """Get nearest weather station given lat/lng query params"""
        try:
            lat = float(request.args.get("lat"))
            lng = float(request.args.get("lng"))
        except (TypeError, ValueError):
            return {"status": "error", "message": "Invalid or missing lat/lng"}, 400
        

        weather = weather_service.get_nearest_station(lat, lng)
        if not weather:
            return {"status": "error", "message": "No stations found"}, 404

        return {"status": "success", "data": weather}, 200
    
@api.route('/test-db')
class TestDatabaseConnection(Resource):
    def get(self):
        """Test database connectivity."""
        try:
            # This will run a lightweight SQL query to check the connection
            result = db.session.execute(sqlalchemy.text("SELECT NOW();"))
            row = result.fetchone()
            return {"status": "success", "current_time": str(row[0])}, 200
        except Exception as e:
            return {"status": "error", "message": str(e)}, 500
from flask import request
from flask_restx import Resource, Namespace

from app.user.service import UserService
from app._utils.serializer import to_dict

api = Namespace('weather')
weather_service = UserService()

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
        weather = weather_service.get_weather_by_station(station_name)
        if not weather:
            api.abort(404, f'Weather data for station {station_name} not found')
        
        return [to_dict(weather) for weather in weather]
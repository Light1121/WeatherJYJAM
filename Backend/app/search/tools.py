"""
Weather search tools for real-time data
"""
import requests
from urllib.parse import urlencode


def geocode_location(name: str):
    """Use Nominatim to geocode a place name -> (lat, lon, display_name)"""
    url = "https://nominatim.openstreetmap.org/search?" + urlencode({
        "q": name,
        "format": "json",
        "limit": 1,
    })
    r = requests.get(url, headers={"User-Agent": "WeatherJYJAM/1.0"}, timeout=15)
    r.raise_for_status()
    data = r.json()
    if not data:
        return None
    item = data[0]
    return {
        "lat": float(item["lat"]),
        "lon": float(item["lon"]),
        "display_name": item.get("display_name"),
    }


def fetch_open_meteo(lat: float, lon: float, tz: str = "Australia/Melbourne"):
    """Fetch current weather + today/hourly forecast from Open-Meteo"""
    params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
        "current_weather": "true",
        "timezone": tz,
    }
    url = "https://api.open-meteo.com/v1/forecast?" + urlencode(params)
    r = requests.get(url, timeout=15)
    r.raise_for_status()
    return r.json()


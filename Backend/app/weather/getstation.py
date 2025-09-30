import csv
import math
import os
from typing import Tuple

def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Calculate the great-circle distance between two points on the Earth
    R = 6371  # Earth radius in kilometers
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2 * R * math.asin(math.sqrt(a))

def get_nearest_station(lat: float, lon: float, stations_csv: str = 'stations.csv') -> str:
    min_dist = float('inf')
    nearest_station = None
    with open(stations_csv, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            try:
                station_lat = float(row['latitude'])
                station_lon = float(row['longitude'])
                dist = haversine(lat, lon, station_lat, station_lon)
                if dist < min_dist:
                    min_dist = dist
                    nearest_station = row['station_name']
            except (KeyError, ValueError):
                continue
    return nearest_station

# To access stations.csv reliably, use an absolute path relative to this script's location

def get_stations_csv_path(filename='stations.csv'):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, filename)

# Example usage:
stations_csv_path = get_stations_csv_path()
print(get_nearest_station(-23.71, 132.99, stations_csv=stations_csv_path))

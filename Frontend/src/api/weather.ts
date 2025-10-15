/**
 * Weather API
 * Handles weather data requests
 */

import { API_ENDPOINTS } from './config'

export interface NearestStationResponse {
  status: string
  message?: string
  data: {
    'Station Name': string
    lat: number
    lon: number
    distance: number
    [key: string]: string | number
  }
}

export interface WeatherEntry {
  Date: string
  Avg_Temperature: number
  Avg_Relative_Humidity: number
  Avg_Wind_Speed: number
  Avg_Rainfall: number
  'Station Name': string
}

/**
 * Get nearest weather station for given coordinates
 */
export const getNearestStation = async (
  lat: number,
  lng: number,
): Promise<NearestStationResponse> => {
  const response = await fetch(
    `${API_ENDPOINTS.weatherNearest}?lat=${lat}&lng=${lng}`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch nearest station: ${response.status}`)
  }

  const data = await response.json()

  if (data.status !== 'success') {
    throw new Error(data.message || 'Failed to get nearest station')
  }

  return data
}

/**
 * Get weather data for a specific station
 */
export const getWeatherByStation = async (
  stationName: string,
): Promise<WeatherEntry[]> => {
  const response = await fetch(API_ENDPOINTS.weatherByStation(stationName))

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`)
  }

  const data = await response.json()

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No weather data available')
  }

  return data
}

/**
 * Get weather data for a pin location (combines nearest + weather data)
 */
export const getWeatherForLocation = async (lat: number, lng: number) => {
  const nearestData = await getNearestStation(lat, lng)
  const stationName = nearestData.data['Station Name']
  const weatherData = await getWeatherByStation(stationName)

  return {
    stationName,
    weatherData,
  }
}

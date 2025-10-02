import { createContext } from 'react'
import type { LatLng } from 'leaflet'

export interface WeatherData {
  temperature: number
  windSpeed: number
  humidity: number
  description: string
}

export interface PinData {
  id: string
  position: LatLng
  locationName: string
  weatherData?: WeatherData
}

export interface PinContextType {
  locationOnePin: PinData | null
  locationTwoPin: PinData | null
  addPin: (position: LatLng) => Promise<void>
  removePin: (pinId: string) => void
  updatePinWeatherData: (pinId: string, weatherData: WeatherData) => void
}

export const PinContext = createContext<PinContextType | null>(null)

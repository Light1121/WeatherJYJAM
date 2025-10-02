import React, { useState, type ReactNode } from 'react'
import type { LatLng } from 'leaflet'
import { PinContext, type WeatherData, type PinData } from './contexts'

interface PinProviderProps {
  children: ReactNode
}

// Function to get location name from coordinates using OpenStreetMap Nominatim API
const getLocationName = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'WeatherJYJAM/1.0 (weather-app@example.com)', // Required by Nominatim
        },
      },
    )
    const data = await response.json()

    if (data && data.address) {
      const address = data.address

      // Priority order for location naming
      const locationParts = []

      // Add city/town/suburb
      if (address.city) {
        locationParts.push(address.city)
      } else if (address.town) {
        locationParts.push(address.town)
      } else if (address.suburb) {
        locationParts.push(address.suburb)
      } else if (address.village) {
        locationParts.push(address.village)
      } else if (address.municipality) {
        locationParts.push(address.municipality)
      }

      // Add state/region
      if (address.state) {
        locationParts.push(address.state)
      } else if (address.region) {
        locationParts.push(address.region)
      }

      // Add country if not Australia (to be more specific for international locations)
      if (address.country && address.country !== 'Australia') {
        locationParts.push(address.country)
      }

      if (locationParts.length > 0) {
        return locationParts.join(', ')
      }

      // Fallback to display_name if structured address doesn't work
      return (
        data.display_name || `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`
      )
    }

    return `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`
  } catch (error) {
    console.error('Error fetching location name from Nominatim:', error)
    return `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`
  }
}

// Function to get weather data from coordinates using OpenWeatherMap
const getWeatherData = async (
  lat: number,
  lng: number,
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      temperature: Math.round(data.main.temp),
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      humidity: data.main.humidity,
      description: data.weather[0].description,
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return {
      temperature: 0,
      windSpeed: 0,
      humidity: 0,
      description: 'No data available',
    }
  }
}

export const PinProvider: React.FC<PinProviderProps> = ({ children }) => {
  const [locationOnePin, setLocationOnePin] = useState<PinData | null>(null)
  const [locationTwoPin, setLocationTwoPin] = useState<PinData | null>(null)

  const addPin = async (position: LatLng) => {
    const pinId = `pin-${Date.now()}`

    try {
      // Get location name from OpenStreetMap and weather data from OpenWeatherMap
      const [locationName, weatherData] = await Promise.all([
        getLocationName(position.lat, position.lng),
        getWeatherData(position.lat, position.lng),
      ])

      const newPin: PinData = {
        id: pinId,
        position,
        locationName,
        weatherData,
      }

      if (!locationOnePin) {
        setLocationOnePin(newPin)
      } else if (!locationTwoPin) {
        setLocationTwoPin(newPin)
      } else {
        // Both slots filled, shift locations
        setLocationOnePin(locationTwoPin)
        setLocationTwoPin(newPin)
      }
    } catch (error) {
      console.error('Error adding pin:', error)

      // Create pin with fallback data
      const fallbackPin: PinData = {
        id: pinId,
        position,
        locationName: `Location ${position.lat.toFixed(2)}, ${position.lng.toFixed(2)}`,
        weatherData: {
          temperature: 0,
          windSpeed: 0,
          humidity: 0,
          description: 'Data unavailable',
        },
      }

      if (!locationOnePin) {
        setLocationOnePin(fallbackPin)
      } else if (!locationTwoPin) {
        setLocationTwoPin(fallbackPin)
      } else {
        setLocationOnePin(locationTwoPin)
        setLocationTwoPin(fallbackPin)
      }
    }
  }

  const removePin = (pinId: string) => {
    if (locationOnePin?.id === pinId) {
      setLocationOnePin(locationTwoPin)
      setLocationTwoPin(null)
    } else if (locationTwoPin?.id === pinId) {
      setLocationTwoPin(null)
    }
  }

  const updatePinWeatherData = (pinId: string, weatherData: WeatherData) => {
    if (locationOnePin?.id === pinId) {
      setLocationOnePin((prev: PinData | null) =>
        prev ? { ...prev, weatherData } : null,
      )
    } else if (locationTwoPin?.id === pinId) {
      setLocationTwoPin((prev: PinData | null) =>
        prev ? { ...prev, weatherData } : null,
      )
    }
  }

  return (
    <PinContext.Provider
      value={{
        locationOnePin,
        locationTwoPin,
        addPin,
        removePin,
        updatePinWeatherData,
      }}
    >
      {children}
    </PinContext.Provider>
  )
}

import React, { useState, type ReactNode } from 'react'
import type { LatLng } from 'leaflet'
import { LatLng as LeafletLatLng } from 'leaflet'
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

  // Temporarily disable tabs integration to debug
  // We'll fix this with a proper approach

  // Load pins from active tab when tab changes - TEMPORARILY DISABLED
  // TODO: Fix this with proper context integration
  /*
  useEffect(() => {
    if (tabsContext?.activeTab) {
      const { pins } = tabsContext.activeTab
      console.log('Loading pins from tab:', tabsContext.activeTab.name, 'pins:', pins) // Debug log
      
      // Clear existing pins first
      setLocationOnePin(null)
      setLocationTwoPin(null)
      
      // Then set new pins
      if (pins.length > 0) {
        console.log('Setting pin 1:', pins[0]) // Debug log
        setLocationOnePin(pins[0])
      }
      if (pins.length > 1) {
        console.log('Setting pin 2:', pins[1]) // Debug log
        setLocationTwoPin(pins[1])
      }
    }
  }, [tabsContext?.activeTabId]) // Changed dependency to activeTabId for better triggering
  */

  // Sync pins back to tabs context when pins change - TEMPORARILY DISABLED
  // TODO: Fix this with proper context integration
  /*
  useEffect(() => {
    if (tabsContext?.activeTabId) {
      const pins = [locationOnePin, locationTwoPin].filter(Boolean) as PinData[]
      console.log('Syncing pins to tab:', tabsContext.activeTabId, 'pins:', pins) // Debug log
      tabsContext.updateTabPins(tabsContext.activeTabId, pins)
    }
  }, [locationOnePin, locationTwoPin, tabsContext?.activeTabId, tabsContext?.updateTabPins])
  */

  const addPin = async (position: LatLng) => {
    const pinId = `pin-${Date.now()}`

    console.log('Adding pin at:', position) // Debug log

    try {
      // Get location name from OpenStreetMap and weather data from OpenWeatherMap
      const [locationName, weatherData] = await Promise.all([
        getLocationName(position.lat, position.lng),
        getWeatherData(position.lat, position.lng),
      ])

      const newPin: PinData = {
        id: pinId,
        position, // Keep the original LatLng object
        locationName,
        weatherData,
      }

      console.log('Created new pin:', newPin) // Debug log

      if (!locationOnePin) {
        console.log('Setting as location one pin') // Debug log
        setLocationOnePin(newPin)
      } else if (!locationTwoPin) {
        console.log('Setting as location two pin') // Debug log
        setLocationTwoPin(newPin)
      } else {
        console.log(
          'Shifting pins - moving location two to one, new pin to two',
        ) // Debug log
        // Both slots filled, shift locations
        setLocationOnePin(locationTwoPin)
        setLocationTwoPin(newPin)
      }
    } catch (error) {
      console.error('Error adding pin:', error)

      // Create pin with fallback data
      const fallbackPin: PinData = {
        id: pinId,
        position, // Keep the original LatLng object
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

  // Methods for tab integration
  const clearAllPins = () => {
    console.log('PinContext: Clearing all pins')
    setLocationOnePin(null)
    setLocationTwoPin(null)
  }

  const loadPins = (pins: PinData[]) => {
    console.log('PinContext: Loading pins:', pins)
    console.log('PinContext: Total pins to load:', pins.length)

    // Clear existing pins first
    setLocationOnePin(null)
    setLocationTwoPin(null)

    // Set new pins - ensure LatLng objects are properly reconstructed
    if (pins.length > 0) {
      const pin1 = pins[0]
      console.log('PinContext: Processing pin 1:', pin1)
      console.log('PinContext: Pin 1 position type:', typeof pin1.position)
      console.log('PinContext: Pin 1 position:', pin1.position)

      // Reconstruct LatLng object if needed
      if (pin1.position) {
        let validPin = pin1
        if (
          pin1.position.lat !== undefined &&
          pin1.position.lng !== undefined
        ) {
          // Recreate the LatLng object to ensure it has all methods
          validPin = {
            ...pin1,
            position: new LeafletLatLng(pin1.position.lat, pin1.position.lng),
          }
          console.log(
            'PinContext: Reconstructed pin 1 position:',
            validPin.position,
          )
        }
        setLocationOnePin(validPin)
        console.log('PinContext: Set location one pin successfully')
      }
    }

    if (pins.length > 1) {
      const pin2 = pins[1]
      console.log('PinContext: Processing pin 2:', pin2)
      console.log('PinContext: Pin 2 position type:', typeof pin2.position)
      console.log('PinContext: Pin 2 position:', pin2.position)

      // Reconstruct LatLng object if needed
      if (pin2.position) {
        let validPin = pin2
        if (
          pin2.position.lat !== undefined &&
          pin2.position.lng !== undefined
        ) {
          // Recreate the LatLng object to ensure it has all methods
          validPin = {
            ...pin2,
            position: new LeafletLatLng(pin2.position.lat, pin2.position.lng),
          }
          console.log(
            'PinContext: Reconstructed pin 2 position:',
            validPin.position,
          )
        }
        setLocationTwoPin(validPin)
        console.log('PinContext: Set location two pin successfully')
      }
    }

    console.log('PinContext: loadPins completed')
  }

  return (
    <PinContext.Provider
      value={{
        locationOnePin,
        locationTwoPin,
        addPin,
        removePin,
        updatePinWeatherData,
        clearAllPins,
        loadPins,
      }}
    >
      {children}
    </PinContext.Provider>
  )
}

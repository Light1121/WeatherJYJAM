import React, { createContext, useState, type ReactNode } from 'react'
import type { LatLng } from 'leaflet'

export interface PinData {
  id: string
  position: LatLng
  locationName: string
}

interface PinContextType {
  locationOnePin: PinData | null
  locationTwoPin: PinData | null
  addPin: (position: LatLng) => void
  removePin: (pinId: string) => void
}

const PinContext = createContext<PinContextType | null>(null)

interface PinProviderProps {
  children: ReactNode
}

export const PinProvider: React.FC<PinProviderProps> = ({ children }) => {
  const [locationOnePin, setLocationOnePin] = useState<PinData | null>(null)
  const [locationTwoPin, setLocationTwoPin] = useState<PinData | null>(null)

  const addPin = (position: LatLng) => {
    const newPin: PinData = {
      id: `pin-${Date.now()}`,
      position,
      locationName: `Location ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`,
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
  }

  const removePin = (pinId: string) => {
    if (locationOnePin?.id === pinId) {
      setLocationOnePin(locationTwoPin)
      setLocationTwoPin(null)
    } else if (locationTwoPin?.id === pinId) {
      setLocationTwoPin(null)
    }
  }

  return (
    <PinContext.Provider
      value={{
        locationOnePin,
        locationTwoPin,
        addPin,
        removePin,
      }}
    >
      {children}
    </PinContext.Provider>
  )
}

export default PinContext

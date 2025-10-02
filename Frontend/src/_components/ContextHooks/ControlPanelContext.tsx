import React, { createContext, useState, type ReactNode } from 'react'

export interface ControlPanelState {
  zoom: number
  opacity: number
  contrast: number
  saturation: number
  brightness: number
  hue: number
  colorMode: string
}

interface ControlPanelContextType {
  controls: ControlPanelState
  updateZoom: (zoom: number) => void
  updateOpacity: (opacity: number) => void
  updateContrast: (contrast: number) => void
  updateSaturation: (saturation: number) => void
  updateBrightness: (brightness: number) => void
  updateHue: (hue: number) => void
  updateColorMode: (colorMode: string) => void
  resetControls: () => void
}

const defaultControls: ControlPanelState = {
  zoom: 5, // Changed to middle of range (5-12)
  opacity: 100,
  contrast: 100,
  saturation: 100,
  brightness: 100,
  hue: 0,
  colorMode: 'default',
}

const ControlPanelContext = createContext<ControlPanelContextType | null>(null)

interface ControlPanelProviderProps {
  children: ReactNode
}

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({
  children,
}) => {
  const [controls, setControls] = useState<ControlPanelState>(defaultControls)

  const updateZoom = (zoom: number) => {
    // Clamp zoom to valid range
    const clampedZoom = Math.max(5, Math.min(12, zoom))
    setControls((prev) => ({ ...prev, zoom: clampedZoom }))
  }

  const updateOpacity = (opacity: number) => {
    setControls((prev) => ({ ...prev, opacity }))
  }

  const updateContrast = (contrast: number) => {
    setControls((prev) => ({ ...prev, contrast }))
  }

  const updateSaturation = (saturation: number) => {
    setControls((prev) => ({ ...prev, saturation }))
  }

  const updateBrightness = (brightness: number) => {
    setControls((prev) => ({ ...prev, brightness }))
  }

  const updateHue = (hue: number) => {
    setControls((prev) => ({ ...prev, hue }))
  }

  const updateColorMode = (colorMode: string) => {
    setControls((prev) => ({ ...prev, colorMode }))
  }

  const resetControls = () => {
    setControls(defaultControls)
  }

  return (
    <ControlPanelContext.Provider
      value={{
        controls,
        updateZoom,
        updateOpacity,
        updateContrast,
        updateSaturation,
        updateBrightness,
        updateHue,
        updateColorMode,
        resetControls,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  )
}

export default ControlPanelContext

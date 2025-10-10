import React, { createContext, useState, type ReactNode } from 'react'

export interface ControlPanelState {
  zoom: number
  opacity: number
  contrast: number
  saturation: number
  brightness: number
  hue: number
  colorMode: string
  // Map position tracking
  mapPosition: {
    lat: number
    lng: number
  }
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
  updateMapPosition: (lat: number, lng: number) => void
  resetControls: () => void
  getLayerStyle: () => string
  getBarStyle: () => React.CSSProperties
}

const ControlPanelContext = createContext<ControlPanelContextType | null>(null)

interface ControlPanelProviderProps {
  children: ReactNode
}

const defaultControls: ControlPanelState = {
  zoom: 5,
  opacity: 100,
  contrast: 100,
  saturation: 100,
  brightness: 100,
  hue: 0,
  colorMode: 'default',
  mapPosition: {
    lat: -25.2744,
    lng: 133.7751,
  },
}

export const ControlPanelProvider: React.FC<ControlPanelProviderProps> = ({
  children,
}) => {
  const [controls, setControls] = useState<ControlPanelState>(defaultControls)

  // Note: TabsContext integration is handled by TabsPinIntegration component
  // to avoid circular dependencies and hook rule violations

  const updateZoom = (zoom: number) => {
    setControls((prev) => ({ ...prev, zoom }))
    // Note: Tab sync is handled by TabsPinIntegration component
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

  const updateMapPosition = (lat: number, lng: number) => {
    setControls((prev) => ({
      ...prev,
      mapPosition: { lat, lng },
    }))
    console.log('ControlPanel: Map position updated to:', { lat, lng })
  }

  const resetControls = () => {
    setControls(defaultControls)
  }

  // Generate accurate color blind filters
  const getColorBlindFilter = (type: string): string[] => {
    const filters: string[] = []

    switch (type) {
      case 'protanopia': // Red-blind - cannot see red light
        // Protanopes see blues and yellows, reds appear as yellow-brown
        // This shifts the red spectrum to yellow/brown tones
        filters.push('brightness(1.1)')
        filters.push('contrast(0.9)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"protanopia\\"><feColorMatrix values=\\"0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0\\"/></filter></defs></svg>#protanopia")',
        )
        break

      case 'deuteranopia': // Green-blind - cannot see green light
        // Deuteranopes see blues and reds, greens appear as yellow/brown
        filters.push('brightness(1.05)')
        filters.push('contrast(0.95)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"deuteranopia\\"><feColorMatrix values=\\"0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0\\"/></filter></defs></svg>#deuteranopia")',
        )
        break

      case 'tritanopia': // Blue-blind - cannot see blue light
        // Tritanopes see reds and greens, blues appear as green/yellow
        filters.push('brightness(1.1)')
        filters.push('contrast(0.9)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"tritanopia\\"><feColorMatrix values=\\"0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0\\"/></filter></defs></svg>#tritanopia")',
        )
        break

      case 'protanomaly': // Weak red perception
        filters.push('brightness(1.05)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"protanomaly\\"><feColorMatrix values=\\"0.817 0.183 0 0 0 0.333 0.667 0 0 0 0 0.125 0.875 0 0 0 0 0 1 0\\"/></filter></defs></svg>#protanomaly")',
        )
        break

      case 'deuteranomaly': // Weak green perception (most common)
        filters.push('brightness(1.03)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"deuteranomaly\\"><feColorMatrix values=\\"0.8 0.2 0 0 0 0.258 0.742 0 0 0 0 0.142 0.858 0 0 0 0 0 1 0\\"/></filter></defs></svg>#deuteranomaly")',
        )
        break

      case 'tritanomaly': // Weak blue perception
        filters.push('brightness(1.05)')
        filters.push(
          'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\"><defs><filter id=\\"tritanomaly\\"><feColorMatrix values=\\"0.967 0.033 0 0 0 0 0.733 0.267 0 0 0 0.183 0.817 0 0 0 0 0 1 0\\"/></filter></defs></svg>#tritanomaly")',
        )
        break

      default:
        break
    }

    return filters
  }

  // Generate CSS filter string for layers
  const getLayerStyle = (): string => {
    const filters = []

    // Base filters
    filters.push(`opacity(${controls.opacity}%)`)
    filters.push(`contrast(${controls.contrast}%)`)
    filters.push(`saturate(${controls.saturation}%)`)
    filters.push(`brightness(${controls.brightness}%)`)
    filters.push(`hue-rotate(${controls.hue}deg)`)

    // Color mode specific filters
    switch (controls.colorMode) {
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'protanomaly':
      case 'deuteranomaly':
      case 'tritanomaly': {
        // Add color blind simulation filters
        const colorBlindFilters = getColorBlindFilter(controls.colorMode)
        filters.push(...colorBlindFilters)
        break
      }

      case 'monochromacy': // Complete color blindness (achromatopsia)
        filters.push('grayscale(100%)')
        filters.push('contrast(120%)')
        filters.push('brightness(110%)')
        break

      case 'high-contrast':
        filters.push('contrast(200%)')
        filters.push('brightness(120%)')
        filters.push('saturate(150%)')
        break

      case 'low-vision':
        filters.push('contrast(180%)')
        filters.push('brightness(130%)')
        filters.push('saturate(200%)')
        break

      case 'grayscale':
        filters.push('grayscale(100%)')
        break

      case 'inverted':
        filters.push('invert(100%)')
        break

      default:
        break
    }

    return filters.join(' ')
  }

  // Generate CSS properties for weather bars
  const getBarStyle = (): React.CSSProperties => {
    const filters = []

    filters.push(`contrast(${controls.contrast}%)`)
    filters.push(`saturate(${controls.saturation}%)`)
    filters.push(`brightness(${controls.brightness}%)`)
    filters.push(`hue-rotate(${controls.hue}deg)`)

    switch (controls.colorMode) {
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'protanomaly':
      case 'deuteranomaly':
      case 'tritanomaly': {
        // Add color blind simulation filters
        const colorBlindFilters = getColorBlindFilter(controls.colorMode)
        filters.push(...colorBlindFilters)
        break
      }

      case 'monochromacy':
        filters.push('grayscale(100%)')
        filters.push('contrast(120%)')
        filters.push('brightness(110%)')
        break

      case 'high-contrast':
        filters.push('contrast(200%)')
        filters.push('brightness(120%)')
        filters.push('saturate(150%)')
        break

      case 'low-vision':
        filters.push('contrast(180%)')
        filters.push('brightness(130%)')
        filters.push('saturate(200%)')
        break

      case 'grayscale':
        filters.push('grayscale(100%)')
        break

      case 'inverted':
        filters.push('invert(100%)')
        break

      default:
        break
    }

    return {
      filter: filters.join(' '),
      transition: 'filter 0.3s ease',
    }
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
        updateMapPosition,
        resetControls,
        getLayerStyle,
        getBarStyle,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  )
}

export default ControlPanelContext

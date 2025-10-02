import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MapContainer, useMap, useMapEvents } from 'react-leaflet'
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import WeatherLayers from './WeatherLayers'
import MapPins from './MapPins'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'

const MapWrapper = styled.div<{ filterStyles: string }>`
  width: 100%;
  height: 100%;

  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    filter: ${({ filterStyles }) => filterStyles};
    transition: filter 0.3s ease;
  }

  .custom-pin {
    background: transparent !important;
    border: none !important;
  }
`

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const CENTER: LatLngExpression = [-25.2744, 133.7751] as const

const WORLD_BOUNDS: LatLngBoundsExpression = [
  [-85, -Infinity],
  [85, Infinity],
] as const

// Component to handle zoom changes and sync with controls
const ZoomController: FC = () => {
  const map = useMap()
  const { controls, updateZoom } = useControlPanelContext()
  const isUpdatingFromControl = useRef(false)

  // Update map zoom when control panel changes
  useEffect(() => {
    if (Math.abs(map.getZoom() - controls.zoom) > 0.05) {
      isUpdatingFromControl.current = true
      map.setZoom(controls.zoom)
      setTimeout(() => {
        isUpdatingFromControl.current = false
      }, 100)
    }
  }, [controls.zoom, map])

  // Listen for map zoom events and update controls
  useMapEvents({
    zoomend: () => {
      if (!isUpdatingFromControl.current) {
        const currentZoom = map.getZoom()
        // Clamp zoom to control panel limits
        const clampedZoom = Math.max(5, Math.min(12, currentZoom))

        if (currentZoom !== clampedZoom) {
          map.setZoom(clampedZoom)
        }

        if (Math.abs(controls.zoom - clampedZoom) > 0.05) {
          updateZoom(clampedZoom)
        }
      }
    },
    zoom: () => {
      if (!isUpdatingFromControl.current) {
        const currentZoom = map.getZoom()
        // Clamp zoom during zoom animation
        const clampedZoom = Math.max(5, Math.min(12, currentZoom))

        if (Math.abs(controls.zoom - clampedZoom) > 0.05) {
          updateZoom(clampedZoom)
        }
      }
    },
  })

  return null
}

const Map: FC = () => {
  const { controls } = useControlPanelContext()

  // Generate CSS filter string based on controls
  const generateFilterStyles = () => {
    const filters = []

    if (controls.opacity !== 100) {
      filters.push(`opacity(${controls.opacity / 100})`)
    }
    if (controls.contrast !== 100) {
      filters.push(`contrast(${controls.contrast}%)`)
    }
    if (controls.saturation !== 100) {
      filters.push(`saturate(${controls.saturation}%)`)
    }
    if (controls.brightness !== 100) {
      filters.push(`brightness(${controls.brightness}%)`)
    }
    if (controls.hue !== 0) {
      filters.push(`hue-rotate(${controls.hue}deg)`)
    }

    // Add color mode filters
    switch (controls.colorMode) {
      case 'grayscale':
        filters.push('grayscale(100%)')
        break
      case 'inverted':
        filters.push('invert(100%)')
        break
      case 'high-contrast':
        filters.push('contrast(150%) saturate(120%)')
        break
      case 'colorblind':
        filters.push('hue-rotate(180deg) saturate(80%)')
        break
    }

    return filters.join(' ')
  }

  return (
    <MapWrapper filterStyles={generateFilterStyles()}>
      <MapContainer
        center={CENTER}
        zoom={controls.zoom}
        minZoom={5}
        maxZoom={12}
        zoomSnap={0.1}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={60}
        wheelDebounceTime={40}
        worldCopyJump={true}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={0.5}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ZoomController />
        <WeatherLayers apiKey={API_KEY} />
        <MapPins />
      </MapContainer>
    </MapWrapper>
  )
}

export default Map

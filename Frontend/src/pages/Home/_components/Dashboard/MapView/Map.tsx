import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MapContainer, useMap, useMapEvents } from 'react-leaflet'
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import WeatherLayers from './WeatherLayers'
import MapPins from './MapPins'
import { useControlPanelContext } from '@/_components/ContextHooks/useControlPanelContext'
import { useTabsContext } from '@/_components/ContextHooks/useTabsContext'

// Import global map reference from separate utility
import { setGlobalMapRef } from './mapUtils.ts'

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

// Component to handle map center changes and sync with tabs
const MapViewController: FC = () => {
  const map = useMap()
  const { updateMapPosition } = useControlPanelContext()

  // Set global map reference for access from other components
  useEffect(() => {
    setGlobalMapRef(map)
    return () => {
      setGlobalMapRef(null)
    }
  }, [map])

  // Get tabs context to sync map view state
  const tabsContext = useTabsContext()

  const isUpdatingFromTab = useRef(false)

  // Update map view when active tab changes
  useEffect(() => {
    if (tabsContext?.activeTab && map) {
      const { mapView } = tabsContext.activeTab
      console.log('MapViewController: Tab changed, updating map view:', {
        tabName: tabsContext.activeTab.name,
        mapView: mapView,
        center: { lat: mapView.center.lat, lng: mapView.center.lng },
        zoom: mapView.zoom,
      })

      isUpdatingFromTab.current = true

      // Set both center and zoom from the tab's map view
      map.setView([mapView.center.lat, mapView.center.lng], mapView.zoom)

      setTimeout(() => {
        isUpdatingFromTab.current = false
        console.log('MapViewController: Map view update completed')
      }, 100)
    }
  }, [tabsContext?.activeTab, map]) // Include activeTab since we're using it

  // Listen for map view changes and update control panel with position
  useMapEvents({
    moveend: () => {
      // Update control panel with current map position (but not during tab updates)
      if (!isUpdatingFromTab.current) {
        const center = map.getCenter()
        const zoom = map.getZoom()
        console.log('MapViewController: Map moved, updating control panel:', {
          lat: center.lat,
          lng: center.lng,
          zoom,
        })

        // Update control panel with new map position
        updateMapPosition(center.lat, center.lng)
      }
    },
  })

  return null
}
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

  // Listen for map zoom events and update controls only (removed tabs syncing)
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

        // Removed tabs context syncing - only sync on tab switch now
        console.log('Zoom changed to:', clampedZoom)
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

  // Get tabs context to set initial map center (zoom comes from controls)
  const tabsContext = useTabsContext()
  let initialCenter: LatLngExpression = CENTER

  if (tabsContext?.activeTab) {
    const { mapView } = tabsContext.activeTab
    initialCenter = [mapView.center.lat, mapView.center.lng]
    // Don't override zoom here - let ControlPanel handle it
  }

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
        center={initialCenter}
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
        <MapViewController />
        <WeatherLayers apiKey={API_KEY} />
        <MapPins />
      </MapContainer>
    </MapWrapper>
  )
}

export default Map

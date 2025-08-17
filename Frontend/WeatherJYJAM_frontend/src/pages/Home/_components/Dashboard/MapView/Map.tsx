import type { FC } from 'react'
import styled from 'styled-components'
import { MapContainer } from 'react-leaflet'
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet'
import WeatherLayers from './WeatherLayers'

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;

  .leaflet-container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const CENTER: LatLngExpression = [-25.2744, 133.7751] as const

const WORLD_BOUNDS: LatLngBoundsExpression = [
  [-85, -Infinity],
  [85, Infinity],
] as const

const Map: FC = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={CENTER}
        zoom={4}
        minZoom={2.5}
        maxZoom={18}
        zoomSnap={0.15}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        wheelDebounceTime={40}
        worldCopyJump={true}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={0.5}
        style={{ height: '100%', width: '100%' }}
      >
        <WeatherLayers apiKey={API_KEY} />
      </MapContainer>
    </MapWrapper>
  )
}

export default Map

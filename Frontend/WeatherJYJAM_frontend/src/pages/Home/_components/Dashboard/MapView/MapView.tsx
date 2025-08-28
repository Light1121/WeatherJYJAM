import type { FC } from 'react'
import styled from 'styled-components'
import Map from './Map'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

const MapTitle = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  color: #333;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

interface MapViewProps {
  currentTabId?: string
}

const getMapTitle = (currentTabId?: string): string => {
  if (!currentTabId) return 'map1'
  return `map${currentTabId.replace('tab', '')}`
}

const MapView: FC<MapViewProps> = ({ currentTabId }) => (
  <MapContainer>
    <MapTitle>{getMapTitle(currentTabId)}</MapTitle>
    <Map />
  </MapContainer>
)

export default MapView

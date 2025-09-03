import type { FC } from 'react'
import styled from 'styled-components'
import Map from './Map'

const MapContainer2 = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fffafa;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 0 15px 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`
const MapTitle = styled.div`
  position: absolute;
  font-family: 'Instrument Sans', sans-serif;
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
  <MapContainer2>
    <MapContainer>
      <MapTitle>{getMapTitle(currentTabId)}</MapTitle>
      <Map />
    </MapContainer>
  </MapContainer2>
)

export default MapView

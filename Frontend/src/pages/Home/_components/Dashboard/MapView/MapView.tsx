import type { FC } from 'react'
import styled from 'styled-components'
import Map from './Map'
import ControlPanel from './ControlPanel'
import type { TabData } from '../TabSidebar/_hooks/types'

const MapContainer2 = styled.div<{ $bgColor?: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${({ $bgColor }) => $bgColor || '#fffafa'};
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 0 15px 15px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;
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
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

interface MapViewProps {
  currentTabId?: string
  tabs: TabData[]
}

const MapView: FC<MapViewProps> = ({ currentTabId, tabs }) => {
  const selectedTab = tabs.find((tab) => tab.id === currentTabId)
  const bgColor = selectedTab?.color || '#fffafa'

  const getMapTitle = () => {
    if (!currentTabId || currentTabId === 'tab1') return 'Home'
    const tabNumber = parseInt(currentTabId.replace('tab', '')) - 1
    return `Map ${tabNumber}`
  }

  return (
    <MapContainer2 $bgColor={bgColor}>
      <MapContainer>
        <Map />

        <MapTitle>{getMapTitle()}</MapTitle>

        <ControlPanel />
      </MapContainer>
    </MapContainer2>
  )
}

export default MapView

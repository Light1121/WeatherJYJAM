import type { FC } from 'react'
import TabSidebar from './_components/TabSidebar'
import MapView from './_components/MapView'
import { styled } from 'styled-components'

const MapSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`

interface MapContainerProps {
  currentTabId?: string
}

const MapContainer: FC<MapContainerProps> = ({ currentTabId }) => (
  <MapSection>
    <TabSidebar currentTabId={currentTabId} />
    <MapView currentTabId={currentTabId} />
  </MapSection>
)

export default MapContainer

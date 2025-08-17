import type { FC } from 'react'
import TabSidebar from './TabSidebar'
import MapView from './MapView'
import { styled } from 'styled-components'

const MapSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`

interface DashboardProps {
  currentTabId?: string
}

const Dashboard: FC<DashboardProps> = ({ currentTabId }) => (
  <MapSection>
    <TabSidebar currentTabId={currentTabId} />
    <MapView currentTabId={currentTabId} />
  </MapSection>
)

export default Dashboard

import type { FC } from 'react'
import TabSidebar from './TabSidebar'
import MapView from './MapView'
import { styled } from 'styled-components'

const Background = styled.div`
  display: flex;
  flex: 1;
  border-radius: 15px;
  background-color: #f1fafdff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin: 20px;
`

const MapSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Instrument Sans', sans-serif;
`

interface DashboardProps {
  currentTabId?: string
}

const Dashboard: FC<DashboardProps> = ({ currentTabId }) => (
  <Background>
    <MapSection>
      <TabSidebar currentTabId={currentTabId} />
      <MapView currentTabId={currentTabId} />
    </MapSection>
  </Background>
)

export default Dashboard

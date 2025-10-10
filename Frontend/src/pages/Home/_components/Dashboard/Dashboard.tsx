import type { FC } from 'react'
import { useState } from 'react'

import MapView from './MapView'
import Sidebar from '@/_components/Sidebar'
import { styled } from 'styled-components'

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`

const Background = styled.div<{ $sidebarOpen: boolean }>`
  display: flex;
  flex: 1;
  border-radius: 15px;
  background-color: #f1fafdff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin: 20px;
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '300px' : '80px')};
  transition: margin-left 0.3s ease;
`

const MapSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Instrument Sans', sans-serif;
`

const Dashboard: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <DashboardContainer>
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <Background $sidebarOpen={sidebarOpen}>
        <MapSection>
          <MapView />
        </MapSection>
      </Background>
    </DashboardContainer>
  )
}

export default Dashboard

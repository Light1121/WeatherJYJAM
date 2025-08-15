import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../../../../../_components/Button'
import type { TabData } from '../index'

const TabButton = styled(Button)<{ $isActive: boolean }>`
  background-color: ${(props) => (props.$isActive ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.$isActive ? 'white' : '#333')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  border: 1px solid ${(props) => (props.$isActive ? '#007bff' : '#dee2e6')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#0056b3' : '#e9ecef')};
    transform: translateY(-1px);
  }
`

interface TabProps {
  tab: TabData
  isActive?: boolean
}

const getTabPath = (tabId: string): string =>
  tabId === 'tab1' ? '/' : `/${tabId}`

const Tab: FC<TabProps> = ({ tab, isActive = false }) => {
  const navigate = useNavigate()

  return (
    <TabButton
      onClick={() => navigate(getTabPath(tab.id))}
      $isActive={isActive}
    >
      {tab.title}
    </TabButton>
  )
}

export default Tab

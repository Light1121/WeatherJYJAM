import type { FC } from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import Button from '../../../../../_components/Button'
import { useTabs } from './_hooks/useTabs'

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 12%;
  flex-shrink: 0;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  gap: 8px;
  padding: 10px;

  > *:last-child {
    align-self: center;
    margin-top: 8px;
  }
`

interface TabSidebarProps {
  currentTabId?: string
}

const TabSidebar: FC<TabSidebarProps> = ({ currentTabId }) => {
  const { tabs, addNewTab } = useTabs()

  return (
    <SidebarContainer>
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} currentTabId={currentTabId} />
      ))}
      <Button variant="add" onClick={addNewTab}>
        +
      </Button>
    </SidebarContainer>
  )
}

export default TabSidebar

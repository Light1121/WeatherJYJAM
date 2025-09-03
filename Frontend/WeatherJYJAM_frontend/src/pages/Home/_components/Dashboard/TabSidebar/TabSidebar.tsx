import type { FC } from 'react'
import styled from 'styled-components'
import Tab from './Tab'
import { AddButtonWithTooltip } from './AddButton'
import { useTabs } from './_hooks/useTabs'

const SidebarContainer = styled.div`
  display: flex;
  font-family: 'Instrument Sans', sans-serif;
  flex-direction: column;
  height: 100%;
  width: 12%;
  flex-shrink: 0;
  background: #b5b7b9ff;
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

      <AddButtonWithTooltip onClick={addNewTab} />
    </SidebarContainer>
  )
}

export default TabSidebar

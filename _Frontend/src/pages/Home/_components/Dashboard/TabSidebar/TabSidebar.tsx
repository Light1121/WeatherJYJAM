import type { FC } from 'react'
import TabGroup from './TabGroup'
import type { TabData } from './_hooks/useTabs'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 12%;
  flex-shrink: 0;
  font-family: 'Instrument Sans', sans-serif;
  background: #ccc6c6ff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  gap: 8px;
  padding: 10px;
`

interface TabSidebarProps {
  tabs: TabData[]
  currentTabId?: string
  onAddTab: () => void
  onRenameTab: (id: string, newTitle: string) => void
}

const TabSidebar: FC<TabSidebarProps> = ({
  tabs,
  currentTabId,
  onAddTab,
  onRenameTab,
}) => {
  return (
    <SidebarContainer>
      <TabGroup
        tabs={tabs}
        currentTabId={currentTabId}
        onAddTab={onAddTab}
        onRenameTab={onRenameTab}
      />
    </SidebarContainer>
  )
}

export default TabSidebar

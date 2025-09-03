import type { FC } from 'react'
import styled from 'styled-components'
import TabGroup from './TabGroup'
import { useTabs } from './_hooks/useTabs'

const SidebarContainer = styled.div`
  display: flex;
  font-family: 'Instrument Sans', sans-serif;
  flex-direction: column;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 12%;
  flex-shrink: 0;
  background: #ccc6c6ff;
  gap: 8px;
  padding: 10px;
`

interface TabSidebarProps {
  currentTabId?: string
}

const TabSidebar: FC<TabSidebarProps> = ({ currentTabId }) => {
  const { tabs, addNewTab, renameTab } = useTabs()

  return (
    <SidebarContainer>
      <TabGroup
        tabs={tabs}
        currentTabId={currentTabId}
        onAddTab={addNewTab}
        onRenameTab={renameTab}
      />
    </SidebarContainer>
  )
}

export default TabSidebar

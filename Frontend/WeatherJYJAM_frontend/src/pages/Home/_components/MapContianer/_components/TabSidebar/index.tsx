import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import TabGroup from './_components/TabGroup'

export interface TabData {
  id: number
  title: string
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 12%;
  flex-shrink: 0;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
`

const DEFAULT_TABS: TabData[] = [
  { id: 1, title: 'Tab1' },
  { id: 2, title: 'Tab2' },
  { id: 3, title: 'Tab3' },
] as const

const TabSidebar: FC = () => {
  const [tabs, setTabs] = useState<TabData[]>(DEFAULT_TABS)

  const addNewTab = () => {
    const newTab = {
      id: Date.now(),
      title: `Tab${tabs.length + 1}`,
    }
    setTabs([...tabs, newTab])
  }

  return (
    <SidebarContainer>
      <TabGroup tabs={tabs} onAddTab={addNewTab} />
    </SidebarContainer>
  )
}

export default TabSidebar

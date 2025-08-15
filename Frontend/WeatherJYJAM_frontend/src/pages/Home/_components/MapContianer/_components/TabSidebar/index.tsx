import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import TabGroup from './_components/TabGroup'
import { useNavigate } from 'react-router-dom'

export interface TabData {
  id: string
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
  { id: 'tab1', title: 'Tab1' },
  { id: 'tab2', title: 'Tab2' },
  { id: 'tab3', title: 'Tab3' },
] as const

interface TabSidebarProps {
  currentTabId?: string
}

const TabSidebar: FC<TabSidebarProps> = ({ currentTabId }) => {
  const [tabs, setTabs] = useState<TabData[]>(DEFAULT_TABS)
  const navigate = useNavigate()

  const addNewTab = () => {
    const newTabNumber = tabs.length + 1
    const newTabId = `tab${newTabNumber}`

    const newTab: TabData = {
      id: newTabId,
      title: `Tab${newTabNumber}`,
    }

    setTabs((prevTabs) => [...prevTabs, newTab])

    navigate(`/${newTabId}`)
  }

  return (
    <SidebarContainer>
      <TabGroup tabs={tabs} currentTabId={currentTabId} onAddTab={addNewTab} />
    </SidebarContainer>
  )
}

export default TabSidebar

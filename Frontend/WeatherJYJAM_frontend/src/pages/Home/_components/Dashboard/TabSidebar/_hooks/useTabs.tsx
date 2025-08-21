import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface TabData {
  id: string
  title: string
}

const DEFAULT_TABS: TabData[] = [
  { id: 'tab1', title: 'Tab1' },
  { id: 'tab2', title: 'Tab2' },
  { id: 'tab3', title: 'Tab3' },
] as const

export const useTabs = () => {
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

  return {
    tabs,
    addNewTab,
  }
}

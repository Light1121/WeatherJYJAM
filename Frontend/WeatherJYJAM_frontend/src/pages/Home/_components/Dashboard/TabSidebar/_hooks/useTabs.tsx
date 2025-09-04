import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface TabData {
  id: string
  title: string
  color: string
}

const DEFAULT_TABS: TabData[] = [
  { id: 'tab1', title: 'Home', color: '#fffafa' },
]

const TAB_COLORS = ['#ade3ef', '#adefb3', '#ddefad', '#fabcc5ff', '#dab7f9ff']

export const useTabs = () => {
  const [tabs, setTabs] = useState<TabData[]>(DEFAULT_TABS)
  const navigate = useNavigate()

  const addNewTab = () => {
    const comparisonIndex = tabs.length //start at 1 since first is Home
    const newTabId = `tab${comparisonIndex + 1}`

    const newTab: TabData = {
      id: newTabId,
      title: `Comparison ${comparisonIndex}`,
      color: TAB_COLORS[(comparisonIndex - 1) % TAB_COLORS.length],
    }

    setTabs((prevTabs) => [...prevTabs, newTab])
    navigate(`/${newTabId}`)
  }

  const renameTab = (id: string, newTitle: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
    )
  }

  return {
    tabs,
    addNewTab,
    renameTab,
  }
}

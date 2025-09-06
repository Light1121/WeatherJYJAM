import { useState, useRef } from 'react'
import type { TabData } from '../types'
import { TAB_COLORS, BASE_TITLE, DEFAULT_TAB_COLOR } from '../tabConstants'
import {
  findMinAvailableNumber,
  generateTitle,
  generateTabId,
  selectTabColor,
} from '../tabUtils'

const DEFAULT_TABS: TabData[] = [
  { id: 'tab1', title: BASE_TITLE, color: DEFAULT_TAB_COLOR },
]

export const useTabsState = () => {
  const [tabs, setTabs] = useState<TabData[]>(DEFAULT_TABS)
  const tabIdCounterRef = useRef(1)

  const addTab = (): TabData => {
    tabIdCounterRef.current += 1
    const newTabId = generateTabId(tabIdCounterRef.current)

    const existingTitles = tabs.map((tab) => tab.title)
    const availableNumber = findMinAvailableNumber(existingTitles, BASE_TITLE)
    const newTitle = generateTitle(BASE_TITLE, availableNumber)
    const newColor = selectTabColor(tabs.length, TAB_COLORS)

    const newTab: TabData = {
      id: newTabId,
      title: newTitle,
      color: newColor,
    }

    setTabs((prevTabs) => [...prevTabs, newTab])
    return newTab
  }

  const removeTab = (id: string) => {
    setTabs((prevTabs) => prevTabs.filter((t) => t.id !== id))
  }

  const updateTabTitle = (id: string, newTitle: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((t) => (t.id === id ? { ...t, title: newTitle } : t)),
    )
  }

  return {
    tabs,
    addTab,
    removeTab,
    updateTabTitle,
  }
}

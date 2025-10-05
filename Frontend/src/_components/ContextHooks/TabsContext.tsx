import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { LatLng } from 'leaflet'
import type { PinData } from './contexts'
import type { ControlPanelState } from './ControlPanelContext'

export interface MapViewState {
  center: LatLng
  zoom: number
}

export interface TabData {
  id: string
  name: string
  createdAt: Date
  lastModified: Date
  pins: PinData[]
  mapView: MapViewState
  controlPanelSettings: ControlPanelState
}

export interface TabsContextType {
  tabs: TabData[]
  activeTabId: string | null
  activeTab: TabData | null
  addTab: (name?: string) => string
  removeTab: (tabId: string) => void
  renameTab: (tabId: string, newName: string) => void
  switchTab: (tabId: string) => void
  updateTabPins: (tabId: string, pins: PinData[]) => void
  updateTabMapView: (tabId: string, mapView: MapViewState) => void
  updateTabControlPanelSettings: (
    tabId: string,
    settings: ControlPanelState,
  ) => void
  saveCurrentTabState: (
    pins: PinData[],
    mapView: MapViewState,
    controlPanelSettings: ControlPanelState,
  ) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

interface TabsProviderProps {
  children: ReactNode
}

// Default states
const defaultMapView: MapViewState = {
  center: new LatLng(-25.2744, 133.7751),
  zoom: 5,
}

const defaultControlPanelSettings: ControlPanelState = {
  zoom: 5,
  opacity: 100,
  contrast: 100,
  saturation: 100,
  brightness: 100,
  hue: 0,
  colorMode: 'default',
  mapPosition: {
    lat: -25.2744,
    lng: 133.7751,
  },
}

const createNewTab = (name?: string): TabData => {
  const now = new Date()
  const id = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  return {
    id,
    name: name || `Tab ${Date.now().toString().slice(-4)}`,
    createdAt: now,
    lastModified: now,
    pins: [],
    mapView: { ...defaultMapView },
    controlPanelSettings: { ...defaultControlPanelSettings },
  }
}

// Local storage keys
const STORAGE_KEYS = {
  TABS: 'weatherJYJAM_tabs',
  ACTIVE_TAB_ID: 'weatherJYJAM_activeTabId',
} as const

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<TabData[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)

  // Load tabs from localStorage on mount
  useEffect(() => {
    try {
      const savedTabs = localStorage.getItem(STORAGE_KEYS.TABS)
      const savedActiveTabId = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB_ID)

      if (savedTabs) {
        const parsedTabs = JSON.parse(savedTabs)
        // Convert dates back from strings and recreate LatLng objects for pins
        const restoredTabs = parsedTabs.map(
          (tab: {
            id: string
            name: string
            createdAt: string
            lastModified: string
            pins?: Array<{
              id: string
              position: { lat: number; lng: number }
              name?: string
              weather?: unknown
            }>
            mapView?: { center: { lat: number; lng: number }; zoom: number }
            controlPanelSettings?: ControlPanelState
          }) => ({
            ...tab,
            createdAt: new Date(tab.createdAt),
            lastModified: new Date(tab.lastModified),
            // Recreate LatLng objects for pins
            pins:
              tab.pins?.map((pin) => ({
                ...pin,
                position: new LatLng(
                  pin.position?.lat || 0,
                  pin.position?.lng || 0,
                ),
              })) || [],
            // Recreate LatLng object for map view center
            mapView: {
              ...tab.mapView,
              center: new LatLng(
                tab.mapView?.center?.lat || -25.2744,
                tab.mapView?.center?.lng || 133.7751,
              ),
            },
          }),
        )
        setTabs(restoredTabs)

        // Restore active tab if it exists
        if (
          savedActiveTabId &&
          restoredTabs.some((tab: TabData) => tab.id === savedActiveTabId)
        ) {
          setActiveTabId(savedActiveTabId)
        } else if (restoredTabs.length > 0) {
          setActiveTabId(restoredTabs[0].id)
        }
      } else {
        // Create default tab if no saved tabs
        const defaultTab = createNewTab('Default')
        setTabs([defaultTab])
        setActiveTabId(defaultTab.id)
      }
    } catch (error) {
      console.error('Error loading tabs from localStorage:', error)
      // Create default tab on error
      const defaultTab = createNewTab('Default')
      setTabs([defaultTab])
      setActiveTabId(defaultTab.id)
    }
  }, [])

  // Save tabs to localStorage whenever tabs change
  useEffect(() => {
    if (tabs.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEYS.TABS, JSON.stringify(tabs))
      } catch (error) {
        console.error('Error saving tabs to localStorage:', error)
      }
    }
  }, [tabs])

  // Save active tab ID to localStorage
  useEffect(() => {
    if (activeTabId) {
      try {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB_ID, activeTabId)
      } catch (error) {
        console.error('Error saving active tab ID to localStorage:', error)
      }
    }
  }, [activeTabId])

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || null

  const addTab = (name?: string): string => {
    const newTab = createNewTab(name)
    setTabs((prevTabs) => [...prevTabs, newTab])
    setActiveTabId(newTab.id)
    return newTab.id
  }

  const removeTab = (tabId: string) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.filter((tab) => tab.id !== tabId)

      // If we're removing the active tab, switch to another tab
      if (tabId === activeTabId) {
        if (updatedTabs.length > 0) {
          // Switch to the next tab, or the first tab if it was the last one
          const removedIndex = prevTabs.findIndex((tab) => tab.id === tabId)
          const newActiveTab =
            updatedTabs[removedIndex] ||
            updatedTabs[removedIndex - 1] ||
            updatedTabs[0]
          setActiveTabId(newActiveTab.id)
        } else {
          // If no tabs left, create a new default tab
          const defaultTab = createNewTab('Default')
          setActiveTabId(defaultTab.id)
          return [defaultTab]
        }
      }

      return updatedTabs
    })
  }

  const renameTab = (tabId: string, newName: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, name: newName, lastModified: new Date() }
          : tab,
      ),
    )
  }

  const switchTab = (tabId: string) => {
    if (tabs.find((tab) => tab.id === tabId)) {
      console.log('Switching to tab:', tabId) // Debug log
      const targetTab = tabs.find((tab) => tab.id === tabId)
      console.log('Target tab data:', targetTab) // Debug log
      setActiveTabId(tabId)
    }
  }

  const updateTabPins = (tabId: string, pins: PinData[]) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, pins, lastModified: new Date() } : tab,
      ),
    )
  }

  const updateTabMapView = (tabId: string, mapView: MapViewState) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, mapView, lastModified: new Date() } : tab,
      ),
    )
  }

  const updateTabControlPanelSettings = (
    tabId: string,
    settings: ControlPanelState,
  ) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, controlPanelSettings: settings, lastModified: new Date() }
          : tab,
      ),
    )
  }

  const saveCurrentTabState = (
    pins: PinData[],
    mapView: MapViewState,
    controlPanelSettings: ControlPanelState,
  ) => {
    if (activeTabId) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                pins,
                mapView,
                controlPanelSettings,
                lastModified: new Date(),
              }
            : tab,
        ),
      )
    }
  }

  const contextValue: TabsContextType = {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    removeTab,
    renameTab,
    switchTab,
    updateTabPins,
    updateTabMapView,
    updateTabControlPanelSettings,
    saveCurrentTabState,
  }

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  )
}

export default TabsContext

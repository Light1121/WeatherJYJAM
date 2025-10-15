import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { LatLng } from 'leaflet'
import type { PinData } from './contexts'
import type { ControlPanelState } from './ControlPanelContext'
import { saveTabs, loadTabs, type TabData as BackendTabData } from '../../api'
import { getToken } from '../../api/config'

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
  exportTabsToJSON: () => void
  importTabsFromJSON: (file: File) => Promise<void>
  clearAllTabs: () => void
  loadTabsFromBackend: () => Promise<void>
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

// Interface for exported/imported data
interface TabsExportData {
  tabs: Array<{
    id: string
    name: string
    createdAt: string
    lastModified: string
    pins?: Array<{
      id: string
      position: { lat: number; lng: number }
      locationName: string
      weatherData?: {
        temperature: number
        windSpeed: number
        humidity: number
        description: string
      }
    }>
    mapView?: { center: { lat: number; lng: number }; zoom: number }
    controlPanelSettings?: ControlPanelState
  }>
  activeTabId: string | null
  exportedAt: string
  version: string
}

// JSON file utilities
const downloadJSONFile = (data: object, filename: string) => {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const parseJSONFile = (file: File): Promise<TabsExportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target?.result as string)
        resolve(result)
      } catch {
        reject(new Error('Invalid JSON file format'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<TabData[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const isInitialMount = useRef(true)
  const isSaving = useRef(false)

  // Initialize with default tab on mount
  useEffect(() => {
    const defaultTab = createNewTab('Default')
    setTabs([defaultTab])
    setActiveTabId(defaultTab.id)
  }, [])

  // 🔍 监听 tabs 变化并打印到 console
  // 格式匹配后端结构: { tab_name, map, pin }
  useEffect(() => {
    if (tabs.length === 0) return

    // 格式化 tabs 数据，匹配后端 Tab 模型
    const tabsList = tabs.map((tab) => ({
      id: tab.id,
      tab_name: tab.name, // 匹配后端字段名

      // map 字段包含所有地图相关数据 (center, zoom, control panel 设置, layer)
      map: {
        center: {
          lat: tab.mapView.center.lat,
          lng: tab.mapView.center.lng,
        },
        zoom: tab.mapView.zoom,
        // Control Panel 设置
        opacity: tab.controlPanelSettings.opacity,
        contrast: tab.controlPanelSettings.contrast,
        saturation: tab.controlPanelSettings.saturation,
        brightness: tab.controlPanelSettings.brightness,
        hue: tab.controlPanelSettings.hue,
        colorMode: tab.controlPanelSettings.colorMode,
        // TODO: 添加 layer 信息（如 Temperature, Humidity, Wind Speed 等）
      },

      // pin 字段包含所有 pins 数据
      pin: {
        pins: tab.pins.map((pin) => ({
          id: pin.id,
          locationName: pin.locationName,
          position: {
            lat: pin.position.lat,
            lng: pin.position.lng,
          },
          weatherData: pin.weatherData,
        })),
      },

      // 元数据（不发送到后端，仅用于前端显示）
      _metadata: {
        createdAt: tab.createdAt.toISOString(),
        lastModified: tab.lastModified.toISOString(),
      },
    }))

    console.log('📋 === USER TABS LIST (Backend Format) ===')
    console.log({
      totalTabs: tabs.length,
      activeTabId: activeTabId,
      tabs: tabsList,
    })
    console.log('==========================================')
  }, [tabs, activeTabId])

  // Note: Tabs are now managed through JSON file import/export
  // No automatic saving - users must manually export their tabs

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

  const exportTabsToJSON = () => {
    const exportData = {
      tabs,
      activeTabId,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, 19)
    const filename = `weatherjyjam-tabs-${timestamp}.json`

    downloadJSONFile(exportData, filename)
    console.log('Tabs exported to:', filename)
  }

  const importTabsFromJSON = async (file: File): Promise<void> => {
    try {
      const data = await parseJSONFile(file)

      // Validate the imported data structure
      if (!data.tabs || !Array.isArray(data.tabs)) {
        throw new Error('Invalid tabs data format')
      }

      // Restore tabs with proper object reconstruction
      const restoredTabs = data.tabs.map((tab) => ({
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
          zoom: tab.mapView?.zoom || 5,
          center: new LatLng(
            tab.mapView?.center?.lat || -25.2744,
            tab.mapView?.center?.lng || 133.7751,
          ),
        },
        // Ensure controlPanelSettings has default values
        controlPanelSettings:
          tab.controlPanelSettings || defaultControlPanelSettings,
      }))

      setTabs(restoredTabs)

      // Restore active tab if it exists in imported data
      if (
        data.activeTabId &&
        restoredTabs.some((tab: TabData) => tab.id === data.activeTabId)
      ) {
        setActiveTabId(data.activeTabId)
      } else if (restoredTabs.length > 0) {
        setActiveTabId(restoredTabs[0].id)
      }

      console.log('Tabs imported successfully:', restoredTabs.length, 'tabs')
    } catch {
      console.error('Error importing tabs')
      throw new Error('Failed to import tabs')
    }
  }

  const clearAllTabs = () => {
    const defaultTab = createNewTab('Default')
    setTabs([defaultTab])
    setActiveTabId(defaultTab.id)
    console.log('All tabs cleared, reset to default')
  }

  // 🔄 Load tabs from backend
  const loadTabsFromBackend = async () => {
    try {
      console.log('📥 Loading tabs from backend...')
      const response = await loadTabs()

      if (response.tabs && response.tabs.length > 0) {
        // Convert backend tabs to frontend format
        const loadedTabs: TabData[] = response.tabs.map((backendTab) => ({
          id: `tab_${backendTab.id}`,
          name: backendTab.tab_name,
          createdAt: new Date(),
          lastModified: new Date(),

          // Restore pins
          pins:
            backendTab.pin?.pins?.map((pin) => ({
              id: pin.id,
              locationName: pin.locationName,
              position: new LatLng(pin.position.lat, pin.position.lng),
              weatherData: pin.weatherData,
            })) || [],

          // Restore map view
          mapView: {
            center: new LatLng(
              backendTab.map?.center?.lat || -25.2744,
              backendTab.map?.center?.lng || 133.7751,
            ),
            zoom: backendTab.map?.zoom || 5,
          },

          // Restore control panel settings
          controlPanelSettings: {
            zoom: backendTab.map?.zoom || 5,
            opacity: backendTab.map?.opacity || 100,
            contrast: backendTab.map?.contrast || 100,
            saturation: backendTab.map?.saturation || 100,
            brightness: backendTab.map?.brightness || 100,
            hue: backendTab.map?.hue || 0,
            colorMode: backendTab.map?.colorMode || 'default',
            mapPosition: {
              lat: backendTab.map?.center?.lat || -25.2744,
              lng: backendTab.map?.center?.lng || 133.7751,
            },
          },
        }))

        setTabs(loadedTabs)
        if (loadedTabs.length > 0) {
          setActiveTabId(loadedTabs[0].id)
        }
        console.log('✅ Tabs loaded from backend:', loadedTabs.length, 'tabs')
      } else {
        console.log('ℹ️ No tabs found in backend, keeping local tabs')
      }
    } catch (error) {
      console.error('❌ Failed to load tabs from backend:', error)
      // Keep local tabs if backend load fails
    }
  }

  // 💾 Auto-save to backend when tabs change (if logged in)
  useEffect(() => {
    // Skip first render and when already saving
    if (isInitialMount.current || isSaving.current) {
      isInitialMount.current = false
      return
    }

    // Only save if user is logged in
    const token = getToken()
    if (!token) {
      console.log('⚠️ Not logged in, skipping backend save')
      return
    }

    // Don't save if no tabs
    if (tabs.length === 0) return

    // Debounce save
    const saveTimeout = setTimeout(async () => {
      try {
        isSaving.current = true
        console.log('💾 Auto-saving tabs to backend...')

        // Convert frontend tabs to backend format
        const backendTabs: BackendTabData[] = tabs.map((tab) => ({
          tab_name: tab.name,
          map: {
            center: {
              lat: tab.mapView.center.lat,
              lng: tab.mapView.center.lng,
            },
            zoom: tab.mapView.zoom,
            opacity: tab.controlPanelSettings.opacity,
            contrast: tab.controlPanelSettings.contrast,
            saturation: tab.controlPanelSettings.saturation,
            brightness: tab.controlPanelSettings.brightness,
            hue: tab.controlPanelSettings.hue,
            colorMode: tab.controlPanelSettings.colorMode,
          },
          pin: {
            pins: tab.pins.map((pin) => ({
              id: pin.id,
              locationName: pin.locationName,
              position: {
                lat: pin.position.lat,
                lng: pin.position.lng,
              },
              weatherData: pin.weatherData,
            })),
          },
        }))

        await saveTabs(backendTabs)
        console.log('✅ Tabs saved to backend successfully')
      } catch (error) {
        console.error('❌ Failed to save tabs to backend:', error)
      } finally {
        isSaving.current = false
      }
    }, 1000) // 1 second debounce

    return () => clearTimeout(saveTimeout)
  }, [tabs])

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
    exportTabsToJSON,
    importTabsFromJSON,
    clearAllTabs,
    loadTabsFromBackend,
  }

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  )
}

export default TabsContext

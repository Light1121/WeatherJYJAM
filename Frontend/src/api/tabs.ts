/**
 * Tabs API
 * Handles tabs data synchronization with backend
 */

import { API_ENDPOINTS, getAuthHeader } from './config'

export interface TabMapData {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  opacity: number
  contrast: number
  saturation: number
  brightness: number
  hue: number
  colorMode: string
}

export interface TabPinData {
  pins: Array<{
    id: string
    locationName: string
    position: {
      lat: number
      lng: number
    }
    weatherData?: {
      temperature: number
      windSpeed: number
      humidity: number
      description: string
    }
  }>
}

export interface TabData {
  id?: number
  tab_name: string
  map: TabMapData
  pin: TabPinData
}

export interface TabsListResponse {
  tabs: Array<{
    id: number
    uid: string
    tab_name: string
    map: TabMapData
    pin: TabPinData
  }>
}

export interface SaveTabsRequest {
  tabs: TabData[]
}

export interface SaveTabsResponse {
  success: boolean
  tabs: Array<{
    id: number
    uid: string
    tab_name: string
    map: TabMapData
    pin: TabPinData
  }>
}

/**
 * Load user's tabs from backend
 */
export const loadTabs = async (): Promise<TabsListResponse> => {
  const token = localStorage.getItem('jwt_token')
  console.log(
    '🔑 JWT Token from localStorage:',
    token ? token.substring(0, 20) + '...' : 'NOT FOUND',
  )

  const authHeader = getAuthHeader()
  console.log('📤 Auth Header:', authHeader)
  console.log('📍 Request URL:', API_ENDPOINTS.myTabs)

  const response = await fetch(API_ENDPOINTS.myTabs, {
    method: 'GET',
    headers: {
      ...authHeader,
    },
  })

  console.log('📡 Response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Load tabs error:', errorText)
    throw new Error('Failed to load tabs')
  }

  return response.json()
}

/**
 * Save user's tabs to backend
 */
export const saveTabs = async (tabs: TabData[]): Promise<SaveTabsResponse> => {
  const token = localStorage.getItem('jwt_token')
  console.log(
    '🔑 JWT Token for save:',
    token ? token.substring(0, 20) + '...' : 'NOT FOUND',
  )

  const authHeader = getAuthHeader()
  console.log('📤 Save Auth Header:', authHeader)

  const response = await fetch(API_ENDPOINTS.myTabs, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify({ tabs }),
  })

  console.log('📡 Save response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Save tabs error:', errorText)
    throw new Error('Failed to save tabs')
  }

  return response.json()
}

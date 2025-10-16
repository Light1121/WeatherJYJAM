/**
 * API Configuration
 * Centralized API endpoint management
 */

// Toggle between local development and production
const USE_LOCAL = false // Set to true for local development

const LOCAL_API_URL = 'http://127.0.0.1:2333'
const PRODUCTION_API_URL = 'https://weatherjyjam-production.up.railway.app'

export const API_BASE_URL = USE_LOCAL ? LOCAL_API_URL : PRODUCTION_API_URL

export const API_ENDPOINTS = {
  // Auth endpoints
  register: `${API_BASE_URL}/api/auth/register`,
  login: `${API_BASE_URL}/api/auth/login`,
  logout: `${API_BASE_URL}/api/auth/logout`,

  // Search endpoints
  search: `${API_BASE_URL}/api/search`,
  searchAI: `${API_BASE_URL}/api/search/ai`,

  // Weather endpoints
  weatherNearest: `${API_BASE_URL}/api/weather/nearest`,
  weatherByStation: (stationName: string) =>
    `${API_BASE_URL}/api/weather/avg_${encodeURIComponent(stationName)}`,

  // User profile endpoints (JWT required)
  me: `${API_BASE_URL}/api/me`,
  meSetting: `${API_BASE_URL}/api/me/setting`,
  meAvatar: `${API_BASE_URL}/api/me/avatar`,

  // Tabs endpoints (JWT required)
  myTabs: `${API_BASE_URL}/api/my/tabs`,
  myTab: (tabId: number) => `${API_BASE_URL}/api/my/tabs/${tabId}`,
} as const

/**
 * Helper function to get Authorization header with JWT token
 */
export const getAuthHeader = ():
  | { Authorization: string }
  | Record<string, never> => {
  const token = localStorage.getItem('jwt_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Helper function to save JWT token
 */
export const saveToken = (token: string) => {
  localStorage.setItem('jwt_token', token)
}

/**
 * Helper function to remove JWT token
 */
export const removeToken = () => {
  localStorage.removeItem('jwt_token')
}

/**
 * Helper function to get current JWT token
 */
export const getToken = (): string | null => {
  return localStorage.getItem('jwt_token')
}

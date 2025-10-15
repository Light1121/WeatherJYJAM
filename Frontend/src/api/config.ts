/**
 * API Configuration
 * Centralized API endpoint management
 */

// Toggle between local development and production
const USE_LOCAL = true // Set to true for local development

const LOCAL_API_URL = 'http://127.0.0.1:2333'
const PRODUCTION_API_URL = 'https://weatherjyjam-production.up.railway.app'

export const API_BASE_URL = USE_LOCAL ? LOCAL_API_URL : PRODUCTION_API_URL

export const API_ENDPOINTS = {
  // Search endpoints
  search: `${API_BASE_URL}/api/search`,
  searchAI: `${API_BASE_URL}/api/search/ai`,

  // Weather endpoints
  weatherNearest: `${API_BASE_URL}/api/weather/nearest`,
  weatherByStation: (stationName: string) =>
    `${API_BASE_URL}/api/weather/avg_${encodeURIComponent(stationName)}`,

  // User endpoints (for future use)
  user: `${API_BASE_URL}/api/user`,
  me: `${API_BASE_URL}/api/me`,
} as const

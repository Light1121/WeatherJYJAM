import type { Map } from 'leaflet'

// Global map reference for access from other components
let globalMapRef: Map | null = null

export const getGlobalMapRef = (): Map | null => globalMapRef

export const setGlobalMapRef = (map: Map | null): void => {
  globalMapRef = map
}

/**
 * AuthTabsSync Component
 *
 * Synchronizes tabs data between frontend and backend based on authentication state.
 * - On mount: Loads user's tabs from backend if logged in
 * - On login: Automatically loads tabs
 * - On logout: Keeps local tabs (they won't be saved to backend)
 */

import { useEffect, useRef } from 'react'
import { useAuthContext } from './hooks'
import { useTabsContext } from './hooks'

export const AuthTabsSync: React.FC = () => {
  const { isLoggedIn } = useAuthContext()
  const { loadTabsFromBackend } = useTabsContext()
  const hasLoadedOnMount = useRef(false)

  useEffect(() => {
    // Load tabs from backend when user is logged in
    // Only load once on mount to avoid unnecessary requests
    if (isLoggedIn && !hasLoadedOnMount.current) {
      console.log('🔄 User is logged in, loading tabs from backend...')
      loadTabsFromBackend().catch((error) => {
        console.error('❌ Failed to load tabs on mount:', error)
      })
      hasLoadedOnMount.current = true
    }

    // Reset flag when user logs out
    if (!isLoggedIn) {
      hasLoadedOnMount.current = false
    }
  }, [isLoggedIn, loadTabsFromBackend])

  return null // This component doesn't render anything
}

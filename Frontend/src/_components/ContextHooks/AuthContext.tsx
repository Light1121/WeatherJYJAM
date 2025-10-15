import { useState, useCallback, useEffect, type ReactNode } from 'react'
import { AuthContext, type User } from './authContext'
import { getCurrentUser, logout as apiLogout, getToken } from '../../api'

interface AuthProviderProps {
  children: ReactNode
}

const USER_STORAGE_KEY = 'auth_user'

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken()
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)

      console.log('🔍 Checking auth on mount:', {
        hasToken: !!token,
        hasStoredUser: !!storedUser,
        token: token?.substring(0, 20) + '...',
      })

      if (token && storedUser) {
        try {
          const userObj = JSON.parse(storedUser)

          // First restore user from localStorage immediately for better UX
          setUser(userObj)
          setIsLoggedIn(true)
          console.log('✅ Restored user from localStorage:', userObj)

          // Then verify token is still valid in background
          try {
            const currentUser = await getCurrentUser()
            console.log('✅ Token verified with backend:', currentUser)

            // Update with fresh data from backend
            const updatedUser = {
              id: currentUser.uid,
              email: currentUser.email,
              name: currentUser.name,
            }
            setUser(updatedUser)
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
          } catch (error) {
            console.warn(
              '⚠️ Token verification failed, but keeping local session:',
              error,
            )
            // Keep the local session even if backend verification fails
            // This handles network issues gracefully
          }
        } catch (error) {
          // Only clear if there's a parsing error
          console.error('❌ Error parsing stored user:', error)
          localStorage.removeItem(USER_STORAGE_KEY)
          localStorage.removeItem('jwt_token')
        }
      } else {
        console.log('ℹ️ No token or stored user found')
      }
    }

    checkAuth()
  }, [])

  const login = useCallback((userData: User) => {
    console.log('🔐 Logging in user:', userData)
    setUser(userData)
    setIsLoggedIn(true)
    // Persist user data to localStorage
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }, [])

  const logout = useCallback(async () => {
    console.log('🚪 Logging out...')
    try {
      await apiLogout()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      setUser(null)
      setIsLoggedIn(false)
      localStorage.removeItem(USER_STORAGE_KEY)
      console.log('✅ Logged out successfully')
    }
  }, [])

  // Don't block rendering, just provide the context
  // This prevents the blank screen issue
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

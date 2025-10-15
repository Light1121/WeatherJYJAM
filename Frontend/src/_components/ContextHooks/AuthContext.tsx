import { useState, useCallback, type ReactNode } from 'react'
import { AuthContext, type User } from './authContext'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback((userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsLoggedIn(false)
  }, [])

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

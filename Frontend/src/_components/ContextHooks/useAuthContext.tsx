import { useContext } from 'react'
import { AuthContext, type AuthContextType } from './authContext'

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

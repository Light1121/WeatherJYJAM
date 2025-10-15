import { createContext } from 'react'

export interface User {
  id: string
  email: string
  name?: string
}

export interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Authentication API
 * Handles user registration, login, and logout
 */

import { API_ENDPOINTS, saveToken, removeToken, getAuthHeader } from './config'

export interface User {
  uid: string
  name: string
  email: string
}

export interface LoginResponse {
  success: boolean
  message: string
  access_token: string
  user: User
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: User
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

/**
 * Register a new user
 */
export const register = async (
  data: RegisterData,
): Promise<RegisterResponse> => {
  const response = await fetch(API_ENDPOINTS.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}

/**
 * Login user and save JWT token
 */
export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(API_ENDPOINTS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Login failed')
  }

  const result: LoginResponse = await response.json()

  // Save JWT token to localStorage
  saveToken(result.access_token)

  return result
}

/**
 * Logout user and remove JWT token
 */
export const logout = async (): Promise<void> => {
  try {
    await fetch(API_ENDPOINTS.logout, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
    })
  } catch (error) {
    console.error('Logout API call failed:', error)
  } finally {
    // Always remove token locally
    removeToken()
  }
}

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch(API_ENDPOINTS.me, {
    headers: {
      ...getAuthHeader(),
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get user profile')
  }

  const data = await response.json()
  return data.user
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

interface LoginFormData {
  email: string
  password: string
}

interface LoginState {
  formData: LoginFormData
  passwordVisible: boolean
  fadeIn: boolean
  fadeOut: boolean
  isLoading: boolean
  error: string | null
}

export const useLogin = () => {
  const navigate = useNavigate()

  const [state, setState] = useState<LoginState>({
    formData: {
      email: '',
      password: '',
    },
    passwordVisible: false,
    fadeIn: false,
    fadeOut: false,
    isLoading: false,
    error: null,
  })

  const updateFormData = (field: keyof LoginFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      error: null,
    }))
  }

  const togglePasswordVisible = () => {
    setState((prev) => ({ ...prev, passwordVisible: !prev.passwordVisible }))
  }

  const setFadeIn = (fadeIn: boolean) => {
    setState((prev) => ({ ...prev, fadeIn }))
  }

  const setFadeOut = (fadeOut: boolean) => {
    setState((prev) => ({ ...prev, fadeOut }))
  }

  const validateForm = (): boolean => {
    const { email, password } = state.formData

    if (!email.trim()) {
      setState((prev) => ({ ...prev, error: 'Email is required' }))
      return false
    }

    if (!password) {
      setState((prev) => ({ ...prev, error: 'Password is required' }))
      return false
    }

    return true
  }

  const login = async (): Promise<void> => {
    if (!validateForm()) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      console.log('Attempting login for:', state.formData.email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: state.formData.email,
        password: state.formData.password,
      })

      console.log('Login result:', { data, error })

      if (error) {
        console.error('Login error:', error)

        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          throw new Error(
            'Invalid email or password. Please check your credentials and try again.',
          )
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error(
            'Please check your email and click the confirmation link before logging in.',
          )
        } else {
          throw error
        }
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.id)
        setState((prev) => ({ ...prev, isLoading: false }))
        setFadeOut(true)
        setTimeout(() => navigate('/'), 500)
      }
    } catch (error: unknown) {
      console.error('Login failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.'
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }))
    }
  }

  const handleSignUpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setFadeOut(true)
    setTimeout(() => navigate('/signup'), 500)
  }

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    console.log('Forgot password clicked')
  }

  return {
    ...state,
    updateFormData,
    togglePasswordVisible,
    setFadeIn,
    setFadeOut,
    login,
    handleSignUpClick,
    handleForgotPassword,
  }
}

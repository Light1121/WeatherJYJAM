import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../../../api'
import {
  useAuthContext,
  useTabsContext,
} from '../../../_components/ContextHooks/hooks'

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
  const { login: authLogin } = useAuthContext()
  const { loadTabsFromBackend } = useTabsContext()

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
      const response = await apiLogin({
        email: state.formData.email,
        password: state.formData.password,
      })

      // Update auth context with user info
      authLogin({
        id: response.user.uid,
        email: response.user.email,
        name: response.user.name,
      })

      // 📥 Load user's tabs from backend after successful login
      console.log('🔄 Login successful, loading tabs from backend...')
      await loadTabsFromBackend()

      setFadeOut(true)
      setTimeout(() => navigate('/'), 500)
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : 'Login failed. Please try again.',
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

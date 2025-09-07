import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SignUpFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface SignUpState {
  formData: SignUpFormData
  passwordVisible: boolean
  confirmVisible: boolean
  fadeIn: boolean
  fadeOut: boolean
  isLoading: boolean
  error: string | null
}

export const useSignUp = () => {
  const navigate = useNavigate()

  const [state, setState] = useState<SignUpState>({
    formData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    passwordVisible: false,
    confirmVisible: false,
    fadeIn: false,
    fadeOut: false,
    isLoading: false,
    error: null,
  })

  const updateFormData = (field: keyof SignUpFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
      error: null,
    }))
  }

  const togglePasswordVisible = () => {
    setState((prev) => ({ ...prev, passwordVisible: !prev.passwordVisible }))
  }

  const toggleConfirmVisible = () => {
    setState((prev) => ({ ...prev, confirmVisible: !prev.confirmVisible }))
  }

  const setFadeIn = (fadeIn: boolean) => {
    setState((prev) => ({ ...prev, fadeIn }))
  }

  const setFadeOut = (fadeOut: boolean) => {
    setState((prev) => ({ ...prev, fadeOut }))
  }

  const validateForm = (): boolean => {
    const { username, email, password, confirmPassword } = state.formData

    if (!username.trim()) {
      setState((prev) => ({ ...prev, error: 'Username is required' }))
      return false
    }

    if (!email.trim()) {
      setState((prev) => ({ ...prev, error: 'Email is required' }))
      return false
    }

    if (!password) {
      setState((prev) => ({ ...prev, error: 'Password is required' }))
      return false
    }

    if (password !== confirmPassword) {
      setState((prev) => ({ ...prev, error: 'Passwords do not match' }))
      return false
    }

    return true
  }

  const signUp = async (): Promise<void> => {
    if (!validateForm()) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await fetch('http://localhost:2333/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: state.formData.username,
          email: state.formData.email,
          password: state.formData.password,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('User created:', result)

        setFadeOut(true)
        setTimeout(() => navigate('/login'), 500)
      } else {
        const errorData = await response.json()
        setState((prev) => ({
          ...prev,
          error: errorData.message || 'Sign up failed',
          isLoading: false,
        }))
      }
    } catch {
      setState((prev) => ({
        ...prev,
        error: 'Network error. Please try again.',
        isLoading: false,
      }))
    }
  }

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setFadeOut(true)
    setTimeout(() => navigate('/login'), 500)
  }

  return {
    ...state,
    updateFormData,
    togglePasswordVisible,
    toggleConfirmVisible,
    setFadeIn,
    setFadeOut,
    signUp,
    handleLoginClick,
  }
}

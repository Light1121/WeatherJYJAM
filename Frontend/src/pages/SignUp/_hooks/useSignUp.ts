import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../lib/supabase'

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

    if (password.length < 6) {
      setState((prev) => ({
        ...prev,
        error: 'Password must be at least 6 characters',
      }))
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
      console.log('Starting signup process for:', state.formData.email)

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: state.formData.email,
        password: state.formData.password,
        options: {
          data: {
            username: state.formData.username,
          },
        },
      })

      console.log('Auth signup result:', { authData, authError })

      if (authError) {
        throw authError
      }

      if (authData.user) {
        console.log('User created:', authData.user.id)

        // Create profile, tabs, and settings
        console.log('Creating user profile...')

        const { error: profileError } = await supabase.rpc(
          'create_user_profile',
          {
            user_id: authData.user.id,
            user_email: state.formData.email,
            user_username: state.formData.username,
          },
        )

        if (profileError) {
          console.error('Profile creation error:', profileError)
          throw profileError
        }

        console.log('Profile created successfully')

        setState((prev) => ({ ...prev, isLoading: false }))
        setFadeOut(true)
        setTimeout(() => navigate('/'), 500) // Redirect to homepage instead of login
      }
    } catch (error: unknown) {
      console.error('Signup error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      setState((prev) => ({
        ...prev,
        error: errorMessage,
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

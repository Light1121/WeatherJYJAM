import type { FC } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { FormContainer, FormField, FormButton } from '../../../_components/Form'
import { useLogin } from '../_hooks/useLogin'

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`

const LinkRow = styled.div`
  text-align: right;
  margin: -4px 16px 14px 0;
  font-size: 0.85rem;

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FooterText = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: center;

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const LoginForm: FC = () => {
  const {
    formData,
    passwordVisible,
    fadeIn,
    fadeOut,
    isLoading,
    error,
    updateFormData,
    togglePasswordVisible,
    setFadeIn,
    login,
    handleSignUpClick,
    handleForgotPassword,
  } = useLogin()

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 10)
    return () => clearTimeout(timeout)
  }, [setFadeIn])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
  }

  return (
    <FormContainer
      title="Login"
      fadeIn={fadeIn}
      fadeOut={fadeOut}
      onSubmit={handleSubmit}
      width="420px"
      maxWidth="420px"
    >
      <FormField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData('email', e.target.value)}
        disabled={isLoading}
        width="90%"
        margin="12px 0 14px 0"
      />

      <FormField
        id="password"
        label="Password"
        value={formData.password}
        onChange={(e) => updateFormData('password', e.target.value)}
        disabled={isLoading}
        width="90%"
        margin="12px 0 6px 0"
        showPasswordToggle={true}
        passwordVisible={passwordVisible}
        onPasswordToggle={togglePasswordVisible}
      />

      <LinkRow>
        <a href="#" onClick={handleForgotPassword}>
          Forgot password?
        </a>
      </LinkRow>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormButton type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log in'}
      </FormButton>

      <FooterText>
        New to JYJAM?{' '}
        <a href="/signup" onClick={handleSignUpClick}>
          Sign up
        </a>
      </FooterText>
    </FormContainer>
  )
}

export default LoginForm

import type { FC } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { FormContainer, FormField, FormButton } from '../../../_components/Form'
import { useSignUp } from '../_hooks/useSignUp'

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`

const FooterText = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  text-align: center;

  a {
    display: block;
    margin-top: 0.25rem;
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
`

const SignUpForm: FC = () => {
  const {
    formData,
    passwordVisible,
    confirmVisible,
    fadeIn,
    fadeOut,
    isLoading,
    error,
    updateFormData,
    togglePasswordVisible,
    toggleConfirmVisible,
    setFadeIn,
    signUp,
    handleLoginClick,
  } = useSignUp()

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 10)
    return () => clearTimeout(timeout)
  }, [setFadeIn])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signUp()
  }

  return (
    <FormContainer
      title="Sign Up"
      fadeIn={fadeIn}
      fadeOut={fadeOut}
      onSubmit={handleSubmit}
    >
      <FieldsGrid>
        <FormField
          id="username"
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => updateFormData('username', e.target.value)}
          disabled={isLoading}
        />

        <FormField
          id="password"
          label="Password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          disabled={isLoading}
          showPasswordToggle={true}
          passwordVisible={passwordVisible}
          onPasswordToggle={togglePasswordVisible}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          disabled={isLoading}
        />

        <FormField
          id="confirm-password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
          disabled={isLoading}
          showPasswordToggle={true}
          passwordVisible={confirmVisible}
          onPasswordToggle={toggleConfirmVisible}
        />
      </FieldsGrid>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormButton type="submit" disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </FormButton>

      <FooterText>
        Already have an account?
        <a href="/login" onClick={handleLoginClick}>
          Sign in now
        </a>
      </FooterText>
    </FormContainer>
  )
}

export default SignUpForm

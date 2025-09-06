import type { FC, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'
import FullScreenLayout from '../../_components/FullScreenLayout'
import MainLayout from '../../_components/MainLayout'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: #e3f5fb;
  font-family: 'Instrument Sans', sans-serif;
  padding: 2rem 0;
`

const StyledButton = styled(Button)`
  padding: 0.75rem 2rem;
  background: #87dbfd !important;
  color: #3c3939;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 400;
  margin-top: 1.5rem;
  width: auto;

  &:hover {
    background: #54b1d6ff;
  }
`

const Box = styled.div`
  width: 420px;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`

const BoxAnimated = styled(Box)<{ fadeOut: boolean; fadeIn: boolean }>`
  opacity: ${({ fadeIn, fadeOut }) => (fadeOut ? 0 : fadeIn ? 1 : 0)};
  transition: opacity 0.5s ease;
`

const Heading = styled.h1`
  margin-bottom: 20px;
  color: #3c3939;
`

const Label = styled.label`
  display: block;
  text-align: left;
  margin: 12px 0 6px 25px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

const InputWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0 25px 14px;
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 14px;
  border: 1px solid #cfeaf7;
  border-radius: 6px;
  background: #d4f5ff;

  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`

const ToggleButton = styled.button<{ active: boolean }>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#fff' : '#87dbfd')};
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }
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

const FooterLink = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('email:', email)
    console.log('password:', password)
  }

  const handleSignupClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setFadeOut(true)
    setTimeout(() => navigate('/signup'), 500)
  }

  return (
    <FullScreenLayout>
      <MainLayout>
        <Wrapper>
          <BoxAnimated fadeOut={fadeOut} fadeIn={fadeIn}>
            <Heading>Login</Heading>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </InputWrapper>

              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <Input
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <ToggleButton
                  active={passwordVisible}
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </InputWrapper>

              <LinkRow>
                <a href="#">Forgot password?</a>
              </LinkRow>

              <StyledButton
                onClick={() => document.querySelector('form')?.requestSubmit()}
              >
                Log in
              </StyledButton>
            </form>

            <FooterLink>
              New to JYJAM?{' '}
              <a href="/signup" onClick={handleSignupClick}>
                Sign up
              </a>
            </FooterLink>
          </BoxAnimated>
        </Wrapper>
      </MainLayout>
    </FullScreenLayout>
  )
}

export default Login

import type { FC, ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'
import Logo from '../../_components/Logo'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e3f5fb;
`

const Box = styled.div`
  width: 420px;
  background: #fff;
  padding: 60px 24px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`

const LogoWrapper = styled(Logo)`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
`

const Heading = styled.h1`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  text-align: left;
  margin: 12px 0 6px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  display: block;
  width: 90%;
  margin: 0 auto 14px;
  padding: 14px;
  border: 1px solid #cfeaf7;
  border-radius: 6px;
  background: #d4f5ff;

  &:focus {
    outline: none;
    border-color: #0077cc;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('email:', email)
    console.log('password:', password)
  }

  return (
    <Wrapper>
      <Box>
        <LogoWrapper />
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <LinkRow>
            <a href="#">Forgot password?</a>
          </LinkRow>

          <Button type="submit">Log in</Button>
        </form>

        <FooterLink>
          New to JYJAM? <a href="#">Sign up</a>
        </FooterLink>
      </Box>
    </Wrapper>
  )
}

export default Login

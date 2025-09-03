import type { FC } from 'react'
import styled from 'styled-components'
import LogoComponent from '../../_components/Logo'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e3f5fb;
  font-family: 'Instrument Sans', sans-serif;
  overflow: hidden;
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

const LogoWrapper = styled(LogoComponent)`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: auto;
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #3c3939;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-size: 0.95rem;
  color: #3c3939;
  font-weight: 400;
  text-align: left;
  margin-left: 8px;
`

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cfeaf7;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background-color: #d4f5ff;
  color: #3c3939;

  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #87dbfd;
  color: #3c3939;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    background: #6ec7eb;
  }
`

const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #3c3939;
  text-align: center;
  line-height: 1.6;

  a {
    display: block;
    margin-top: 0.25rem;
    color: #395d9f;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: #3c3939;
    }
  }
`

const Header: FC = () => {
  return (
    <Wrapper>
      <Box>
        <LogoWrapper />
        <FormTitle>Sign Up</FormTitle>

        <Grid>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter username" />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </Field>
          <Field>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
            />
          </Field>
        </Grid>

        <Button>Sign Up</Button>

        <FooterText>
          Already have an account?
          <a href="/login">Log in here</a>
        </FooterText>
      </Box>
    </Wrapper>
  )
}

export default Header

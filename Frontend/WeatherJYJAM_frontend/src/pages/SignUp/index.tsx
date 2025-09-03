import type { FC } from 'react'
import { useState } from 'react'
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
  width: 100%;
  max-width: 600px;
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

const FormTitle = styled.h1`
  margin-bottom: 20px;
  color: #3c3939;
  text-align: center;
`

const Table = styled.table`
  width: 100%;
  border-spacing: 1.5rem;
  margin-bottom: 1rem;
`

const Td = styled.td`
  vertical-align: top;
  width: 50%;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`

const Label = styled.label`
  font-size: 0.95rem;
  color: #3c3939;
  font-weight: 400;
  text-align: left;
  margin-left: 8px;
`

const InputWrapper = styled.div`
  position: relative;
  width: 75%;
`

const Input = styled.input`
  padding: 0.75rem 1rem; 
  border: 1px solid #cfeaf7;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background-color: #d4f5ff;
  color: #3c3939;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`

const ToggleButton = styled.button<{ active: boolean }>`
  position: absolute;
  right: 1px;
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

const Button = styled.button`
  padding: 0.75rem 2rem;
  background: #87dbfd;
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

const Header: FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmVisible, setConfirmVisible] = useState(false)

  return (
    <Wrapper>
      <Box>
        <LogoWrapper />
        <FormTitle>Sign Up</FormTitle>

        <Table>
          <tbody>
            <tr>
              <Td>
                <Field>
                  <Label htmlFor="username">Username</Label>
                  <InputWrapper>
                    <Input id="username" type="text" />
                  </InputWrapper>
                </Field>
              </Td>
              <Td>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <InputWrapper>
                    <Input
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                    />
                    <ToggleButton
                      active={passwordVisible}
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </InputWrapper>
                </Field>
              </Td>
            </tr>
            <tr>
              <Td>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <InputWrapper>
                    <Input id="email" type="email" />
                  </InputWrapper>
                </Field>
              </Td>
              <Td>
                <Field>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <InputWrapper>
                    <Input
                      id="confirm-password"
                      type={confirmVisible ? 'text' : 'password'}
                    />
                    <ToggleButton
                      active={confirmVisible}
                      type="button"
                      onClick={() => setConfirmVisible(!confirmVisible)}
                    />
                  </InputWrapper>
                </Field>
              </Td>
            </tr>
          </tbody>
        </Table>

        <Button>Sign Up</Button>

        <FooterText>
          Already have an account?
          <a href="/login">Sign in now</a>
        </FooterText>
      </Box>
    </Wrapper>
  )
}

export default Header

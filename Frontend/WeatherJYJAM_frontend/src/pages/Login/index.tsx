import type { FC } from 'react'
import styled from 'styled-components'
import Button from '../../_components/Button'

const LoginContainer = styled.div``

const Title = styled.h1``

const Login: FC = () => (
  <LoginContainer>
    <Title>Login</Title>
    <Button>Login</Button>
  </LoginContainer>
)

export default Login

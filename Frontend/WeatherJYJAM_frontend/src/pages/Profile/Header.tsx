import type { FC } from 'react'
import styled from 'styled-components'
import LogoComponent from '../Home/_components/Header/Logo/Logo'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const Circle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #2563eb; 
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`

const Header: FC = () => (
  <HeaderContainer>
    <Left>
      <Circle />
      <Title>Hello, Username</Title>
    </Left>
    <LogoComponent />
  </HeaderContainer>
)

export default Header

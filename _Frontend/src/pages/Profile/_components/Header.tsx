import type { FC } from 'react'
import styled from 'styled-components'
import LogoComponent from '../../Home/_components/Header/Logo/Logo'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 2rem;
  background-color: #c2e9ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Circle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #256392ff;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Instrument Sans', sans-serif;
`

interface HeaderProps {
  onLeave?: (path: string) => void
}

const Header: FC<HeaderProps> = ({ onLeave }) => {
  return (
    <HeaderContainer>
      <ProfileBox>
        <UserContainer>
          <Circle />
          <Title>Hello, Username</Title>
        </UserContainer>
      </ProfileBox>

      <LogoComponent onLeave={onLeave} />
    </HeaderContainer>
  )
}

export default Header

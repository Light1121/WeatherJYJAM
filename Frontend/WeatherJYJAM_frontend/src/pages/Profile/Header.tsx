import type { FC } from 'react'
import styled from 'styled-components'
import LogoComponent from '../Home/_components/Header/Logo/Logo'

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
  padding: 0.75rem 1rem;
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

const EmailText = styled.span`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #333;
  font-family: 'Instrument Sans', sans-serif;
`

const Header: FC = () => (
  <HeaderContainer>
    <ProfileBox>
      <UserContainer>
        <Circle />
        <Title>Hello, Username</Title>
      </UserContainer>
      <EmailText>Email | username@gmail.com</EmailText>
    </ProfileBox>
    <LogoComponent />
  </HeaderContainer>
)

export default Header

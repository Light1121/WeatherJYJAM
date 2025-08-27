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
  background-color: #c5f1f3ff; 
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
`

const EmailText = styled.span`
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #333;
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

import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from '../../../ContextHooks/hooks'

const MenuItemContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const MenuItemText = styled(Link)<{ $isActive: boolean }>`
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  background-color: ${({ $isActive }) =>
    $isActive ? '#def8ffff' : 'transparent'};
  &:hover {
    background-color: #def8ffff;
    transform: scale(1.02);
    &:active {
      transform: scale(0.98);
    }
  }
`

const MenuButton = styled.button<{ $isActive?: boolean }>`
  display: block;
  width: 100%;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive }) =>
    $isActive ? '#def8ffff' : 'transparent'};
  text-align: left;
  &:hover {
    background-color: #def8ffff;
    transform: scale(1.02);
    &:active {
      transform: scale(0.98);
    }
  }
`

interface LoginMenuProps {
  onItemClick: () => void
}

const LoginMenu: FC<LoginMenuProps> = ({ onItemClick }) => {
  const location = useLocation()
  const { isLoggedIn, logout } = useAuthContext()

  const handleLogout = () => {
    logout()
    onItemClick()
  }

  if (isLoggedIn) {
    return (
      <>
        <MenuItemContainer>
          <MenuItemText
            to="/profile"
            onClick={onItemClick}
            $isActive={location.pathname === '/profile'}
          >
            Profile
          </MenuItemText>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuButton onClick={handleLogout}>Logout</MenuButton>
        </MenuItemContainer>
      </>
    )
  }

  return (
    <>
      <MenuItemContainer>
        <MenuItemText
          to="/login"
          onClick={onItemClick}
          $isActive={location.pathname === '/login'}
        >
          Login
        </MenuItemText>
      </MenuItemContainer>
      <MenuItemContainer>
        <MenuItemText
          to="/signup"
          onClick={onItemClick}
          $isActive={location.pathname === '/signup'}
        >
          Register
        </MenuItemText>
      </MenuItemContainer>
    </>
  )
}

export default LoginMenu

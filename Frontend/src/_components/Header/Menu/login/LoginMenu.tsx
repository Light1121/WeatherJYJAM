import type { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../../../hooks/useAuth'

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

const MenuItemButton = styled.button<{ $isActive?: boolean }>`
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
  font-size: inherit;

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
  const navigate = useNavigate()
  const { user, signOut, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      onItemClick() // Close the menu
      navigate('/') // Redirect to home
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <MenuItemContainer>
        <div style={{ padding: '16px 12px', textAlign: 'center' }}>
          Loading...
        </div>
      </MenuItemContainer>
    )
  }

  if (user) {
    // User is logged in - show profile and logout
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
          <MenuItemButton onClick={handleLogout}>Logout</MenuItemButton>
        </MenuItemContainer>
      </>
    )
  }

  // User is not logged in - show login and signup
  const authItems = [
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
  ]

  return (
    <>
      {authItems.map((item) => (
        <MenuItemContainer key={item.to}>
          <MenuItemText
            to={item.to}
            onClick={onItemClick}
            $isActive={location.pathname === item.to}
          >
            {item.label}
          </MenuItemText>
        </MenuItemContainer>
      ))}
    </>
  )
}

export default LoginMenu

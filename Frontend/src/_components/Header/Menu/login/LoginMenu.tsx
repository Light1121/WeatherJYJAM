import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

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

interface LoginMenuProps {
  onItemClick: () => void
}

const LoginMenu: FC<LoginMenuProps> = ({ onItemClick }) => {
  const location = useLocation()
  const loginItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
  ]

  return (
    <>
      {loginItems.map((item) => (
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

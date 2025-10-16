import type { FC } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuthContext } from '../../../ContextHooks/hooks'
import { ConfirmModal } from '../../../Sidebar/ConfirmModal'
import defaultUserImg from '../../../../_assets/defualtuser.jpg'

const MenuItemContainer = styled.div<{ $flex?: boolean }>`
  background-color: white;
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  ${({ $flex }) => $flex && 'flex: 1;'}
`

const ProfileButton = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 20px 12px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: ${({ $isActive }) =>
    $isActive ? '#def8ffff' : 'transparent'};
  transition: all 0.2s ease;
  width: 100%;
  height: 100%;
  min-height: 80px;

  &:hover {
    background-color: #def8ffff;
    border-color: #b3e0ff;
    transform: scale(1.02);

    &:active {
      transform: scale(0.98);
    }
  }
`

const MenuItemText = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: ${({ $isActive }) =>
    $isActive ? '#def8ffff' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background-color: #def8ffff;
    border-color: #b3e0ff;
    transform: scale(1.02);

    &:active {
      transform: scale(0.98);
    }
  }
`

const ProfileImagePlaceholder = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  display: flex; /* Show the image now */
`

const MenuButton = styled.button<{ $isActive?: boolean; $isLogout?: boolean }>`
  display: block;
  width: 100%;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: ${({ $isLogout }) => ($isLogout ? 'white' : '#333')};
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive, $isLogout }) =>
    $isLogout ? '#ef4444' : $isActive ? '#def8ffff' : 'transparent'};
  text-align: left;
  &:hover {
    background-color: ${({ $isLogout }) =>
      $isLogout ? '#dc2626' : '#def8ffff'};
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
  const { isLoggedIn, logout, user } = useAuthContext()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleConfirmLogout = () => {
    logout()
    setShowLogoutModal(false)
    onItemClick()
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  if (isLoggedIn) {
    return (
      <>
        <MenuItemContainer $flex={true}>
          <ProfileButton
            to="/profile"
            onClick={onItemClick}
            $isActive={location.pathname === '/profile'}
          >
            <ProfileImagePlaceholder src={defaultUserImg} alt="User Avatar" />
            <span>{user?.name ? `${user.name}'s profile` : 'Profile'}</span>
          </ProfileButton>
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuButton onClick={handleLogoutClick} $isLogout={true}>
            Logout
          </MenuButton>
        </MenuItemContainer>

        <ConfirmModal
          isOpen={showLogoutModal}
          message="Are you sure you want to logout?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          confirmText="Logout"
          cancelText="Cancel"
        />
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

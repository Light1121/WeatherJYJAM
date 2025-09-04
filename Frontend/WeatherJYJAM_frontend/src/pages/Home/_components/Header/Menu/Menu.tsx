import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MenuButton = styled.div`
  cursor: pointer;
  padding: 16px;
  background-color: #def8ffff;
  border-radius: 25px;
  user-select: none;
  position: fixed;
  top: 20px; // distance from top of the screen
  right: 20px; // distance from right edge
  z-index: 10000;
`

const SideMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: white;
  border-left: 1px solid #eee;
  z-index: 9999;
  padding: 20px;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
`

const MenuItemContainer = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#def8ff' : 'transparent')};
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  cursor: pointer;

  &:hover {
    background-color: #def8ffff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`

const MenuItemText = styled(Link)`
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  padding: 16px 12px;
  text-decoration: none;
  color: #333;
`

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
    { to: '/login', label: 'Login' },
  ]

  return (
    <>
      <MenuButton onClick={toggleMenu}>☰ Menu</MenuButton>

      <SideMenu isOpen={isOpen}>
        {menuItems.map((item) => (
          <MenuItemContainer
            key={item.to}
            active={activeItem === item.to}
            onClick={() => setActiveItem(item.to)}
          >
            <MenuItemText to={item.to} onClick={closeMenu}>
              {item.label}
            </MenuItemText>
          </MenuItemContainer>
        ))}
      </SideMenu>
    </>
  )
}

export default Menu

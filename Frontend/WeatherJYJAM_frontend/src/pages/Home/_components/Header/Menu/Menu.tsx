import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MenuButton = styled.div`
  cursor: pointer;
  padding: 4px;
`

const SideMenu = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  height: calc(100vh - 80px);
  width: 280px;
  background: white;
  border-left: 1px solid #eee;
  z-index: 1001;
  padding: 20px;
  transform: translateX(100%);
  transition: transform 0.3s ease;

  &.open {
    transform: translateX(0);
  }
`

const MenuItem = styled(Link)`
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  padding: 16px 12px;
  text-decoration: none;
`

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <MenuButton onClick={toggleMenu}>☰ Menu</MenuButton>

      {isOpen && (
        <SideMenu className="open">
          <MenuItem to="/profile" onClick={closeMenu}>
            Profile
          </MenuItem>
          <MenuItem to="/settings" onClick={closeMenu}>
            Settings
          </MenuItem>
          <MenuItem to="/login" onClick={closeMenu}>
            Login
          </MenuItem>
          {/* <MenuItem to="/signup" onClick={closeMenu}>
            Sign Up
          </MenuItem> */}
        </SideMenu>
      )}
    </>
  )
}

export default Menu

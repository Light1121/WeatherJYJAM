import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LocSearchBar from './LocSearchBar'
import getLocOneContext from '@/_components/ContextHooks/LocOneContext'
import getLocTwoContext from '@/_components/ContextHooks/LocTwoContext'

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
const SubMenu = styled.div`
  position: fixed;
  top: 160px;
  right: 280px;
  height: calc(40vh - 80px);
  width: 280px;
  background: #f9f9f9;
  border-left: 1px solid #ddd;
  z-index: 1002;
  padding: 20px;
  transform: translateX(100%);
  transition: transform 0.3s ease;

  &.open {
    transform: translateX(0);
  }
`

const MenuItem = styled(Link)`
  display: block;
  padding: 16px 12px;
  text-decoration: none;
`
const ButtonItem = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  color: #333;
  background: #c2e9ff;
  border: none;
  text-align: middle;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;
`

interface ToggleButtonProps {
  $active: boolean
}
const ToggleButton = styled.button<ToggleButtonProps>`
  background-color: ${({ $active }) => ($active ? 'green' : 'gray')};
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 12px;
  &:hover {
    background-color: ${({ $active }) => ($active ? '#45a049' : '#aaa')};
  }
`
const LocTitle = styled.h4`
  border: none;
  text-align: middle;
  margin: 4px 0;
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
`
const Menu: FC = () => {
  const { isLocOne, LocOnetoggle } = getLocOneContext(false)
  const { isLocTwo, LocTwotoggle } = getLocTwoContext(false)

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const [isLoc1Open, setIsLoc1Open] = useState(false)
  const toggleLoc1 = () => setIsLoc1Open(!isLoc1Open)
  const closeLoc1 = () => setIsLoc1Open(false)

  const [isLoc2Open, setIsLoc2Open] = useState(false)
  const toggleLoc2 = () => setIsLoc2Open(!isLoc2Open)
  const closeLoc2 = () => setIsLoc2Open(false)

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
          <LocTitle>Set locations to compare</LocTitle>
          <ButtonItem
            onClick={() => {
              toggleLoc1()
              closeLoc2()
            }}
          >
            Set Location 1
          </ButtonItem>
          <ButtonItem
            onClick={() => {
              toggleLoc2()
              closeLoc1()
            }}
          >
            Set Location 2
          </ButtonItem>
          <MenuItem to="/login" onClick={closeMenu}>
            Login
          </MenuItem>
          <MenuItem to="/signup" onClick={closeMenu}>
            Sign Up
          </MenuItem>
        </SideMenu>
      )}

      {isLoc1Open && (
        <SubMenu className="open">
          <LocSearchBar />

          <ToggleButton $active={isLocOne} onClick={() => LocOnetoggle()}>
            {isLocOne ? 'Active' : 'Inactive'}
          </ToggleButton>
          <ButtonItem onClick={() => closeLoc1()}>Close</ButtonItem>
        </SubMenu>
      )}

      {isLoc2Open && (
        <SubMenu className="open">
          <LocSearchBar />

          <ToggleButton $active={isLocTwo} onClick={() => LocTwotoggle()}>
            {isLocTwo ? 'Active' : 'Inactive'}
          </ToggleButton>
          <ButtonItem onClick={() => closeLoc2()}>Close</ButtonItem>
        </SubMenu>
      )}
    </>
  )
}

export default Menu

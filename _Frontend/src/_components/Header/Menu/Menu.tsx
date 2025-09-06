import { useState, useRef, useEffect, type FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LocSearchBar from './LocSearchBar'
import useLocOneContext from '@/_components/ContextHooks/useLocOneContext'
import useLocTwoContext from '@/_components/ContextHooks/useLocTwoContext'

const MenuButton = styled.div`
  cursor: pointer;
  padding: 16px;
  background-color: #def8ffff;
  border-radius: 25px;
  user-select: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 900;
`

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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
const SubMenu = styled.div`
  position: fixed;
  top: 160px;
  right: 280px;
  height: calc(40vh - 80px);
  width: 280px;
  background: #f9f9f9;
  border-left: 1px solid #ddd;
  z-index:1;
  padding: 20px;
  transition: transform 0.1s ease;
  &.open {
    transform: translateX(0);
    transform: opacity: 1;
  }
  &.closed {
    transform: translateX(100%);
    opacity: 0;
  }
`

const MenuItemContainer = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#def8ff' : 'transparent')};
  border-radius: 10px;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
`

const MenuItemText = styled(Link)`
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  border-radius: 10px;
  padding: 16px 12px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #def8ffff;
    transform: scale(1.02);
    &:active {
      transform: scale(0.98);
    }
  }
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
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => {
    setIsOpen(false)
    setIsLoc1Open(false)
    setIsLoc2Open(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const menuItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/login', label: 'Login' },
    { to: '', label: 'Set Location 1' },
    { to: '', label: 'Set Location 2' },
    { to: '/settings', label: 'Settings' },
  ]

  const { isLocOne, setIsLocOne } = useLocOneContext()
  const { isLocTwo, setIsLocTwo } = useLocTwoContext()

  const [isLoc1Open, setIsLoc1Open] = useState(false)
  const toggleLoc1 = () => setIsLoc1Open(!isLoc1Open)
  const closeLoc1 = () => setIsLoc1Open(false)

  const [isLoc2Open, setIsLoc2Open] = useState(false)
  const toggleLoc2 = () => setIsLoc2Open(!isLoc2Open)
  const closeLoc2 = () => setIsLoc2Open(false)

  return (
    <>
      <MenuButton onClick={toggleMenu}>☰ Menu</MenuButton>

      <MenuOverlay isOpen={isOpen} onClick={closeMenu} />

      <SideMenu isOpen={isOpen} ref={menuRef}>
        {menuItems.map((item) => (
          <MenuItemContainer
            key={item.to}
            active={activeItem === item.to}
            onClick={() => setActiveItem(item.to)}
          >
            {item.label === 'Set Location 1' ? (
              <>
                <MenuItemText
                  to=""
                  onClick={() => {
                    toggleLoc1()
                    closeLoc2()
                  }}
                >
                  {item.label}
                </MenuItemText>
                {isLoc1Open && (
                  <SubMenu className={isLoc1Open ? 'open' : 'closed'}>
                    <LocTitle>Set Location 1</LocTitle>
                    <ToggleButton
                      $active={isLocOne}
                      onClick={() => setIsLocOne(!isLocOne)}
                    >
                      {isLocOne ? 'Disable Location 1' : 'Enable Location 1'}
                    </ToggleButton>
                    <LocSearchBar />
                  </SubMenu>
                )}
              </>
            ) : item.label === 'Set Location 2' ? (
              <>
                <MenuItemText
                  to=""
                  onClick={() => {
                    toggleLoc2()
                    closeLoc1()
                  }}
                >
                  {item.label}
                </MenuItemText>
                {isLoc2Open && (
                  <SubMenu className={isLoc2Open ? 'open' : 'closed'}>
                    <LocTitle>Set Location 2</LocTitle>
                    <ToggleButton
                      $active={isLocTwo}
                      onClick={() => setIsLocTwo(!isLocTwo)}
                    >
                      {isLocOne ? 'Disable Location 2' : 'Enable Location 2'}
                    </ToggleButton>
                    <LocSearchBar />
                  </SubMenu>
                )}
              </>
            ) : (
              <MenuItemText to={item.to} onClick={closeMenu}>
                {item.label}
              </MenuItemText>
            )}
          </MenuItemContainer>
        ))}
      </SideMenu>
    </>
  )
}

export default Menu

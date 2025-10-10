import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useMenu } from './_hooks'
import { LoginMenu } from './login'
import { CompareMenu } from './compare'

const ButtonContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 900;
  display: flex;
  align-items: center;
  gap: 12px;
`

const UnifiedButton = styled.div<{ isOpen: boolean; isHome?: boolean }>`
  cursor: pointer;
  padding: 15px 20px;
  background-color: #def8ffff;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  font-weight: bold;
  display: ${({ isHome, isOpen }) =>
    isHome ? (isOpen ? 'flex' : 'none') : 'flex'};
  align-items: center;
  justify-content: center;
  min-height: 52px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #b8e6ff;
    transform: scale(1.05);
  }
`

const SideMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 100px;
  right: 0;
  height: calc(100vh - 100px);
  width: 280px;
  background: transparent;
  border-left: 1px solid transparent;
  z-index: 9999;
  padding: 20px;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
`

const MenuSection = styled.div<{ flex?: number }>`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  overflow: hidden;
  ${({ flex }) => flex && `flex: ${flex};`}
`

const LoginSection = styled(MenuSection)`
  flex: 0 0 30%;
`

const CompareSection = styled(MenuSection)`
  flex: 1;
`

const Menu: FC = () => {
  const {
    isOpen,
    toggleMenu,
    closeMenu,
    isLoc1Open,
    isLoc2Open,
    toggleLoc1,
    toggleLoc2,
    closeLoc1,
    closeLoc2,
  } = useMenu()

  return (
    <>
      <ButtonContainer>
        <UnifiedButton
          isOpen={isOpen}
          isHome={true}
          onClick={closeMenu}
          as={Link}
          to="/"
        >
          🏠
        </UnifiedButton>
        <UnifiedButton isOpen={isOpen} isHome={false} onClick={toggleMenu}>
          {isOpen ? '✕' : '☰ Menu'}
        </UnifiedButton>
      </ButtonContainer>

      <SideMenu isOpen={isOpen}>
        <LoginSection>
          <LoginMenu onItemClick={closeMenu} />
        </LoginSection>

        <CompareSection>
          <CompareMenu
            isLoc1Open={isLoc1Open}
            isLoc2Open={isLoc2Open}
            toggleLoc1={toggleLoc1}
            toggleLoc2={toggleLoc2}
            closeLoc1={closeLoc1}
            closeLoc2={closeLoc2}
          />
        </CompareSection>
      </SideMenu>
    </>
  )
}

export default Menu

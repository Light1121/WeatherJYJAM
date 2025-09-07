import type { FC } from 'react'
//import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LocSearchBar from '../LocSearchBar'
import useLocOneContext from '@/_components/ContextHooks/useLocOneContext'
import useLocTwoContext from '@/_components/ContextHooks/useLocTwoContext'

const AccordionItem = styled.div<{ isExpanded?: boolean }>`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  ${({ isExpanded }) =>
    isExpanded &&
    `
    flex: 1;
    background-color: #f8f9fa;
  `}
`

const AccordionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Instrument Sans', sans-serif;
  padding: 16px 12px;
  border: none;
  background: transparent;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  &:hover {
    background-color: #def8ffff;
  }
`

const AccordionIcon = styled.span<{ isOpen?: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
  font-size: 12px;
`

const AccordionContent = styled.div<{ isOpen?: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${({ isOpen }) => (isOpen ? '16px' : '0 16px')};
  background: rgba(255, 255, 255, 0.8);
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

interface CompareMenuProps {
  isLoc1Open: boolean
  isLoc2Open: boolean
  toggleLoc1: () => void
  toggleLoc2: () => void
  closeLoc1: () => void
  closeLoc2: () => void
}

const CompareMenu: FC<CompareMenuProps> = ({
  isLoc1Open,
  isLoc2Open,
  toggleLoc1,
  toggleLoc2,
  closeLoc1,
  closeLoc2,
}) => {
  const { isLocOne, setIsLocOne } = useLocOneContext()
  const { isLocTwo, setIsLocTwo } = useLocTwoContext()

  return (
    <>
      <AccordionItem isExpanded={isLoc1Open}>
        <AccordionButton
          onClick={() => {
            toggleLoc1()
            closeLoc2()
          }}
        >
          Set Location 1<AccordionIcon isOpen={isLoc1Open}>▼</AccordionIcon>
        </AccordionButton>
        <AccordionContent isOpen={isLoc1Open}>
          <LocTitle>Set Location 1</LocTitle>
          <ToggleButton
            $active={isLocOne}
            onClick={() => setIsLocOne(!isLocOne)}
          >
            {isLocOne ? 'Disable Location 1' : 'Enable Location 1'}
          </ToggleButton>
          <LocSearchBar />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem isExpanded={isLoc2Open}>
        <AccordionButton
          onClick={() => {
            toggleLoc2()
            closeLoc1()
          }}
        >
          Set Location 2<AccordionIcon isOpen={isLoc2Open}>▼</AccordionIcon>
        </AccordionButton>
        <AccordionContent isOpen={isLoc2Open}>
          <LocTitle>Set Location 2</LocTitle>
          <ToggleButton
            $active={isLocTwo}
            onClick={() => setIsLocTwo(!isLocTwo)}
          >
            {isLocTwo ? 'Disable Location 2' : 'Enable Location 2'}
          </ToggleButton>
          <LocSearchBar />
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default CompareMenu

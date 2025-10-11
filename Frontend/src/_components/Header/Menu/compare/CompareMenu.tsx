import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import LocSearchBar from '../LocSearchBar'

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

const LocTitle = styled.h4`
  border: none;
  margin: 4px 0;
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
`

const SearchResultsColumn = styled.div`
  display: flex;
  flex-direction: column;
  background: #e5f3ff;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  font-size: 0.85rem;
  margin-top: 8px;
`

const ResultItem = styled.div`
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d0eaff;
  }
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  gap: 8px;
`

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background-color: #005f99;
  }
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
  const [searchInput1, setSearchInput1] = useState('')
  const [searchInput2, setSearchInput2] = useState('')
  const [results1, setResults1] = useState<string[]>([])
  const [results2, setResults2] = useState<string[]>([])

  // Dummy search logic
  const handleSearch1 = (value: string) => {
    setSearchInput1(value)
    setResults1(value ? [`${value} 1`, `${value} 2`, `${value} 3`] : [])
  }

  const handleSearch2 = (value: string) => {
    setSearchInput2(value)
    setResults2(value ? [`${value} 1`, `${value} 2`, `${value} 3`] : [])
  }

  return (
    <>
      {/* Location 1 */}
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
          <LocSearchBar
            placeholder="Search Location 1"
            value={searchInput1}
            onChange={(e) => handleSearch1(e.target.value)}
          />
          {results1.length > 0 && (
            <SearchResultsColumn>
              {results1.map((item, idx) => (
                <ResultItem key={idx}>{item}</ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ButtonRow>
            <ActionButton onClick={() => alert(`Selected ${searchInput1}`)}>
              Select
            </ActionButton>
            <ActionButton
              onClick={() => alert(`Searching for ${searchInput1}`)}
            >
              Search
            </ActionButton>
          </ButtonRow>
        </AccordionContent>
      </AccordionItem>

      {/* Location 2 */}
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
          <LocSearchBar
            placeholder="Search Location 2"
            value={searchInput2}
            onChange={(e) => handleSearch2(e.target.value)}
          />
          {results2.length > 0 && (
            <SearchResultsColumn>
              {results2.map((item, idx) => (
                <ResultItem key={idx}>{item}</ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ButtonRow>
            <ActionButton onClick={() => alert(`Selected ${searchInput2}`)}>
              Select
            </ActionButton>
            <ActionButton
              onClick={() => alert(`Searching for ${searchInput2}`)}
            >
              Search
            </ActionButton>
          </ButtonRow>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default CompareMenu

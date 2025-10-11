import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

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
  overflow-y: auto;
  transition: max-height 0.3s ease;
  padding: ${({ isOpen }) => (isOpen ? '16px' : '0 16px')};
  background: rgba(255, 255, 255, 0.8);
`

const LocTitle = styled.h4`
  margin: 4px 0;
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
`

const LocSearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #c2e9ff;
  background: #c2e9ff;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
  &::placeholder {
    color: #333;
  }
`

const ToggleButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #005f99;
  }
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
`

const ResultItem = styled.div<{ selected?: boolean }>`
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#c2e9ff' : 'transparent')};

  &:hover {
    background-color: #d0eaff;
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

const australianStates = [
  'New South Wales',
  'Victoria',
  'Queensland',
  'South Australia',
  'Western Australia',
  'Tasmania',
  'Northern Territory',
  'Australian Capital Territory',
]

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
  const [pendingSelection1, setPendingSelection1] = useState<string | null>(
    null,
  )
  const [pendingSelection2, setPendingSelection2] = useState<string | null>(
    null,
  )
  const [selected1, setSelected1] = useState<string | null>(null)
  const [selected2, setSelected2] = useState<string | null>(null)

  const handleSearch1 = (value: string) => {
    setSearchInput1(value)
    setResults1(
      australianStates.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase()),
      ),
    )
    setPendingSelection1(null)
  }

  const handleSearch2 = (value: string) => {
    setSearchInput2(value)
    setResults2(
      australianStates.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase()),
      ),
    )
    setPendingSelection2(null)
  }

  const handleClickResult1 = (loc: string) => setPendingSelection1(loc)
  const handleClickResult2 = (loc: string) => setPendingSelection2(loc)

  const toggleSelection1 = () => {
    if (pendingSelection1) {
      setSelected1(pendingSelection1)
      setSearchInput1(pendingSelection1)
      setResults1([])
      setPendingSelection1(null)
    } else {
      setSelected1(null)
      setSearchInput1('')
    }
  }

  const toggleSelection2 = () => {
    if (pendingSelection2) {
      setSelected2(pendingSelection2)
      setSearchInput2(pendingSelection2)
      setResults2([])
      setPendingSelection2(null)
    } else {
      setSelected2(null)
      setSearchInput2('')
    }
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
          <LocSearchInput
            placeholder="Search Location 1"
            value={searchInput1}
            onChange={(e) => handleSearch1(e.target.value)}
          />
          {results1.length > 0 && (
            <SearchResultsColumn>
              {results1.map((item, idx) => (
                <ResultItem
                  key={idx}
                  onClick={() => handleClickResult1(item)}
                  selected={pendingSelection1 === item}
                >
                  {item}
                </ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ToggleButton
            disabled={!pendingSelection1 && !selected1}
            onClick={toggleSelection1}
          >
            {selected1 ? 'Deselect' : 'Select'}
          </ToggleButton>
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
          <LocSearchInput
            placeholder="Search Location 2"
            value={searchInput2}
            onChange={(e) => handleSearch2(e.target.value)}
          />
          {results2.length > 0 && (
            <SearchResultsColumn>
              {results2.map((item, idx) => (
                <ResultItem
                  key={idx}
                  onClick={() => handleClickResult2(item)}
                  selected={pendingSelection2 === item}
                >
                  {item}
                </ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ToggleButton
            disabled={!pendingSelection2 && !selected2}
            onClick={toggleSelection2}
          >
            {selected2 ? 'Deselect' : 'Select'}
          </ToggleButton>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default CompareMenu

import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { usePinContext } from '@/_components/ContextHooks/usePinContext'
import { LatLng } from 'leaflet'

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

// Dummy coordinates for Australian states
const stateCoordinates: Record<string, LatLng> = {
  'New South Wales': new LatLng(-33.8688, 151.2093),
  Victoria: new LatLng(-37.8136, 144.9631),
  Queensland: new LatLng(-27.4698, 153.0251),
  'South Australia': new LatLng(-34.9285, 138.6007),
  'Western Australia': new LatLng(-31.9505, 115.8605),
  Tasmania: new LatLng(-42.8821, 147.3272),
  'Northern Territory': new LatLng(-12.4634, 130.8456),
  'Australian Capital Territory': new LatLng(-35.2809, 149.13),
}

const australianStates = Object.keys(stateCoordinates)

const CompareMenu: FC<CompareMenuProps> = ({
  isLoc1Open,
  isLoc2Open,
  toggleLoc1,
  toggleLoc2,
  closeLoc1,
  closeLoc2,
}) => {
  const { locationOnePin, locationTwoPin, addPin, removePin } = usePinContext()

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
  const [locked1, setLocked1] = useState(false)
  const [locked2, setLocked2] = useState(false)

  useEffect(() => {
    if (locationOnePin) {
      setSearchInput1(locationOnePin.locationName)
      setLocked1(true)
      setPendingSelection1(null)
      setResults1([])
    } else {
      setSearchInput1('')
      setLocked1(false)
    }
  }, [locationOnePin])

  useEffect(() => {
    if (locationTwoPin) {
      setSearchInput2(locationTwoPin.locationName)
      setLocked2(true)
      setPendingSelection2(null)
      setResults2([])
    } else {
      setSearchInput2('')
      setLocked2(false)
    }
  }, [locationTwoPin])

  const handleSearch = (
    value: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setResults: React.Dispatch<React.SetStateAction<string[]>>,
    locked: boolean,
    setPending: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    if (locked) return
    setInput(value)
    setResults(
      australianStates.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase()),
      ),
    )
    setPending(null)
  }

  const handleClickResult = (
    loc: string,
    setPending: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    setPending(loc)
  }

  const toggleSelection = async (
    pendingSelection: string | null,
    locked: boolean,
    setLocked: React.Dispatch<React.SetStateAction<boolean>>,
    locationPin: typeof locationOnePin | typeof locationTwoPin,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setResults: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (!locked && pendingSelection) {
      const coords = stateCoordinates[pendingSelection]
      if (!coords) return
      await addPin(coords)
    } else if (locked && locationPin) {
      removePin(locationPin.id)
      setInput('')
    }
    setLocked(!locked)
    setResults([])
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
            onChange={(e) =>
              handleSearch(
                e.target.value,
                setSearchInput1,
                setResults1,
                locked1,
                setPendingSelection1,
              )
            }
            disabled={locked1}
          />
          {results1.length > 0 && (
            <SearchResultsColumn>
              {results1.map((item, idx) => (
                <ResultItem
                  key={idx}
                  onClick={() => handleClickResult(item, setPendingSelection1)}
                  selected={pendingSelection1 === item}
                >
                  {item}
                </ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ToggleButton
            disabled={!pendingSelection1 && !locked1}
            onClick={() =>
              toggleSelection(
                pendingSelection1,
                locked1,
                setLocked1,
                locationOnePin,
                setSearchInput1,
                setResults1,
              )
            }
          >
            {locked1 ? 'Deselect' : 'Select'}
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
            onChange={(e) =>
              handleSearch(
                e.target.value,
                setSearchInput2,
                setResults2,
                locked2,
                setPendingSelection2,
              )
            }
            disabled={locked2}
          />
          {results2.length > 0 && (
            <SearchResultsColumn>
              {results2.map((item, idx) => (
                <ResultItem
                  key={idx}
                  onClick={() => handleClickResult(item, setPendingSelection2)}
                  selected={pendingSelection2 === item}
                >
                  {item}
                </ResultItem>
              ))}
            </SearchResultsColumn>
          )}
          <ToggleButton
            disabled={!pendingSelection2 && !locked2}
            onClick={() =>
              toggleSelection(
                pendingSelection2,
                locked2,
                setLocked2,
                locationTwoPin,
                setSearchInput2,
                setResults2,
              )
            }
          >
            {locked2 ? 'Deselect' : 'Select'}
          </ToggleButton>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}

export default CompareMenu

import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { LatLng } from 'leaflet'
import SearchDropdown from './SearchDropdown'
import AIdropdown from './AIdropdown'
import SearchSwitch from './SearchSwitch'
import { usePinContext } from '../../ContextHooks/hooks'
import { useSearch } from './_hooks'
import type { StationResult } from '@/api'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

const ToggleSlot = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
`

const SearchInput = styled.input<{ inputWidth: number }>`
  width: ${({ inputWidth }) => inputWidth}px;
  height: 55px;
  border-radius: 20px;
  background-color: #def8ffff;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  text-align: left;
  padding-left: 20px;
  transition:
    width 0.3s ease,
    box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    box-shadow: 0 0 0 2px #e3f2fd;
  }
`

const SearchBar: FC = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [mode, setMode] = useState<'search' | 'ai'>('search')
  const [aiState, setAiState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [loadingDots, setLoadingDots] = useState(1)
  const [inputWidth, setInputWidth] = useState(550)
  const [showDropdown, setShowDropdown] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const { addPin } = usePinContext()

  const {
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useSearch(query)

  //Update width dynamically based on focus
  useEffect(() => {
    setInputWidth(focused ? 750 : 550)
    if (focused && mode === 'search') setShowDropdown(true)
    else setShowDropdown(false)
  }, [focused, mode])

  //AI loading animation (dots only, stream will update state)
  useEffect(() => {
    if (aiState === 'loading') {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev % 5) + 1)
      }, 500)

      return () => {
        clearInterval(interval)
      }
    }
  }, [aiState])

  const handleAskAI = () => {
    if (query.trim() === '') return
    setAiState('loading')
  }

  const handleClearAI = () => {
    setQuery('')
    setAiState('idle')
  }

  const handleModeChange = (nextMode: 'search' | 'ai') => {
    setMode(nextMode)
    setQuery('')
    setAiState('idle')
    setShowDropdown(false)
  }

  const handleSelect = async (result: StationResult) => {
    setQuery(result.name)
    setShowDropdown(false)
    console.log('Selected location:', result)

    if (result.lat !== null && result.lon !== null) {
      const position = new LatLng(result.lat, result.lon)
      await addPin(position)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (mode === 'search') {
        if (showDropdown && query.trim() && searchResults.length > 0) {
          handleSelect(searchResults[0])
        }
      } else if (mode === 'ai') {
        handleAskAI()
      }
    }
  }

  return (
    <Wrapper>
      <SearchInput
        ref={inputRef}
        inputWidth={inputWidth}
        type="text"
        placeholder={mode === 'search' ? 'Search Location...' : 'Ask AI...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
      />

      <ToggleSlot>
        <SearchSwitch mode={mode} onModeChange={handleModeChange} />
      </ToggleSlot>

      {/* Search Dropdown */}
      {mode === 'search' && showDropdown && query && (
        <SearchDropdown
          inputWidth={inputWidth}
          onSelect={handleSelect}
          results={searchResults}
          loading={searchLoading}
          error={searchError}
        />
      )}

      {/* AI Dropdown */}
      {mode === 'ai' && query.trim() !== '' && (
        <AIdropdown
          prompt={query}
          aiState={aiState}
          loadingDots={loadingDots}
          onAskAI={handleAskAI}
          onClear={handleClearAI}
          onStreamComplete={() => setAiState('done')}
          inputWidth={inputWidth}
        />
      )}
    </Wrapper>
  )
}

export default SearchBar

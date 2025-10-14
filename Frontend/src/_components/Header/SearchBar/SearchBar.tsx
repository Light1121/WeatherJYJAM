import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import SearchDropdown from './SearchDropdown'
import AIdropdown from './AIdropdown'
import SearchSwitch from './SearchSwitch'

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

  //Update width dynamically based on focus
  useEffect(() => {
    setInputWidth(focused ? 750 : 550)
    if (focused && mode === 'search') setShowDropdown(true)
    else setShowDropdown(false)
  }, [focused, mode])

  //AI loading animation
  useEffect(() => {
    if (aiState === 'loading') {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev % 5) + 1)
      }, 500)

      const timeout = setTimeout(() => {
        setAiState('done')
        clearInterval(interval)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
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

  const handleSelect = (loc: {
    id: number
    title: string
    subtitle: string
  }) => {
    setQuery(loc.title)
    setShowDropdown(false)
    console.log('Selected location:', loc)
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
      />

      <ToggleSlot>
        <SearchSwitch mode={mode} onModeChange={handleModeChange} />
      </ToggleSlot>

      {/* Search Dropdown */}
      {mode === 'search' && showDropdown && query && (
        <SearchDropdown
          query={query}
          inputWidth={inputWidth}
          onSelect={handleSelect}
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
          inputWidth={inputWidth}
        />
      )}
    </Wrapper>
  )
}

export default SearchBar

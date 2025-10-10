import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { SearchDropdown, AIdropdown, SearchSwitch } from './'


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

const SearchInput = styled.input`
  width: 550px;
  height: 55px;
  background-color: #def8ffff;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  color: #333;
  text-align: left;
  padding-left: 20px;
  z-index: 1000;
  transition:
    width 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    width: 750px;
    background-color: #def8ffff;
    box-shadow: 0 0 0 2px #e3f2fd;
  }
`

const SearchBar: FC = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [mode, setMode] = useState<'search' | 'ai'>('search')

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder={mode === 'search' ? 'Search Location...' : 'Ask AI...' }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <ToggleSlot>
        <SearchSwitch mode={mode} onModeChange={(next) => setMode(next)} />
      </ToggleSlot>
      {query && focused && (mode === 'search' ? <SearchDropdown /> : <AIdropdown prompt={query} />)}
    </Wrapper>
  )
}

export default SearchBar

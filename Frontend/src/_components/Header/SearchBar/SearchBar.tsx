import type { FC } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { SearchDropdown } from './'


const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: #def8ffff;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  color: #333;
  text-align: center;
  z-index: 1000;
  transition:
    width 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    width: 600px;
    background-color: #def8ffff;
    box-shadow: 0 0 0 2px #e3f2fd;
  }
`

const SearchBar: FC = () => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder="Search Location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {query && focused && <SearchDropdown />}
    </Wrapper>
  )
}

export default SearchBar

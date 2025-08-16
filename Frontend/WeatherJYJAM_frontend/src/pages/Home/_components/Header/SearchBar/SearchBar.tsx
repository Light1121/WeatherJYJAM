import type { FC } from 'react'
import styled from 'styled-components'

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  color: #333;
  text-align: center;
  transition:
    width 0.3s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    width: 600px;
    background-color: #fff;
    box-shadow: 0 0 0 2px #e3f2fd;
  }
`

const SearchBar: FC = () => {
  return <SearchInput type="text" placeholder="Search..." />
}

export default SearchBar

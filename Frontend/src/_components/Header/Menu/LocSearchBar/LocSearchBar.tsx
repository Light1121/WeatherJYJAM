import type { FC, ChangeEvent } from 'react'
import styled from 'styled-components'

interface LocSearchBarProps {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
}

const LocSearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #c2e9ff;
  background: #c2e9ff;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
  &::placeholder {
    color: #333;
  }
`

const LocSearchBar: FC<LocSearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onClick,
}) => {
  return (
    <LocSearchInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default LocSearchBar

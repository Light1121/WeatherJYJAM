import type { FC } from 'react'
import styled from 'styled-components'

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
const LocSearchBar: FC = () => {
  return <LocSearchInput type="text" placeholder="Search..." />
}
export default LocSearchBar

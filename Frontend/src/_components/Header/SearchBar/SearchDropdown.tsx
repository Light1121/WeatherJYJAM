import type { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  max-width: 600px;
  min-height: 160px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
`

const SearchDropdown: FC = () => {
  return <Container />
}

export default SearchDropdown



import type { FC } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Menu from './Menu'

const StyledHeader = styled.header`
  position: relative;
  padding: 50px 50px;
  border-bottom: 1px solid #d2f4ffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Instrument Sans', sans-serif;
  height: 80px;
`

const CenteredSearchWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
const Header: FC = () => (
  <StyledHeader>
    <Logo />
    <CenteredSearchWrapper>
      <SearchBar />
    </CenteredSearchWrapper>
    <Menu />
  </StyledHeader>
)

export default Header

import type { FC } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import SearchBar from './SearchBar'
import Menu from './Menu'

const StyledHeader = styled.header`
  padding: 0px 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

const Header: FC = () => (
  <StyledHeader>
    <Logo />
    <SearchBar />
    <Menu />
  </StyledHeader>
)

export default Header

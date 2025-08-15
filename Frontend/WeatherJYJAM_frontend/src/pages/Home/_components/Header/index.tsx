import type { FC } from 'react'
import styled from 'styled-components'
import Logo from './_components/Logo'
import SearchBar from './_components/SearchBar'
import Menu from './_components/Menu'

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

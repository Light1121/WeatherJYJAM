import type { FC } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AppIcon = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const SearchBar = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 20px;
  text-align: center;
  color: #666;
`

const MenuButton = styled.div`
  font-size: 18px;
`

const Header: FC = () =>  (
  <StyledHeader>
    <AppIcon>🏠 JYJAM</AppIcon>
    <SearchBar>🔍 Search...</SearchBar>
    <MenuButton>☰ Menu</MenuButton>
  </StyledHeader>
)

export default Header

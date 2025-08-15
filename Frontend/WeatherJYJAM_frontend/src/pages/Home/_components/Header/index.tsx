import type { FC } from 'react'
import styled from 'styled-components'
import logoImage from './_asset/WeatherJYJAM_Logo.jpg'

const StyledHeader = styled.header`
  padding: 0px 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 4px;
`

const SearchBar = styled.div`
  width: 800px;
  height: 40px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 20px;
  text-align: center;
  color: #666;
`

const MenuButton = styled.div`
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`

const Header: FC = () => (
  <StyledHeader>
    <LogoContainer>
      <LogoImage src={logoImage} alt="WeatherJYJAM Logo" />
    </LogoContainer>
    <SearchBar>🔍 Search...</SearchBar>
    <MenuButton>☰ Menu</MenuButton>
  </StyledHeader>
)

export default Header

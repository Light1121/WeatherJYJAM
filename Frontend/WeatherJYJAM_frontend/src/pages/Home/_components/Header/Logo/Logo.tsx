import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logoImage from './_asset/WeatherJYJAM_Logo.jpg'

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
`

const Logo: FC = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <LogoImage
      src={logoImage}
      alt="WeatherJYJAM Logo"
      onClick={handleLogoClick}
    />
  )
}

export default Logo

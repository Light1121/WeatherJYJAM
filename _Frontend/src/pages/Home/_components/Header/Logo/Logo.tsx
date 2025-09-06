import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logoImage from './_asset/WeatherJYJAM_Logo.png'

const LogoImage = styled.img`
  width: 180px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  cursor: pointer;
`

interface LogoProps {
  onLeave?: (path: string) => void
}

const Logo: FC<LogoProps> = ({ onLeave }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (onLeave) {
      onLeave('/') 
    } else {
      navigate('/')
    }
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

import type { ImgHTMLAttributes } from 'react'
import logoImg from './logoJYJAM.png'

const Logo = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={logoImg} alt="Logo" {...props} />
}

export default Logo

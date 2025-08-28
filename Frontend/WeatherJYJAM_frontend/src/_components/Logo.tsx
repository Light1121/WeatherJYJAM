import React, { FC, ImgHTMLAttributes } from 'react'
import logoImg from './logoJYJAM.png'

const Logo: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img src={logoImg} alt="Logo" {...props} />
}

export default Logo

import type { FC } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`

interface ButtonProps {
  children: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button

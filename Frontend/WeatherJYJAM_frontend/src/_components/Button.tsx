// src/_components/Button.tsx - 按设计优化
import type { FC } from 'react'
import styled, { css } from 'styled-components'

type Variant = 'primary' | 'tab' | 'add'

interface ButtonProps {
  children: string
  variant?: Variant
  isActive?: boolean
  onClick?: () => void
}

const StyledButton = styled.button<{ $variant: Variant; $isActive?: boolean }>`
  cursor: pointer;
  font-size: 14px;

  ${(props) =>
    props.$variant === 'primary' &&
    css`
      background-color: #6c757d;
      color: white;
      border-radius: 4px;
    `}

  ${(props) =>
    props.$variant === 'tab' &&
    css`
      background-color: ${props.$isActive ? '#cce7ff' : '#ffffff'};
      padding: 12px 16px;
      border-radius: 6px;
      text-align: middle;
    `}
  
  ${(props) =>
    props.$variant === 'add' &&
    css`
      background-color: #ffffff;
      border-radius: 50%;
      width: 32px;
      height: 32px;
    `}
`

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isActive,
  onClick,
}) => (
  <StyledButton $variant={variant} $isActive={isActive} onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button

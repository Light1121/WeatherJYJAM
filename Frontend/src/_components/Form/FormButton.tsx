import type { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Button = styled.button<{
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  width?: string
  margin?: string
}>`
  padding: 0.75rem 2rem;
  background: ${({ disabled, variant = 'primary' }) =>
    disabled ? '#ccc' : variant === 'primary' ? '#87dbfd' : '#f8f9fa'};
  color: ${({ variant = 'primary' }) =>
    variant === 'primary' ? '#3c3939' : '#6c757d'};
  font-size: 1rem;
  border: ${({ variant = 'primary' }) =>
    variant === 'primary' ? 'none' : '1px solid #dee2e6'};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 400;
  margin: ${({ margin = '1.5rem 0 0 0' }) => margin};
  width: ${({ width = 'auto' }) => width};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ disabled, variant = 'primary' }) =>
      disabled ? '#ccc' : variant === 'primary' ? '#54b1d6ff' : '#e9ecef'};
  }

  &:focus {
    outline: 2px solid #0077cc;
    outline-offset: 2px;
  }
`

interface FormButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  width?: string
  margin?: string
}

const FormButton: FC<FormButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  variant = 'primary',
  width,
  margin,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      width={width}
      margin={margin}
    >
      {children}
    </Button>
  )
}

export default FormButton

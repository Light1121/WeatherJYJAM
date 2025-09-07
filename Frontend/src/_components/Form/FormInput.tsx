import type { FC } from 'react'
import styled from 'styled-components'

const InputWrapper = styled.div<{ width?: string }>`
  position: relative;
  width: ${({ width = '90%' }) => width};
  margin: 0 auto;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #cfeaf7;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background-color: #d4f5ff;
  color: #3c3939;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #0077cc;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ToggleButton = styled.button<{ active: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#fff' : '#87dbfd')};
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

interface FormInputProps {
  id?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  width?: string
  showPasswordToggle?: boolean
  passwordVisible?: boolean
  onPasswordToggle?: () => void
}

const FormInput: FC<FormInputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  width,
  showPasswordToggle = false,
  passwordVisible = false,
  onPasswordToggle,
}) => {
  const inputType = showPasswordToggle
    ? passwordVisible
      ? 'text'
      : 'password'
    : type

  return (
    <InputWrapper width={width}>
      <Input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {showPasswordToggle && (
        <ToggleButton
          active={passwordVisible}
          type="button"
          onClick={onPasswordToggle}
          disabled={disabled}
        />
      )}
    </InputWrapper>
  )
}

export default FormInput

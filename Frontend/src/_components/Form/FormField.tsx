import type { FC } from 'react'
import styled from 'styled-components'
import FormInput from './FormInput'

const Field = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: ${({ margin = '0 0 1rem 0' }) => margin};
  position: relative;
`

const Label = styled.label`
  font-size: 0.95rem;
  color: #3c3939;
  font-weight: 400;
  text-align: left;
  margin-left: 1px;
`

interface FormFieldProps {
  id?: string
  label: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  width?: string
  margin?: string
  showPasswordToggle?: boolean
  passwordVisible?: boolean
  onPasswordToggle?: () => void
}

const FormField: FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  width,
  margin,
  showPasswordToggle = false,
  passwordVisible = false,
  onPasswordToggle,
}) => {
  return (
    <Field margin={margin}>
      <Label htmlFor={id}>{label}</Label>
      <FormInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        width={width}
        showPasswordToggle={showPasswordToggle}
        passwordVisible={passwordVisible}
        onPasswordToggle={onPasswordToggle}
      />
    </Field>
  )
}

export default FormField

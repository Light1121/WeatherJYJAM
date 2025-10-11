import styled from 'styled-components'

export const ModalButton = styled.button<{
  $variant?: 'primary' | 'secondary'
}>`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? '#a0d1ff' : '#d1d5db')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#b3e0ff' : 'white'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#1d3c66' : '#333')};

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#99ccff' : '#f3f4f6'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? '#99ccff' : '#9ca3af'};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

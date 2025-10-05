import type { FC } from 'react'
import styled from 'styled-components'

interface AddTabButtonProps {
  onClick: () => void
  isCollapsed: boolean
}

const AddButton = styled.button<{ $isCollapsed: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007acc;
    color: #007acc;
    background: rgba(0, 122, 204, 0.05);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }
`

const PlusIcon = styled.span`
  font-size: 16px;
  font-weight: bold;
`

const ButtonText = styled.span<{ $isCollapsed: boolean }>`
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? 0 : 1)};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`

const AddTabButton: FC<AddTabButtonProps> = ({ onClick, isCollapsed }) => {
  return (
    <AddButton
      $isCollapsed={isCollapsed}
      onClick={onClick}
      aria-label="Add new tab"
    >
      <PlusIcon>+</PlusIcon>
      <ButtonText $isCollapsed={isCollapsed}>New Tab</ButtonText>
    </AddButton>
  )
}

export default AddTabButton

import type { FC } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import type { TabData } from '@/_components/ContextHooks/TabsContext'

interface EditTabModalProps {
  tab: TabData
  onSave: (newName: string) => void
  onCancel: () => void
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const ModalHeader = styled.div`
  margin-bottom: 20px;
`

const ModalTitle = styled.h3`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`

const ModalDescription = styled.p`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`

const ModalBody = styled.div`
  margin-bottom: 24px;
`

const Label = styled.label`
  display: block;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  color: #1f2937;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? '#007acc' : '#d1d5db')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#007acc' : 'white'};
  color: ${({ $variant }) => ($variant === 'primary' ? 'white' : '#374151')};

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#005f99' : '#f3f4f6'};
    border-color: ${({ $variant }) =>
      $variant === 'primary' ? '#005f99' : '#9ca3af'};
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const CharCount = styled.div<{ $isOverLimit: boolean }>`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 12px;
  color: ${({ $isOverLimit }) => ($isOverLimit ? '#ef4444' : '#6b7280')};
  text-align: right;
  margin-top: 4px;
`

const MAX_NAME_LENGTH = 50

const EditTabModal: FC<EditTabModalProps> = ({ tab, onSave, onCancel }) => {
  const [name, setName] = useState(tab.name)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(name.trim().length > 0 && name.length <= MAX_NAME_LENGTH)
  }, [name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) {
      onSave(name.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  const isOverLimit = name.length > MAX_NAME_LENGTH

  return (
    <ModalOverlay onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Tab</ModalTitle>
          <ModalDescription>
            Change the name of your tab to better organize your maps.
          </ModalDescription>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Label htmlFor="tab-name">Tab Name</Label>
            <Input
              id="tab-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tab name..."
              maxLength={MAX_NAME_LENGTH + 10} // Allow typing past limit for visual feedback
              autoFocus
            />
            <CharCount $isOverLimit={isOverLimit}>
              {name.length}/{MAX_NAME_LENGTH}
            </CharCount>
          </ModalBody>

          <ModalFooter>
            <Button type="button" $variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" $variant="primary" disabled={!isValid}>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default EditTabModal

import { useState, useEffect, type FC } from 'react'
import type { TabData } from '@/_components/ContextHooks/TabsContext'
import { Modal } from './Modal'
import { ModalButton } from './ModalButton'
import styled from 'styled-components'

interface EditTabModalProps {
  tab: TabData
  onSave: (newName: string) => void
  onCancel: () => void
}

const MAX_NAME_LENGTH = 30

const ModalHeader = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1d3c66;
`

const ModalInput = styled.input<{ $isInvalid: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ $isInvalid }) => ($isInvalid ? '#f87171' : '#d1d5db')};
  font-size: 14px;
  font-family: 'Instrument Sans', sans-serif;
  margin-bottom: 4px;

  &:focus {
    outline: none;
    border-color: ${({ $isInvalid }) => ($isInvalid ? '#f87171' : '#99ccff')};
    box-shadow: 0 0 0 2px
      ${({ $isInvalid }) =>
        $isInvalid ? 'rgba(248, 113, 113, 0.3)' : 'rgba(153, 204, 255, 0.3)'};
  }
`

const CharCount = styled.div<{ $isInvalid: boolean }>`
  font-size: 12px;
  text-align: right;
  margin-bottom: 16px;
  font-family: 'Instrument Sans', sans-serif;
  color: ${({ $isInvalid }) => ($isInvalid ? '#f87171' : '#6b7280')};
`

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

export const EditTabModal: FC<EditTabModalProps> = ({
  tab,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(tab.name)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setIsValid(name.trim().length > 0 && name.length <= MAX_NAME_LENGTH)
  }, [name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) onSave(name.trim())
  }

  const isInvalid = name.length > MAX_NAME_LENGTH || name.trim().length === 0

  return (
    <Modal isOpen={true} onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>Edit Tab</ModalHeader>
        <ModalInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          $isInvalid={isInvalid}
        />
        <CharCount $isInvalid={isInvalid}>
          {name.length}/{MAX_NAME_LENGTH}
        </CharCount>
        <ModalButtons>
          <ModalButton $variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </ModalButton>
          <ModalButton $variant="primary" type="submit" disabled={!isValid}>
            Save
          </ModalButton>
        </ModalButtons>
      </form>
    </Modal>
  )
}

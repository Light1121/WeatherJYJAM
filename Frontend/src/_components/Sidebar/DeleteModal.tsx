import type { FC } from 'react'
import { Modal } from './Modal'
import styled from 'styled-components'

interface DeleteModalProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid
    ${({ $variant }) => ($variant === 'primary' ? '#a0d1ff' : '#d1d5db')};
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#b3e0ff' : 'white'};
  color: ${({ $variant }) => ($variant === 'primary' ? '#1d3c66' : '#333')};
  cursor: pointer;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 14px;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#99ccff' : '#f3f4f6'};
  }
`

const Message = styled.p`
  margin: 0;
  color: #1d3c66;
`

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Message>{message}</Message>
      <ModalButtons>
        <Button $variant="primary" onClick={onConfirm}>
          Yes
        </Button>
        <Button $variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalButtons>
    </Modal>
  )
}

export default DeleteModal

import { useState, useEffect, type FC, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  isOpen: boolean
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const bounceIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`

const bounceOut = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0; }
`

const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.2s ease
    forwards;
`

const Content = styled.div<{ $isClosing: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  min-width: 300px;
  max-width: 90vw;
  font-family: 'Instrument Sans', sans-serif;
  animation: ${({ $isClosing }) => ($isClosing ? bounceOut : bounceIn)} 0.25s
    ease forwards;
`

export const Modal: FC<ModalProps> = ({ children, onClose, isOpen }) => {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => setIsClosing(true)

  useEffect(() => {
    if (!isClosing) return
    const timer = setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 250)
    return () => clearTimeout(timer)
  }, [isClosing, onClose])

  if (!isOpen && !isClosing) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return createPortal(
    <Overlay $isClosing={isClosing} onClick={handleOverlayClick}>
      <Content $isClosing={isClosing}>{children}</Content>
    </Overlay>,
    document.body,
  )
}

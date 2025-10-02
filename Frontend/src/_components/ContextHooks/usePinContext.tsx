import { useContext } from 'react'
import PinContext from './PinContext'

export const usePinContext = () => {
  const context = useContext(PinContext)
  if (!context) {
    throw new Error('usePinContext must be used within a PinProvider')
  }
  return context
}
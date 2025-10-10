import { useContext } from 'react'
// Update the import path to the correct location of PinContext
import { PinContext } from './contexts'

export const usePinContext = () => {
  const context = useContext(PinContext)
  if (!context) {
    throw new Error('usePinContext must be used within a PinProvider')
  }
  return context
}

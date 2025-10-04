import { useContext } from 'react'
import ControlPanelContext from './ControlPanelContext'

export const useControlPanelContext = () => {
  const context = useContext(ControlPanelContext)
  if (!context) {
    throw new Error('useControlPanelContext must be used within a ControlPanelProvider')
  }
  return context
}
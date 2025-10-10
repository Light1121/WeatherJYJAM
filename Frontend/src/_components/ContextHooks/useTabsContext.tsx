import { useContext } from 'react'
import TabsContext, { type TabsContextType } from './TabsContext'

export const useTabsContext = (): TabsContextType => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider')
  }
  return context
}

export default useTabsContext

import { useState } from 'react'
import { LocTwoContext } from './LocTwoContext.1'

export const LocTwoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLocTwo, setIsLocTwo] = useState(false)
  return (
    <LocTwoContext.Provider value={{ isLocTwo, setIsLocTwo }}>
      {children}
    </LocTwoContext.Provider>
  )
}

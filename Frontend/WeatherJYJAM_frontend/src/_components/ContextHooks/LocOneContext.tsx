import { useState } from 'react'
import { LocOneContext } from './LocOneContext.1'

export const LocOneProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLocOne, setIsLocOne] = useState(false)
  return (
    <LocOneContext.Provider value={{ isLocOne, setIsLocOne }}>
      {children}
    </LocOneContext.Provider>
  )
}

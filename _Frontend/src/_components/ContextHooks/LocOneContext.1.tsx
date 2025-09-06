import { createContext } from 'react'

export const LocOneContext = createContext<{
  isLocOne: boolean
  setIsLocOne: (value: boolean) => void
}>({
  isLocOne: false,
  setIsLocOne: () => {},
})

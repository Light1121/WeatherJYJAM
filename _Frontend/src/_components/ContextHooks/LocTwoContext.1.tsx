import { createContext } from 'react'

export const LocTwoContext = createContext<{
  isLocTwo: boolean
  setIsLocTwo: (value: boolean) => void
}>({
  isLocTwo: false,
  setIsLocTwo: () => {},
})

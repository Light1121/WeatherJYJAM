import { useCallback, useState } from 'react'

export default function useLocOneContext(initialOpen = false) {
  const [isLocOne, setLocOne] = useState(initialOpen)
  const LocOnetoggle = useCallback(() => setLocOne((v) => !v), [])
  return { isLocOne, LocOnetoggle }
}

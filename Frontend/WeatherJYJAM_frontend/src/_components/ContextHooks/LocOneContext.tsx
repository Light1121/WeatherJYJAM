import { useCallback, useState } from 'react'

export default function getLocOneContext(initialOpen = false) {
  const [isLocOne, setLocOne] = useState(initialOpen)
  const LocOnetoggle = useCallback(() => setLocOne((v) => !v), [])
  return { isLocOne, LocOnetoggle }
}

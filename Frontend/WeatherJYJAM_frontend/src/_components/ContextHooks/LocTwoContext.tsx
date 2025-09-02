import { useCallback, useState } from 'react'

export default function getLocTwoContext(initialOpen = false) {
  const [isLocTwo, setLocTwo] = useState(initialOpen)

  const LocTwotoggle = useCallback(() => setLocTwo((v) => !v), [])
  return { isLocTwo, LocTwotoggle }
}

import { useState } from 'react'

export const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isLoc1Open, setIsLoc1Open] = useState(false)
  const [isLoc2Open, setIsLoc2Open] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => {
    setIsOpen(false)
    setIsLoc1Open(false)
    setIsLoc2Open(false)
  }

  const toggleLoc1 = () => setIsLoc1Open(!isLoc1Open)
  const closeLoc1 = () => setIsLoc1Open(false)

  const toggleLoc2 = () => setIsLoc2Open(!isLoc2Open)
  const closeLoc2 = () => setIsLoc2Open(false)

  return {
    isOpen,
    activeItem,
    isLoc1Open,
    isLoc2Open,
    toggleMenu,
    closeMenu,
    setActiveItem,
    toggleLoc1,
    closeLoc1,
    toggleLoc2,
    closeLoc2,
  }
}

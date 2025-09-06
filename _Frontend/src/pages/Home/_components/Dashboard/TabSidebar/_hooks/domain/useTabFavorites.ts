import { useState } from 'react'

export const useTabFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const isFavorite = (tabId: string): boolean => {
    return favorites.has(tabId)
  }

  const toggleFavorite = (tabId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(tabId)) {
        newFavorites.delete(tabId)
      } else {
        newFavorites.add(tabId)
      }
      return newFavorites
    })
  }

  return {
    isFavorite,
    toggleFavorite,
  }
}

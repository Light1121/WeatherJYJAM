/**
 * useSearch Hook
 * Handles station search logic
 */

import { useState, useEffect } from 'react'
import { searchStations, type StationResult } from '@/api'

export const useSearch = (query: string) => {
  const [results, setResults] = useState<StationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await searchStations(query)
        setResults(data.results || [])
      } catch (err) {
        console.error('Error fetching search results:', err)
        setError('Failed to fetch search results')
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSearchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  return { results, loading, error }
}

/**
 * Search API
 * Handles station search and AI search requests
 */

import { API_ENDPOINTS } from './config'

export interface StationResult {
  name: string
  station_name: string
  state: string
  lat: number | null
  lon: number | null
}

export interface SearchResult {
  query: string
  results: StationResult[]
}

export interface AISearchRequest {
  q: string
}

/**
 * Search for weather stations by name
 */
export const searchStations = async (query: string): Promise<SearchResult> => {
  const response = await fetch(
    `${API_ENDPOINTS.search}?q=${encodeURIComponent(query)}`,
  )

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`)
  }

  return response.json()
}

/**
 * Stream AI search response using Server-Sent Events (SSE)
 */
export const streamAISearch = async (
  prompt: string,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> => {
  const response = await fetch(API_ENDPOINTS.searchAI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: prompt } as AISearchRequest),
    signal,
  })

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No response body')
  }

  const decoder = new TextDecoder()
  let accumulatedText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const content = line.slice(6)

        if (content === '[DONE]') {
          return
        }

        accumulatedText += content
        onChunk(accumulatedText)
      }
    }
  }
}

/**
 * useAISearch Hook
 * Handles AI streaming search logic
 */

import { useState, useEffect, useRef } from 'react'
import { streamAISearch } from '@/api'

interface UseAISearchProps {
  prompt: string
  aiState: 'idle' | 'loading' | 'done'
  onStreamComplete?: () => void
}

export const useAISearch = ({
  prompt,
  aiState,
  onStreamComplete,
}: UseAISearchProps) => {
  const [aiResponse, setAiResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const onStreamCompleteRef = useRef(onStreamComplete)

  // Keep the callback ref up to date
  useEffect(() => {
    onStreamCompleteRef.current = onStreamComplete
  }, [onStreamComplete])

  useEffect(() => {
    if (aiState !== 'loading') return

    const fetchAIStream = async () => {
      setAiResponse('')
      setIsStreaming(true)

      try {
        abortControllerRef.current = new AbortController()

        await streamAISearch(
          prompt,
          (text) => {
            setAiResponse(text)
            setIsStreaming(true)
          },
          abortControllerRef.current.signal,
        )

        setIsStreaming(false)
        onStreamCompleteRef.current?.()
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error streaming AI response:', err)
          setAiResponse('Error: Failed to get AI response')
        }
        setIsStreaming(false)
      }
    }

    fetchAIStream()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [aiState, prompt])

  useEffect(() => {
    if (aiState === 'idle') {
      setAiResponse('')
    }
  }, [aiState])

  return { aiResponse, isStreaming }
}

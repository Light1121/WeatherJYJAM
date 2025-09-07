import { useState, useRef, useEffect } from 'react'

export const useTabEdit = (initialTitle: string) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  const startEditing = () => setEditing(true)

  const commitEdit = (): string => {
    const finalTitle = title.trim() || initialTitle
    setEditing(false)
    return finalTitle
  }

  const cancelEditing = () => {
    setTitle(initialTitle)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') inputRef.current?.blur()
    if (e.key === 'Escape') cancelEditing()
  }

  return {
    editing,
    title,
    inputRef,
    setTitle,
    startEditing,
    commitEdit,
    handleKeyDown,
  }
}

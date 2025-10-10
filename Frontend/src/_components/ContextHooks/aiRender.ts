import { createElement, type ReactNode } from 'react'

export function renderAIContent(text: string): ReactNode {
  if (!text) return null
  return createElement(
    'div',
    {
      style: {
        padding: '12px 16px',
        whiteSpace: 'pre-wrap',
        lineHeight: 1.6 as number,
      },
    },
    text,
  )
}

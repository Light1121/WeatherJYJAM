import type { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  min-width: 660px;
  max-width: 720px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  padding: 12px 0;
  max-height: 520px;
  overflow-y: auto;
  z-index: 100000;
`

export const renderAIContent = (text: string): ReactNode => {
  // For future SSE streaming, this function can progressively append tokens.
  // For now, render the full input text as a single block.
  if (!text) return null
  return (
    <div style={{ padding: '12px 16px', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
      {text}
    </div>
  )
}

type AIDropdownProps = {
  prompt: string
}

const SearchAI: FC<AIDropdownProps> = ({ prompt }) => {
  return <Container>{renderAIContent(prompt)}</Container>
}

export default SearchAI



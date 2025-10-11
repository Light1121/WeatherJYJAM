import type { FC } from 'react'
import styled from 'styled-components'
import { renderAIContent } from '@/_components/ContextHooks/aiRender'

const Container = styled.div<{ width: number }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${({ width }) => width}px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  padding: 12px 16px;
  max-height: 520px;
  overflow-y: auto;
  font-family: 'Instrument Sans', sans-serif;
  line-height: 1.6;
  white-space: pre-wrap;
  z-index: 1000;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`

const AIButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background-color: #007acc;
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #005f99;
  }
`

const TextBlock = styled.div`
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
`

interface AIDropdownProps {
  prompt: string
  aiState: 'idle' | 'loading' | 'done'
  loadingDots: number
  onAskAI: () => void
  onClear: () => void
  inputWidth: number
  aiDescription?: string
}

const AIdropdown: FC<AIDropdownProps> = ({
  prompt,
  aiState,
  loadingDots,
  onAskAI,
  onClear,
  inputWidth,
  aiDescription = 'Ask the AI to generate a response based on your input.',
}) => {
  return (
    <Container width={inputWidth} onMouseDown={(e) => e.preventDefault()}>
      {aiState === 'idle' && (
        <>
          <TextBlock>{aiDescription}</TextBlock>
          <ButtonRow>
            <AIButton onClick={onAskAI}>Ask AI</AIButton>
          </ButtonRow>
        </>
      )}
      {aiState === 'loading' && (
        <TextBlock>AI Response: Loading{'.'.repeat(loadingDots)}</TextBlock>
      )}
      {aiState === 'done' && (
        <>
          <TextBlock>AI Response: {renderAIContent(prompt)}</TextBlock>
          <ButtonRow>
            <AIButton onClick={onClear}>Clear</AIButton>
          </ButtonRow>
        </>
      )}
    </Container>
  )
}

export default AIdropdown

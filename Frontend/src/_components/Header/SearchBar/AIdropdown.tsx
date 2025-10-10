import type { FC } from 'react'
import styled from 'styled-components'
import { renderAIContent } from '@/_components/ContextHooks/aiRender'

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

interface AIDropdownProps {
  prompt: string
}

const AIdropdown: FC<AIDropdownProps> = ({ prompt }) => {
  return <Container>{renderAIContent(prompt)}</Container>
}

export default AIdropdown

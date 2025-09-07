import type { FC, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: #e3f5fb;
  font-family: 'Instrument Sans', sans-serif;
  overflow: hidden;
  padding: 2rem 0;
`

const Box = styled.div<{ width?: string; maxWidth?: string }>`
  width: ${({ width = '100%' }) => width};
  max-width: ${({ maxWidth = '600px' }) => maxWidth};
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`

const BoxAnimated = styled(Box)<{
  fadeIn: boolean
  fadeOut: boolean
  width?: string
  maxWidth?: string
}>`
  opacity: ${({ fadeIn, fadeOut }) => (fadeOut ? 0 : fadeIn ? 1 : 0)};
  transition: opacity 0.5s ease;
`

const Title = styled.h1`
  margin-bottom: 20px;
  color: #3c3939;
  text-align: center;
`

interface FormContainerProps {
  children: ReactNode
  title: string
  fadeIn: boolean
  fadeOut: boolean
  width?: string
  maxWidth?: string
  onSubmit?: (e: React.FormEvent) => void
}

const FormContainer: FC<FormContainerProps> = ({
  children,
  title,
  fadeIn,
  fadeOut,
  width,
  maxWidth,
  onSubmit,
}) => {
  return (
    <Wrapper>
      <BoxAnimated
        fadeIn={fadeIn}
        fadeOut={fadeOut}
        width={width}
        maxWidth={maxWidth}
      >
        <Title>{title}</Title>
        {onSubmit ? <form onSubmit={onSubmit}>{children}</form> : children}
      </BoxAnimated>
    </Wrapper>
  )
}

export default FormContainer

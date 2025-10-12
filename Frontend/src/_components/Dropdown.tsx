import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'
import styled, { css, type Interpolation } from 'styled-components'

type Variant = 'light' | 'ink'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`

const styledVariant: Interpolation<{ $variant: Variant }> = ({ $variant }) =>
  ({
    light: css`
      background-color: #fff;
      color: #23272a;
      border: 1px solid #eee;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 6%);
    `,
    ink: css`
      background-color: #ffffffff;
      color: #23272a;
      border: 1px solid #eee;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 20%);
    `,
  })[$variant]

const Content = styled.div<{ $variant: Variant }>`
  width: 180px;
  position: absolute;
  right: 0;
  margin-top: 8px;
  padding: 12px;
  border-radius: 12px;
  z-index: 1000;
  ${styledVariant};
`

interface Props {
  trigger: (toggle: () => void) => ReactNode
  children: ReactNode
  variant?: Variant
}

const Dropdown: FC<Props> = ({ trigger, children, variant = 'light' }) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = (): void => setIsOpen((v) => !v)

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!(event.target instanceof Node)) return
      if (triggerRef.current?.contains(event.target)) return
      setIsOpen(false)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <Wrapper>
      <div ref={triggerRef}>{trigger(toggle)}</div>
      {isOpen && <Content $variant={variant}>{children}</Content>}
    </Wrapper>
  )
}

export default Dropdown

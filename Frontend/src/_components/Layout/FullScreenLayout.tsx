import type { FC, ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  #root {
    height: 100%;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

interface FullScreenLayoutProps {
  children: ReactNode
}

const FullScreenLayout: FC<FullScreenLayoutProps> = ({ children }) => (
  <>
    <GlobalStyles />
    <Container>{children}</Container>
  </>
)

export default FullScreenLayout

import type { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Header from './Header'

const LayoutContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.main`
  flex: 1;
  overflow: hidden;
`

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <LayoutContainer>
    <Header />
    <Content>{children}</Content>
  </LayoutContainer>
)

export default Layout

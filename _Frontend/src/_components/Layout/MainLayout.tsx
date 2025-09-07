import type { FC, ReactNode } from 'react'
import styled from 'styled-components'
import Header from '../Header'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

const Content = styled.main`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <Container>
    <Header />
    <Content>{children}</Content>
  </Container>
)

export default MainLayout

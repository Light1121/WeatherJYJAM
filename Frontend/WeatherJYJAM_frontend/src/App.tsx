import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './_components/Header'
import Home from './pages/Home'

const AppContainer = styled.div``

const ContentArea = styled.div``

const App: FC = () => (
  <AppContainer>
    <Header />
    <ContentArea>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:tabId" element={<Home />} />
      </Routes>
    </ContentArea>
  </AppContainer>
)

export default App

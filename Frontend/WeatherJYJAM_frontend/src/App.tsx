import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:tabId" element={<Home />} />
  </Routes>
)
export default App

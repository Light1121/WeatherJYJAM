import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:tabId" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
)

export default App

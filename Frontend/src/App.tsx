import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import { LocOneProvider } from './_components/ContextHooks/LocOneContext'
import { LocTwoProvider } from './_components/ContextHooks/LocTwoContext'

const App: FC = () => (
  <LocTwoProvider>
    <LocOneProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:tabId" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </LocOneProvider>
  </LocTwoProvider>
)

export default App

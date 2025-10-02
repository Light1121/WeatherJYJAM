import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Details from './pages/Details'
import { LocOneProvider } from './_components/ContextHooks/LocOneContext'
import { LocTwoProvider } from './_components/ContextHooks/LocTwoContext'
import { PinProvider } from './_components/ContextHooks/PinContext'
import { ControlPanelProvider } from './_components/ContextHooks/ControlPanelContext'

const App: FC = () => (
  <LocTwoProvider>
    <LocOneProvider>
      <PinProvider>
        <ControlPanelProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:tabId" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      </ControlPanelProvider>
      </PinProvider>
    </LocOneProvider>
  </LocTwoProvider>
)

export default App

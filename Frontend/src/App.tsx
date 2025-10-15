import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Details from './pages/Details'
import {
  TabsProvider,
  PinProvider,
  ControlPanelProvider,
  AuthProvider,
} from './_components/ContextHooks'
import { TabsPinIntegration } from './_components/ContextHooks/TabsPinIntegration' // Re-enabled with fixes

const App: FC = () => (
  <AuthProvider>
    <TabsProvider>
      <PinProvider>
        <ControlPanelProvider>
          <TabsPinIntegration />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </ControlPanelProvider>
      </PinProvider>
    </TabsProvider>
  </AuthProvider>
)

export default App

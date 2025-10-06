import type { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Details from './pages/Details'
import {
  TabsProvider,
  PinProvider,
  ControlPanelProvider,
} from './_components/ContextHooks'
import { TabsPinIntegration } from './_components/ContextHooks/TabsPinIntegration'

// Component to redirect authenticated users away from auth pages
const AuthRedirect: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const App: FC = () => (
  <TabsProvider>
    <PinProvider>
      <ControlPanelProvider>
        <TabsPinIntegration />
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />

          {/* Auth routes - redirect if already logged in */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <SignUp />
              </AuthRedirect>
            }
          />

          {/* Protected routes - authentication required */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ControlPanelProvider>
    </PinProvider>
  </TabsProvider>
)

export default App

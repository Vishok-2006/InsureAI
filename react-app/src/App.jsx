import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import HomePage       from './pages/HomePage'
import AuthPage       from './pages/AuthPage'
import UserDash       from './pages/UserDash'
import AgentDash      from './pages/AgentDash'
import AdminDash      from './pages/AdminDash'
import PlansPage      from './pages/PlansPage'
import ClassDiagram   from './pages/ClassDiagram'
import ToastProvider  from './components/ToastProvider'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/"                element={<HomePage />} />
            <Route path="/auth"            element={<AuthPage />} />
            <Route path="/user"            element={<ProtectedRoute><UserDash /></ProtectedRoute>} />
            <Route path="/agent"           element={<ProtectedRoute allowedRoles={['AGENT']}><AgentDash /></ProtectedRoute>} />
            <Route path="/admin"           element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDash /></ProtectedRoute>} />
            <Route path="/plans"           element={<PlansPage />} />
            <Route path="/architecture"    element={<ClassDiagram />} />
            <Route path="*"                element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

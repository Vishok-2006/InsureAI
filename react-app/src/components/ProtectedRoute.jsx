import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

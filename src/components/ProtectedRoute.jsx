import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PageLoader from './UI/PageLoader'

function ProtectedRoute({ children, requiredPermission }) {
  const { isAuthenticated, loading, hasPermission } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

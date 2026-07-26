import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from './Loader.jsx';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <Loader text="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
          <p className="mt-2 text-slate-500">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }
  return children;
}

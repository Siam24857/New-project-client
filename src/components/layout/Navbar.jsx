import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-base font-bold text-white">T</div>
          <span className="text-lg font-bold text-slate-900">TaskFlow</span>
        </Link>

        <div className="flex items-center gap-1">
          {isAuthenticated && links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">{user.name}</span>
              <button onClick={logout} className="btn-secondary text-xs">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary text-xs">Sign In</Link>
              <Link to="/register" className="btn-primary text-xs">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

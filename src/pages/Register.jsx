import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ name: false, email: false, password: false, confirm: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full max-w-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30" />
        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in"
              style={{ animationDelay: '200ms' }}
            >
              <span className="text-2xl font-bold text-white">T</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-slate-400">Start your free trial today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${isFocused.name ? 'text-blue-400' : 'text-slate-400'}`} />
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => setIsFocused({ ...isFocused, name: false })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  placeholder="John Doe"
                  required
                  minLength={2}
                />
                {isFocused.name && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-blue-500/50 pointer-events-none"
                  />
                )}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${isFocused.email ? 'text-purple-400' : 'text-slate-400'}`} />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setIsFocused({ ...isFocused, email: true })}
                  onBlur={() => setIsFocused({ ...isFocused, email: false })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
                {isFocused.email && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-purple-500/50 pointer-events-none"
                  />
                )}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${isFocused.password ? 'text-indigo-400' : 'text-slate-400'}`} />
                </div>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                {isFocused.password && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-indigo-500/50 pointer-events-none"
                  />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Min. 6 characters</p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle className={`h-5 w-5 transition-colors ${isFocused.confirm ? 'text-pink-400' : 'text-slate-400'}`} />
                </div>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  onFocus={() => setIsFocused({ ...isFocused, confirm: true })}
                  onBlur={() => setIsFocused({ ...isFocused, confirm: false })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                {isFocused.confirm && (
                  <div
                    className="absolute inset-0 rounded-lg border-2 border-pink-500/50 pointer-events-none"
                  />
                )}
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
              )}
            </div>

            {error && (
              <div
                className="rounded-lg bg-red-900/30 border border-red-500/30 p-3 text-sm text-red-400 animate-fade-in-up"
                style={{ animationDelay: '700ms' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div
            className="mt-8 text-center animate-fade-in-up"
            style={{ animationDelay: '800ms' }}
          >
            <p className="text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
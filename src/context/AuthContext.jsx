import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

const TOKEN_KEY = 'taskflow_token';

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function storeToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthHeader = (token) => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'];
  };

  const loadUser = useCallback(async () => {
    const token = getStoredToken();
    if (!token) { setLoading(false); return; }
    setAuthHeader(token);
    try {
      const res = await api.get('/v1/auth/me');
      setUser(res.data.data);
    } catch {
      storeToken(null);
      setAuthHeader(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = async (email, password) => {
    const res = await api.post('/v1/auth/login', { email, password });
    const { user: userData, token } = res.data.data;
    storeToken(token);
    setAuthHeader(token);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/v1/auth/register', { name, email, password });
    const { user: userData, token } = res.data.data;
    storeToken(token);
    setAuthHeader(token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    storeToken(null);
    setAuthHeader(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

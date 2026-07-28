import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessTokenRef = useRef(null);
  const isRefreshingRef = useRef(false);
  const refreshSubscribers = useRef([]);

  const setAuthHeader = (token) => {
    accessTokenRef.current = token;
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete api.defaults.headers.common['Authorization'];
  };

  const onTokenRefreshed = (token) => {
    refreshSubscribers.current.forEach((cb) => cb(token));
    refreshSubscribers.current = [];
  };

  const addRefreshSubscriber = (cb) => {
    refreshSubscribers.current.push(cb);
  };

  const refreshAccessToken = useCallback(async () => {
    if (isRefreshingRef.current) {
      return new Promise((resolve) => addRefreshSubscriber(resolve));
    }
    isRefreshingRef.current = true;
    try {
      const res = await api.post('/v1/auth/refresh');
      const { accessToken } = res.data.data;
      setAuthHeader(accessToken);
      onTokenRefreshed(accessToken);
      return accessToken;
    } catch (err) {
      setAuthHeader(null);
      setUser(null);
      throw err;
    } finally {
      isRefreshingRef.current = false;
    }
  }, []);

  const loadUser = useCallback(async () => {
    const token = accessTokenRef.current;
    if (!token) { setLoading(false); return; }
    setAuthHeader(token);
    try {
      const res = await api.get('/v1/auth/me');
      setUser(res.data.data);
    } catch {
      try {
        await refreshAccessToken();
        const res = await api.get('/v1/auth/me');
        setUser(res.data.data);
      } catch {
        setAuthHeader(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [refreshAccessToken]);

  useEffect(() => { loadUser(); }, [loadUser]);

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (refreshErr) {
          return Promise.reject(refreshErr);
        }
      }
      return Promise.reject(error);
    }
  );

  const login = async (email, password) => {
    const res = await api.post('/v1/auth/login', { email, password });
    const { user: userData, accessToken } = res.data.data;
    setAuthHeader(accessToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/v1/auth/register', { name, email, password });
    const { user: userData, accessToken } = res.data.data;
    setAuthHeader(accessToken);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await api.post('/v1/auth/logout');
    } finally {
      setAuthHeader(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user, getAccessToken: () => accessTokenRef.current }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

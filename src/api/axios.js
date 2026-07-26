import axios from 'axios';

/**
 * Central Axios instance.
 * - baseURL points to the API. In dev, Vite proxies /api to the backend.
 * - A response interceptor normalizes errors so components can rely on
 *   a consistent error message shape.
 * (Auth token injection is added in the Authentication milestone.)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;

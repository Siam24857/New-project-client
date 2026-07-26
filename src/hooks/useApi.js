import { useState, useCallback } from 'react';
import api from '../api/axios.js';

export function useApi(url, options = {}) {
  const { lazy = false } = options;
  const [state, setState] = useState({ data: null, loading: !lazy, error: null });

  const execute = useCallback(async (config = {}) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await api({ url, ...config });
      setState({ data: res.data, loading: false, error: null });
      return res.data;
    } catch (err) {
      setState({ data: null, loading: false, error: err.message });
      throw err;
    }
  }, [url]);

  return { ...state, execute };
}

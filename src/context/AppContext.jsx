import { createContext, useContext, useReducer, useCallback } from 'react';
import api from '../api/axios.js';

const AppContext = createContext(null);

const initialState = {
  projects: { data: [], meta: null, loading: false, error: null },
  tasks: { data: [], meta: null, loading: false, error: null },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, [action.resource]: { ...state[action.resource], loading: true, error: null } };
    case 'SET_ERROR': return { ...state, [action.resource]: { ...state[action.resource], loading: false, error: action.error } };
    case 'SET_DATA': return { ...state, [action.resource]: { data: action.data, meta: action.meta, loading: false, error: null } };
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProjects = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', resource: 'projects' });
    try {
      const res = await api.get('/v1/projects', { params });
      dispatch({ type: 'SET_DATA', resource: 'projects', data: res.data.data, meta: res.data.meta });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', resource: 'projects', error: err.message });
    }
  }, []);

  const fetchTasks = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', resource: 'tasks' });
    try {
      const res = await api.get('/v1/tasks', { params });
      dispatch({ type: 'SET_DATA', resource: 'tasks', data: res.data.data, meta: res.data.meta });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', resource: 'tasks', error: err.message });
    }
  }, []);

  const createProject = useCallback(async (data) => {
    const res = await api.post('/v1/projects', data);
    return res.data;
  }, []);

  const updateProject = useCallback(async (id, data) => {
    const res = await api.put(`/v1/projects/${id}`, data);
    return res.data;
  }, []);

  const deleteProject = useCallback(async (id) => {
    const res = await api.delete(`/v1/projects/${id}`);
    return res.data;
  }, []);

  const createTask = useCallback(async (data) => {
    const res = await api.post('/v1/tasks', data);
    return res.data;
  }, []);

  const updateTask = useCallback(async (id, data) => {
    const res = await api.put(`/v1/tasks/${id}`, data);
    return res.data;
  }, []);

  const deleteTask = useCallback(async (id) => {
    const res = await api.delete(`/v1/tasks/${id}`);
    return res.data;
  }, []);

  const value = {
    projects: state.projects, tasks: state.tasks,
    fetchProjects, fetchTasks,
    createProject, updateProject, deleteProject,
    createTask, updateTask, deleteTask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

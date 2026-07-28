import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Projects from '../pages/Projects.jsx';
import Tasks from '../pages/Tasks.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/projects" element={
        <ProtectedRoute>
          <Layout>
            <Projects />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/tasks" element={
        <ProtectedRoute>
          <Layout>
            <Tasks />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute>
          <Layout>
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-slate-400 mb-8">Page not found</p>
            <a href="/" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Go Home
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

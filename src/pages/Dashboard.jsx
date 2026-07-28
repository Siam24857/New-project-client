import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import Loader from '../components/common/Loader.jsx';
import StatisticsCards from '../components/dashboard/StatisticsCards.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get('/v1/projects?limit=5'),
      api.get('/v1/tasks?limit=5&status=todo'),
    ]).then(([projRes, taskRes]) => {
      if (!mounted) return;
      setStats({
        totalProjects: projRes.data.meta?.total || 0,
        totalTasks: taskRes.data.meta?.total || 0,
        completedTasks: taskRes.data.data.filter(t => t.status === 'done').length || 0,
        activeUsers: 250,
      });
      setRecentProjects(projRes.data.data || []);
      setRecentTasks(taskRes.data.data || []);
    }).catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          Overview of your projects and tasks
        </p>
      </div>

      <StatisticsCards stats={stats} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div
          className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="p-6 border-b border-slate-200/50">
            <h2 className="text-xl font-semibold text-slate-900">Recent Projects</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {recentProjects.slice(0, 5).map((project, index) => (
                <li
                  key={project._id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 50}ms` }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold text-lg"
                    style={{ backgroundColor: project.color || '#6366f1' }}
                  >
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{project.name}</p>
                    <p className="text-sm text-slate-500">{project.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <div className="p-6 border-b border-slate-200/50">
            <h2 className="text-xl font-semibold text-slate-900">Pending Tasks</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {recentTasks.slice(0, 5).map((task, index) => (
                <li
                  key={task._id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 50}ms` }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{task.title}</p>
                    <p className="text-sm text-slate-500">Priority: {task.priority}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${task.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' : task.priority === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import api from './api/axios.js';

/**
 * Milestone 1 landing page.
 * Confirms the full toolchain works end-to-end:
 * React renders, Tailwind styles apply, and Axios can reach the
 * Express backend's /api/health endpoint.
 */
export default function App() {
  const [status, setStatus] = useState('checking');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .get('/health')
      .then((res) => {
        if (!mounted) return;
        setInfo(res.data.data);
        setStatus('online');
      })
      .catch(() => mounted && setStatus('offline'));
    return () => {
      mounted = false;
    };
  }, []);

  const statusStyles = {
    checking: 'bg-amber-100 text-amber-700',
    online: 'bg-emerald-100 text-emerald-700',
    offline: 'bg-red-100 text-red-700',
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 text-2xl font-bold text-white">
          T
        </div>
        <h1 className="text-2xl font-bold text-slate-900">TaskFlow</h1>
        <p className="mt-1 text-sm text-slate-500">
          MERN Project &amp; Task Management Platform
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 p-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Backend status</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>
          {info && (
            <dl className="mt-3 space-y-1 text-xs text-slate-500">
              <div className="flex justify-between">
                <dt>Environment</dt>
                <dd className="font-mono">{info.environment}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Checked at</dt>
                <dd className="font-mono">
                  {new Date(info.timestamp).toLocaleTimeString()}
                </dd>
              </div>
            </dl>
          )}
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Milestone 1 — Development environment ready ✅
        </p>
      </div>
    </div>
  );
}

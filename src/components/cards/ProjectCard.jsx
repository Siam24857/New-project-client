import { Link } from 'react-router-dom';
import { statusColors, cn } from '../../utils/helpers.js';

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="card p-5 transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: project.color || '#6366f1' }}
          >
            {project.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <Link to={`/projects/${project._id}`} className="font-semibold text-slate-900 hover:text-brand-600">
              {project.name}
            </Link>
            <span className={cn('ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium', statusColors[project.status])}>
              {project.status}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(project)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-brand-600" title="Edit">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={() => onDelete(project)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Delete">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      {project.description && (
        <p className="mt-3 text-sm text-slate-500 line-clamp-2">{project.description}</p>
      )}
      <div className="mt-4 text-xs text-slate-400">
        Created {new Date(project.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
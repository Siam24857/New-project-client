import { useEffect, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import TaskCard from '../components/cards/TaskCard.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Modal from '../components/common/Modal.jsx';
import TaskForm from './TaskForm.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';

export default function Tasks() {
  const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useApp();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', priority: '', project: '' });
  const [modal, setModal] = useState({ open: false, mode: 'create', task: null });
  const [confirm, setConfirm] = useState({ open: false, task: null });

  const load = useCallback(() => {
    const params = { page, limit: 12 };
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.project) params.project = filters.project;
    fetchTasks(params);
  }, [fetchTasks, page, filters]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data) => {
    if (modal.mode === 'create') {
      await createTask(data);
    } else {
      await updateTask(modal.task._id, data);
    }
    setModal({ open: false, mode: 'create', task: null });
    load();
  };

  const handleDelete = async () => {
    if (!confirm.task) return;
    await deleteTask(confirm.task._id);
    setConfirm({ open: false, task: null });
    load();
  };

  if (tasks.loading && tasks.data.length === 0) return <Loader text="Loading tasks..." />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your tasks</p>
        </div>
        <button
          onClick={() => setModal({ open: true, mode: 'create', task: null })}
          className="btn-primary"
        >
          + New Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="input w-auto"
          value={filters.status}
          onChange={(e) => { setFilters({ ...filters, status: e.target.value }); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          className="input w-auto"
          value={filters.priority}
          onChange={(e) => { setFilters({ ...filters, priority: e.target.value }); setPage(1); }}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {tasks.error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{tasks.error}</div>
      )}

      {tasks.data.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={filters.status || filters.priority ? 'Try changing filters' : 'Create your first task'}
          action={
            filters.status || filters.priority
              ? null
              : <button onClick={() => setModal({ open: true, mode: 'create', task: null })} className="btn-primary">Create Task</button>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.data.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => setModal({ open: true, mode: 'edit', task: t })}
              onDelete={(t) => setConfirm({ open: true, task: t })}
            />
          ))}
        </div>
      )}

      <Pagination meta={tasks.meta} onPageChange={setPage} />

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, mode: 'create', task: null })}
        title={modal.mode === 'create' ? 'Create Task' : 'Edit Task'}
      >
        <TaskForm
          initial={modal.task}
          onSave={handleSave}
          onCancel={() => setModal({ open: false, mode: 'create', task: null })}
        />
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        title="Delete Task"
        message={`Are you sure you want to delete "${confirm.task?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, task: null })}
      />
    </div>
  );
}

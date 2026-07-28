import { useEffect, useState, useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ProjectCard from '../components/cards/ProjectCard.jsx';
import Pagination from '../components/common/Pagination.jsx';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Modal from '../components/common/Modal.jsx';
import ProjectForm from './ProjectForm.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';

export default function Projects() {
  const { projects, fetchProjects, updateProject, deleteProject, createProject } = useApp();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, mode: 'create', project: null });
  const [confirm, setConfirm] = useState({ open: false, project: null });

  const load = useCallback(() => {
    fetchProjects({ page, limit: 9 });
  }, [fetchProjects, page]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (data) => {
    if (modal.mode === 'create') {
      await createProject(data);
    } else {
      await updateProject(modal.project._id, data);
    }
    setModal({ open: false, mode: 'create', project: null });
    load();
  };

  const handleDelete = async () => {
    if (!confirm.project) return;
    await deleteProject(confirm.project._id);
    setConfirm({ open: false, project: null });
    load();
  };

  if (projects.loading && projects.data.length === 0) return <Loader text="Loading projects..." />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your projects</p>
        </div>
        <button
          onClick={() => setModal({ open: true, mode: 'create', project: null })}
          className="btn-primary"
        >
          + New Project
        </button>
      </div>

      {projects.error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{projects.error}</div>
      )}

      {projects.data.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started"
          action={
            <button onClick={() => setModal({ open: true, mode: 'create', project: null })} className="btn-primary">
              Create Project
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.data.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={(p) => setModal({ open: true, mode: 'edit', project: p })}
              onDelete={(p) => setConfirm({ open: true, project: p })}
            />
          ))}
        </div>
      )}

      <Pagination meta={projects.meta} onPageChange={setPage} />

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, mode: 'create', project: null })}
        title={modal.mode === 'create' ? 'Create Project' : 'Edit Project'}
      >
        <ProjectForm
          initial={modal.project}
          onSave={handleSave}
          onCancel={() => setModal({ open: false, mode: 'create', project: null })}
        />
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        title="Delete Project"
        message={`Are you sure you want to delete "${confirm.project?.name}"? This will also delete all tasks in this project.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, project: null })}
      />
    </div>
  );
}
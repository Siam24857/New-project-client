import Modal from './Modal.jsx';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      <p className="text-sm text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
        <button onClick={onConfirm} className="btn-danger">Delete</button>
      </div>
    </Modal>
  );
}

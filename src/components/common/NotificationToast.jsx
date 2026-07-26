import { useEffect } from 'react';
import { useSocket } from '../../context/SocketContext.jsx';

export default function NotificationToast() {
  const { notifications, dismissNotification } = useSocket();

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dismissNotification(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, dismissNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.slice(0, 3).map((notif, idx) => (
        <div
          key={notif.time + idx}
          className="card animate-slide-up flex items-center gap-3 px-4 py-3 shadow-lg"
        >
          <div className={`h-2 w-2 rounded-full ${
            notif.type.includes('created') ? 'bg-emerald-500' :
            notif.type.includes('deleted') ? 'bg-red-500' : 'bg-blue-500'
          }`} />
          <p className="text-sm text-slate-700">{notif.message}</p>
          <button
            onClick={() => dismissNotification(idx)}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

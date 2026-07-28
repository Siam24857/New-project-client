import Navbar from './Navbar.jsx';
import NotificationToast from '../common/NotificationToast.jsx';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/50 to-purple-50/80" />
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30" />
      
      <Navbar />
      
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30" />
          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-xl p-6 md:p-8">
            {children}
          </div>
        </div>
      </main>
      
      <NotificationToast />
    </div>
  );
}
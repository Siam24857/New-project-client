import { AuthProvider } from './context/AuthContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AppProvider>
    </AuthProvider>
  );
}

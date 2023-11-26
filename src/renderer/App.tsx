import { MemoryRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import './App.css';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

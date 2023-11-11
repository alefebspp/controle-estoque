import { MemoryRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import './App.css';
import AppRoutes from './routes';

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer hideProgressBar />
    </Router>
  );
}

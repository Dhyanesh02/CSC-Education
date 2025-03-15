import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={process.env.REACT_APP_ADMIN_LOGIN_URL} element={<AdminLogin />} />
          <Route path={process.env.REACT_APP_ADMIN_REGISTER_URL} element={<AdminRegister />} />
          <Route
            path={process.env.REACT_APP_ADMIN_DASHBOARD_URL}
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
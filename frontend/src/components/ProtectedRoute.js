import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !admin) {
      navigate(process.env.REACT_APP_ADMIN_LOGIN_URL);
    }
  }, [admin, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return admin ? children : null;
};

export default ProtectedRoute;
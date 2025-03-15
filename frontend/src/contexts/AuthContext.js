import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/admin';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    navigate(process.env.REACT_APP_ADMIN_LOGIN_URL);
  }, [navigate]);

  // Verify token on app load or refresh
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAdmin({ token });
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [logout]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'https://csc-education-server.vercel.app/api/admin/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        setAdmin({ token: response.data.token });
        navigate(process.env.REACT_APP_ADMIN_DASHBOARD_URL);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Return context value
  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
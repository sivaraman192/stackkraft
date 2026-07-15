import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Get API URL
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  // Production fallback
  if (!envUrl) {
    return 'https://stackkraft.onrender.com/api';
  }

  // Remove trailing slash if present
  const cleanUrl = envUrl.endsWith('/')
    ? envUrl.slice(0, -1)
    : envUrl;

  // Append /api only if missing
  return cleanUrl.endsWith('/api')
    ? cleanUrl
    : `${cleanUrl}/api`;
};

export const API_URL = getApiUrl();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.get(`${API_URL}/auth/me`);
        setAdmin(res.data);
      } catch (err) {
        console.error('Token verification failed:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const {
        token: receivedToken,
        admin: adminData,
      } = res.data;

      localStorage.setItem('adminToken', receivedToken);

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${receivedToken}`;

      setToken(receivedToken);
      setAdmin(adminData);

      return true;
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        'Login failed. Please try again.';

      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
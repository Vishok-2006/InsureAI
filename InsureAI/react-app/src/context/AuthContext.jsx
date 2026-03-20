import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on init
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('insurai_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem('insurai_user');
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    // Handle both { data: {...} } and direct object formats
    const userData = response?.data || response;

    setUser(userData);
    if (userData.token) localStorage.setItem('insurai_token', userData.token);
    localStorage.setItem('insurai_user', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('insurai_token');
    localStorage.removeItem('insurai_user');
  };

  const register = async (userData) => {
    return await authApi.register(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
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

import { useMemo, useState } from 'react';
import { authApi } from '../utils/api';
import { AuthContext } from './authContext';

function loadStoredUser() {
  try {
    const savedUser = localStorage.getItem('insurai_user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem('insurai_user');
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadStoredUser);
  const loading = false;

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

  const value = useMemo(() => ({ user, login, logout, register, loading }), [loading, user]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

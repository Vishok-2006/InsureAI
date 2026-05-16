import { useMemo, useState, useEffect } from 'react';
import { authApi } from '../utils/api';
import { AuthContext } from './authContext';

function clearStoredAuth() {
  localStorage.removeItem('insurai_token');
  localStorage.removeItem('insurai_user');
}

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const json = decodeURIComponent(decoded.split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isTokenValid(token) {
  const payload = parseJwt(token);
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp * 1000 > Date.now();
}

function loadStoredUser() {
  try {
    const savedUser = localStorage.getItem('insurai_user');
    const savedToken = localStorage.getItem('insurai_token');
    if (!savedUser || !savedToken) {
      clearStoredAuth();
      return null;
    }

    if (!isTokenValid(savedToken)) {
      clearStoredAuth();
      return null;
    }

    const parsedUser = JSON.parse(savedUser);
    return { ...parsedUser, token: savedToken };
  } catch {
    clearStoredAuth();
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadStoredUser);
  const loading = false;

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const userData = response?.data || response;

    if (!userData?.token) {
      throw new Error('Authentication failed: token not returned.');
    }

    setUser(userData);
    localStorage.setItem('insurai_token', userData.token);
    localStorage.setItem('insurai_user', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    setUser(null);
    clearStoredAuth();
  };

  // Listen for cross-tab or programmatic logout events (e.g., 401 responses)
  useEffect(() => {
    const handler = () => {
      setUser(null);
      clearStoredAuth();
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

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

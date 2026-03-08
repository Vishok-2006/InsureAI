const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Common API helper for fetch requests.
 * Handles JWT token from localStorage and common response patterns.
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('insurai_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Auth specific API calls
 */
export const authApi = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

/**
 * Plan specific API calls
 */
export const planApi = {
  getPlans: (params = '') => apiRequest(`/plans${params}`),
  getPlanById: (id) => apiRequest(`/plans/${id}`),
};

/**
 * Appointment specific API calls
 */
export const appointmentApi = {
  book: (data) => apiRequest('/appointments/book', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getUserAppointments: (userId) => apiRequest(`/appointments/user/${userId}`),
  getAgentAppointments: (agentId) => apiRequest(`/appointments/agent/${agentId}`),
  accept: (id) => apiRequest(`/appointments/${id}/accept`, { method: 'PUT' }),
  reject: (id, reason) => apiRequest(`/appointments/${id}/reject`, {
    method: 'PUT',
    body: JSON.stringify({ reason }),
  }),
  cancel: (id) => apiRequest(`/appointments/${id}/cancel`, { method: 'PUT' }),
  complete: (id) => apiRequest(`/appointments/${id}/complete`, { method: 'PUT' }),
  checkConflict: (agentId, date, time) => 
    apiRequest(`/appointments/check-conflict?agentId=${agentId}&date=${date}&time=${time}`),
};

/**
 * Agent specific API calls
 */
export const agentApi = {
  getAgents: () => apiRequest('/agents'),
  getAgentById: (id) => apiRequest(`/agents/${id}`),
};

/**
 * Notification specific API calls
 */
export const notificationApi = {
  getForUser: (userId) => apiRequest(`/notifications/user/${userId}`),
  markAsRead: (id) => apiRequest(`/notifications/${id}/read`, { method: 'PUT' }),
};

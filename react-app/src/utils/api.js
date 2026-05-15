import {
  mockLogin, mockRegister, mockGetPlans, mockGetAgents,
  mockGetUserAppointments, mockGetAgentAppointments,
  mockGetNotifications, mockBookAppointment,
  mockUpdateAppointment, mockMarkNotifRead,
} from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Set VITE_DEMO_MODE=true to force mocks during local development.
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

const normalizePlan = (plan) => ({
  ...plan,
  name: plan.name || plan.planName,
  premium: Number(plan.premium ?? plan.monthlyPremium ?? 0),
  coverageAmount: Number(plan.coverageAmount ?? 0),
  category: plan.category || 'HEALTH',
  isFeatured: Boolean(plan.isFeatured),
  isActive: plan.isActive !== false,
  features: plan.features || [],
})

/**
 * Core fetch wrapper — falls back to mock on network error or when DEMO_MODE is on
 */
export const apiRequest = async (endpoint, options = {}, mockFn = null) => {
  if (DEMO_MODE && mockFn) {
    return await mockFn()
  }

  const token = localStorage.getItem('insurai_token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'Something went wrong')
    return data
  } catch (error) {
    if (mockFn) {
      console.warn(`[API] Backend unreachable for ${endpoint}, using mock data`)
      return await mockFn()
    }
    console.error('API Request Error:', error)
    throw error
  }
}

// ── Auth API ─────────────────────────────────────────────────
export const authApi = {
  login: (credentials) => {
    if (DEMO_MODE) return mockLogin(credentials)
    return apiRequest('/auth/login', {
      method: 'POST', body: JSON.stringify(credentials)
    }, () => mockLogin(credentials))
  },
  register: (userData) => {
    if (DEMO_MODE) return mockRegister(userData)
    return apiRequest('/auth/register', {
      method: 'POST', body: JSON.stringify(userData)
    }, () => mockRegister(userData))
  },
}

// ── Plans API ─────────────────────────────────────────────────
export const planApi = {
  getPlans: async (params = '') => {
    const response = await apiRequest(`/plans${params}`, {}, mockGetPlans)
    return {
      ...response,
      data: (response.data || []).map(normalizePlan),
    }
  },
  getPlanById: (id) =>
    apiRequest(`/plans/${id}`, {}, () => mockGetPlans()),
}

// ── Appointments API ─────────────────────────────────────────
export const appointmentApi = {
  book: (data) =>
    apiRequest('/appointments/book', {
      method: 'POST', body: JSON.stringify(data)
    }, () => mockBookAppointment(data)),
  getUserAppointments: (userId) =>
    apiRequest(`/appointments/user/${userId}`, {}, mockGetUserAppointments),
  getAgentAppointments: (agentId) =>
    apiRequest(`/appointments/agent/${agentId}`, {}, mockGetAgentAppointments),
  accept: (id) =>
    apiRequest(`/appointments/${id}/accept`, { method: 'PUT' }, mockUpdateAppointment),
  reject: (id, reason) =>
    apiRequest(`/appointments/${id}/reject`, {
      method: 'PUT', body: JSON.stringify({ reason })
    }, mockUpdateAppointment),
  cancel: (id) =>
    apiRequest(`/appointments/${id}/cancel`, { method: 'PUT' }, mockUpdateAppointment),
  complete: (id) =>
    apiRequest(`/appointments/${id}/complete`, { method: 'PUT' }, mockUpdateAppointment),
  checkConflict: (agentId, date, time) =>
    apiRequest(`/appointments/check-conflict?agentId=${agentId}&date=${date}&time=${time}`, {}, () => Promise.resolve({ conflict: false })),
}

// ── Agents API ────────────────────────────────────────────────
export const agentApi = {
  getAgents: () =>
    apiRequest('/agents', {}, mockGetAgents),
  getAgentById: (id) =>
    apiRequest(`/agents/${id}`, {}, mockGetAgents),
}

// ── Notifications API ─────────────────────────────────────────
export const notificationApi = {
  getForUser: (userId) =>
    apiRequest(`/notifications/user/${userId}`, {}, mockGetNotifications),
  markAsRead: (id) =>
    apiRequest(`/notifications/${id}/read`, { method: 'PUT' }, mockMarkNotifRead),
}

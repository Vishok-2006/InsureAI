// ── Mock Data & API Simulation ────────────────────────────────
// Used when backend is unavailable (demo mode)

export const DEMO_USERS = {
  user: {
    id: 1, userId: 'USR-001', firstName: 'Ravi', lastName: 'Kumar',
    email: 'user@insurai.com', role: 'USER', department: 'IT',
    phone: '+91 98765 43210', token: 'demo_token_user',
  },
  agent: {
    id: 2, userId: 'AGT-001', firstName: 'Anita', lastName: 'Singh',
    email: 'agent@insurai.com', role: 'AGENT', department: 'Insurance',
    phone: '+91 87654 32109', token: 'demo_token_agent',
    company: 'LIC Corporation', specialization: 'Health & Life', isAvailable: true,
  },
  admin: {
    id: 3, userId: 'ADM-001', firstName: 'Super', lastName: 'Admin',
    email: 'admin@insurai.com', role: 'ADMIN', department: 'Administration',
    phone: '+91 76543 21098', token: 'demo_token_admin',
  },
}

export const MOCK_AGENTS = [
  { id: 1, firstName: 'Anita', lastName: 'Singh', email: 'anita.singh@insurai.com', company: 'LIC Corporation', specialization: 'Health & Life', isAvailable: true, rating: 4.9, clients: 87, licenseNo: 'LIC-2024-AGT-08741' },
  { id: 2, firstName: 'Rajesh', lastName: 'Mehta', email: 'rajesh.mehta@insurai.com', company: 'InsurTrust', specialization: 'Corporate Plans', isAvailable: true, rating: 4.7, clients: 63, licenseNo: 'LIC-2024-AGT-05523' },
  { id: 3, firstName: 'Priya', lastName: 'Nair', email: 'priya.nair@insurai.com', company: 'SafeGuard Ins.', specialization: 'Group Insurance', isAvailable: true, rating: 4.8, clients: 71, licenseNo: 'LIC-2024-AGT-07210' },
  { id: 4, firstName: 'Arjun', lastName: 'Patel', email: 'arjun.patel@insurai.com', company: 'MaxLife', specialization: 'Life & Term', isAvailable: false, rating: 4.6, clients: 45, licenseNo: 'LIC-2024-AGT-03890' },
]

export const MOCK_PLANS = [
  { id: 1, name: 'Basic Health Plan', category: 'HEALTH', premium: 2499, coverageAmount: 300000, description: 'Essential health coverage for individuals with hospitalization, OPD visits, and emergency care.', isActive: true, features: ['Hospitalization cover', 'Emergency assistance', '20 OPD visits/year', 'AI support included'] },
  { id: 2, name: 'Premium Health Plan', category: 'HEALTH', premium: 4999, coverageAmount: 700000, description: 'Comprehensive health plan with dental, vision, OPD and priority agent support.', isActive: true, isFeatured: true, features: ['All Basic benefits', 'Dental & Vision cover', '50 OPD visits/year', 'Family add-on available', 'Priority agent support'] },
  { id: 3, name: 'Enterprise Plan', category: 'HEALTH', premium: 8999, coverageAmount: 2000000, description: 'Unlimited corporate coverage including international, full family, and dedicated agent.', isActive: true, features: ['Unlimited coverage', 'International emergency cover', 'Full family plan', 'Dedicated personal agent', '24/7 concierge support'] },
  { id: 4, name: 'Group Life Insurance', category: 'LIFE', premium: 1999, coverageAmount: 2500000, description: 'Corporate life insurance for employees with term and group benefits.', isActive: true, features: ['Life coverage up to ₹25L', 'Nominee assignment', 'Terminal illness benefit', 'Group discount applicable'] },
]

export const MOCK_APPOINTMENTS = [
  { id: 1, agentName: 'Anita Singh', agentId: 1, date: '2026-03-20', time: '10:30', reason: 'coverage-upgrade', mode: 'VIDEO_CALL', status: 'CONFIRMED', notes: 'Upgrade to Enterprise plan discussion' },
  { id: 2, agentName: 'Rajesh Mehta', agentId: 2, date: '2026-03-25', time: '14:00', reason: 'policy-review', mode: 'VIDEO_CALL', status: 'PENDING', notes: 'Annual policy review' },
  { id: 3, agentName: 'Anita Singh', agentId: 1, date: '2026-02-15', time: '11:00', reason: 'new-enrollment', mode: 'VIDEO_CALL', status: 'COMPLETED', notes: 'Initial enrollment completed' },
  { id: 4, agentName: 'Priya Nair', agentId: 3, date: '2026-01-10', time: '15:00', reason: 'claims-assistance', mode: 'PHONE', status: 'COMPLETED', notes: 'Claims processing assistance' },
]

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: '🎉 Appointment Confirmed', message: 'Your appointment with Anita Singh on Mar 20, 2026 at 10:30 AM is confirmed.', type: 'APPOINTMENT', isRead: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: 2, title: '⚠️ Plan Renewal Reminder', message: 'Your Premium Health Plan renews on July 15, 2026. Ensure your payment method is up to date.', type: 'RENEWAL', isRead: false, createdAt: new Date(Date.now() - 24 * 3600000).toISOString() },
  { id: 3, title: '📋 New Plan Available', message: 'Enterprise International Plan is now available. Speak with your agent to upgrade.', type: 'INFO', isRead: true, createdAt: new Date(Date.now() - 3 * 24 * 3600000).toISOString() },
]

export const MOCK_AGENT_APPOINTMENTS = [
  { id: 1, userName: 'Ravi Kumar', userId: 1, date: '2026-03-20', time: '10:30', reason: 'coverage-upgrade', mode: 'VIDEO_CALL', status: 'CONFIRMED' },
  { id: 2, userName: 'Meena Patel', userId: 5, date: '2026-03-20', time: '14:00', reason: 'new-enrollment', mode: 'PHONE', status: 'PENDING' },
  { id: 3, userName: 'Suresh Iyer', userId: 6, date: '2026-03-22', time: '11:00', reason: 'policy-review', mode: 'VIDEO_CALL', status: 'PENDING' },
  { id: 4, userName: 'Kavita Desai', userId: 7, date: '2026-02-10', time: '15:30', reason: 'claims-assistance', mode: 'IN_PERSON', status: 'COMPLETED' },
  { id: 5, userName: 'Rahul Verma', userId: 8, date: '2026-01-28', time: '10:00', reason: 'family-floater', mode: 'VIDEO_CALL', status: 'CANCELLED' },
]

// Helper: simulate async delay
const delay = (ms = 600) => new Promise(res => setTimeout(res, ms))

// ── Mock Auth ─────────────────────────────────────────────────
export const mockLogin = async ({ email, password }) => {
  await delay(800)
  const lower = email.toLowerCase()
  if (lower.startsWith('admin')) return { data: { ...DEMO_USERS.admin, token: 'demo_token_admin' } }
  if (lower.startsWith('agent')) return { data: { ...DEMO_USERS.agent, token: 'demo_token_agent' } }
  // Accept any email/password for user demo
  if (email && password) {
    const name = email.split('@')[0].split('.') 
    return { data: {
      ...DEMO_USERS.user,
      firstName: name[0] ? name[0].charAt(0).toUpperCase() + name[0].slice(1) : 'Demo',
      lastName: name[1] ? name[1].charAt(0).toUpperCase() + name[1].slice(1) : 'User',
      email,
      token: 'demo_token_user',
    }}
  }
  throw new Error('Invalid credentials')
}

export const mockRegister = async () => {
  await delay(900)
  return { message: 'Registration successful. Please check your email.' }
}

// ── Mock Resource APIs ────────────────────────────────────────
export const mockGetPlans = async () => {
  await delay(500)
  return { data: MOCK_PLANS }
}

export const mockGetAgents = async () => {
  await delay(500)
  return { data: MOCK_AGENTS }
}

export const mockGetUserAppointments = async () => {
  await delay(500)
  return { data: { content: MOCK_APPOINTMENTS } }
}

export const mockGetAgentAppointments = async () => {
  await delay(500)
  return { data: { content: MOCK_AGENT_APPOINTMENTS } }
}

export const mockGetNotifications = async () => {
  await delay(400)
  return { data: MOCK_NOTIFICATIONS }
}

export const mockBookAppointment = async (data) => {
  await delay(1000)
  return { message: 'Appointment booked successfully', data: { id: Date.now(), ...data, status: 'PENDING' } }
}

export const mockUpdateAppointment = async () => {
  await delay(600)
  return { message: 'Appointment updated' }
}

export const mockMarkNotifRead = async () => {
  await delay(200)
  return { message: 'Marked as read' }
}

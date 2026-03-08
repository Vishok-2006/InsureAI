import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'
import { planApi, appointmentApi, notificationApi, agentApi } from '../utils/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect } from 'react'

function Sidebar({ active, onNav }) {
  const navItems = [
    { id:'overview',   icon:'🏠', label:'Dashboard' },
    { id:'plans',      icon:'📋', label:'My Plans' },
    { id:'book',       icon:'📅', label:'Book Appointment', separator: true },
    { id:'history',    icon:'🕒', label:'Appointment History' },
    { id:'voice',      icon:'🎤', label:'Voice Assistant' },
    { id:'notifs',     icon:'🔔', label:'Notifications', badge: 3 },
    { id:'profile',    icon:'👤', label:'My Profile', separator: true },
  ]

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <div className="sidebar-avatar">RK</div>
          <div className="sidebar-user-info">
            <div className="name">Ravi Kumar</div>
            <div className="role">User · IT Dept</div>
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div key={item.id}>
            {item.separator && <div className="sidebar-section-label" style={{ marginTop: '.5rem' }}>Account</div>}
            <div
              className={`sidebar-link${active === item.id ? ' active' : ''}`}
              onClick={() => onNav(item.id)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="badge-count">{item.badge}</span>}
            </div>
          </div>
        ))}
        <div className="sidebar-link" onClick={() => useNavigate()('/auth')}>
          <span className="icon">🚪</span> Sign Out
        </div>
      </nav>
    </aside>
  )
}

const bookingData = [
  {month:'Oct',value:1},{month:'Nov',value:2},{month:'Dec',value:0},{month:'Jan',value:3},{month:'Feb',value:2},{month:'Mar',value:1}
]

// ── Overview Section ──────────────────────────────────────────
function OverviewSection({ onNav, user, appointments, notifications }) {
  const nextAppt = appointments.find(a => a.status === 'CONFIRMED' || a.status === 'PENDING')
  const unreadCount = notifications.filter(n => !n.isRead).length
  
  return (
    <div>
      <div className="page-header">
        <h2>Good Morning, {user?.firstName}! 👋</h2>
        <p>Here's your insurance overview for today.</p>
      </div>
      <div className="grid-4 mb-4">
        {[
          { icon:'📋', label:'Active Plans',       value:'2',    color:'blue',   change:'✓ All active' },
          { icon:'📅', label:'Upcoming Appts',     value: appointments.length.toString(),    color:'cyan',   change: nextAppt ? `${nextAppt.date}` : 'No upcoming' },
          { icon:'🔔', label:'Unread Alerts',      value: unreadCount.toString(),    color:'orange', change: unreadCount > 0 ? '⚠ Action needed' : '✓ All caught up' },
          { icon:'🛡️', label:'Total Coverage',     value:'₹7L',  color:'green',  change:'Premium Health' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.color === 'orange' ? 'down' : 'up'}`}>{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h4>📅 Next Appointment</h4>
            {nextAppt && <span className={`badge ${nextAppt.status==='CONFIRMED'?'badge-success':'badge-warning'} badge-dot`}>{nextAppt.status}</span>}
          </div>
          <div className="card-body">
            {nextAppt ? (
              <>
                <div style={{ display:'flex',gap:'1.25rem',alignItems:'flex-start' }}>
                  <div style={{ width:56,height:56,borderRadius:'var(--radius-lg)',background:'var(--primary-50)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0 }}>🧑‍💼</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:'1rem',marginBottom:'.25rem' }}>{nextAppt.agentName}</div>
                    <div style={{ fontSize:'.875rem',color:'var(--text-muted)',marginBottom:'.5rem' }}>Insurance Agent · InsurAI</div>
                    <div style={{ fontSize:'.9rem',fontWeight:600,color:'var(--primary)' }}>📅 {nextAppt.date} · {nextAppt.time}</div>
                    <div style={{ fontSize:'.875rem',color:'var(--text-muted)',marginTop:'.25rem' }}>🎥 {nextAppt.mode} · {nextAppt.reason}</div>
                  </div>
                </div>
                <div style={{ display:'flex',gap:'.75rem',marginTop:'1.25rem' }}>
                  <button className="btn btn-outline btn-sm">Reschedule</button>
                  <button className="btn btn-danger btn-sm">Cancel</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign:'center',padding:'1rem',color:'var(--text-muted)' }}>
                No upcoming appointments. <br/>
                <button className="btn btn-ghost btn-sm mt-2" onClick={()=>onNav('book')}>Book Now</button>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h4>🛡️ Coverage Summary</h4><span className="badge badge-primary">Premium</span></div>
          <div className="card-body">
            {[
              { label:'Hospitalization',   filled:70, max:'₹7L',     used:'₹4.9L', color:'var(--primary)' },
              { label:'OPD Visits',        filled:40, max:'50/yr',  used:'20 used', color:'var(--accent)' },
              { label:'Dental',            filled:30, max:'₹50,000',used:'₹15,000', color:'var(--warning-light)' },
            ].map(c => (
              <div key={c.label} style={{ marginBottom:'1rem' }}>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:'.8125rem',fontWeight:600,marginBottom:'.375rem' }}>
                  <span>{c.label}</span>
                  <span style={{ color:'var(--text-muted)' }}>{c.used} / {c.max}</span>
                </div>
                <div style={{ height:8,background:'var(--grey-100)',borderRadius:4,overflow:'hidden' }}>
                  <div style={{ width:`${c.filled}%`,height:'100%',background:c.color,borderRadius:4,transition:'width .6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h4>🔔 Recent Notifications</h4>
          <button className="btn btn-ghost btn-sm" onClick={() => onNav('notifs')}>View All</button>
        </div>
        <div className="card-body">
          {notifications.slice(0, 3).map((n,i) => (
            <div key={i} className="notif-item">
              <div className={`notif-icon blue`}>🔔</div>
              <div className="notif-content">
                <div className="title">{n.title}</div>
                <div className="desc">{n.message}</div>
                <div className="time">{new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
          {notifications.length === 0 && <p style={{ color:'var(--text-muted)', textAlign:'center' }}>No recent notifications.</p>}
        </div>
      </div>
    </div>
  )
}

// ── Voice Assistant Section ───────────────────────────────────
function VoiceSection({ user }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [typing, setTyping] = useState(false)
  const [query, setQuery] = useState('')
  const toast = useToast()

  const aiResponses = {
    'coverage':    'Your Premium Health Plan covers up to ₹7,00,000 annually. This includes in-patient hospitalization, 50 OPD visits/year, dental & vision, and emergency cover.',
    'appointment': 'You have an upcoming appointment with Agent Anita Singh on March 9, 2026 at 10:30 AM via Video Call for a coverage upgrade discussion.',
    'renewal':     'Your Premium Health Plan renews on July 15, 2026. You\'ll receive a reminder 30 days before expiry. Payments auto-debit from your registered account.',
    'agent':       'Your assigned agent is Anita Singh from LIC Corporation (License: LIC-2024-AGT-08741), specializing in Health & Life Insurance. Rated 4.9/5 by 87 clients.',
    'claim':       'To file a claim: Login → Claims → Submit Claim. Attach hospital bills and discharge summary. Claims under ₹50,000 are processed in 5-7 days.',
    'default':     'Thanks for your query! For specific policy details, I recommend speaking with your assigned agent Anita Singh. You can book an appointment directly from the "Book Appointment" section.',
  }

  function getResponse(q) {
    const lower = q.toLowerCase()
    if (lower.includes('coverage') || lower.includes('plan')) return aiResponses['coverage']
    if (lower.includes('appointment') || lower.includes('schedule')) return aiResponses['appointment']
    if (lower.includes('renew') || lower.includes('expir')) return aiResponses['renewal']
    if (lower.includes('agent')) return aiResponses['agent']
    if (lower.includes('claim')) return aiResponses['claim']
    if (lower.includes('hello') || lower.includes('hi')) return `Hello ${user?.firstName || 'User'}! How can I help you today?`
    return aiResponses['default']
  }

  function simulateTyping(text) {
    setTyping(true)
    setResponse('')
    let i = 0
    const interval = setInterval(() => {
      setResponse(prev => prev + text[i])
      i++
      if (i === text.length) {
        clearInterval(interval)
        setTyping(false)
      }
    }, 20)
  }

  function startVoice() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast('Browser not supported', 'Use Chrome for speech recognition', 'warning')
      return
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'en-IN'
    rec.continuous = false
    setListening(true)
    setTranscript('')
    setResponse('')
    rec.onresult = e => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      setListening(false)
      setTimeout(() => simulateTyping(getResponse(text)), 600)
    }
    rec.onerror = () => { setListening(false); toast('Voice error', 'Try again or type your query', 'error') }
    rec.onend = () => setListening(false)
    rec.start()
  }

  function handleTextQuery(e) {
    e.preventDefault()
    if (!query.trim()) return
    setTranscript(query)
    simulateTyping(getResponse(query))
    setQuery('')
  }

  return (
    <div>
      <div className="page-header"><h2>🎤 Voice AI Assistant</h2><p>Ask anything about your insurance plan using voice or text.</p></div>
      <div className="grid-2">
        <div className="card" style={{ textAlign:'center' }}>
          <div className="card-body" style={{ padding:'2.5rem 1.5rem' }}>
            <button
              onClick={startVoice}
              style={{
                width:100,height:100,borderRadius:'50%',border:'none',cursor:'pointer',
                background: listening ? 'linear-gradient(135deg,#E53935,#D32F2F)' : 'linear-gradient(135deg,var(--primary-dark),var(--primary))',
                color:'white',fontSize:'2.5rem',transition:'all .3s',
                boxShadow: listening ? '0 0 0 12px rgba(229,57,53,.2),0 0 0 24px rgba(229,57,53,.08)' : '0 8px 24px rgba(21,101,192,.4)',
                animation: listening ? 'pulse 1.5s infinite' : 'none'
              }}
            >
              {listening ? '🎙️' : '🎤'}
            </button>
            <div style={{ marginTop:'1.25rem', fontWeight:700, color: listening ? 'var(--danger-light)' : 'var(--primary)' }}>
              {listening ? 'Listening...' : 'Tap to Speak'}
            </div>
            {listening && (
              <div className="voice-wave" style={{ justifyContent:'center', marginTop:'0.75rem' }}>
                {[40,60,32,56,44].map((h,i)=>(<div key={i} className="voice-bar" style={{ height:h/4 }} />))}
              </div>
            )}
            {transcript && (
              <div style={{ marginTop:'1.5rem',padding:'1rem',background:'var(--grey-50)',borderRadius:'var(--radius-md)',textAlign:'left' }}>
                <div style={{ fontSize:'.75rem',fontWeight:700,color:'var(--text-muted)',marginBottom:'.375rem' }}>YOU SAID:</div>
                <div style={{ fontSize:'.9375rem',fontStyle:'italic' }}>"{transcript}"</div>
              </div>
            )}
            {response && (
              <div style={{ marginTop:'.875rem',padding:'1rem',background:'var(--primary-50)',borderRadius:'var(--radius-md)',textAlign:'left',border:'1px solid var(--primary-100)' }}>
                <div style={{ fontSize:'.75rem',fontWeight:700,color:'var(--primary)',marginBottom:'.375rem',display:'flex',justifyContent:'space-between' }}>
                  <span>🤖 AI ASSISTANT</span>
                  {typing && <span className="pulse">Typing...</span>}
                </div>
                <div style={{ fontSize:'.9rem',color:'var(--text-secondary)',lineHeight:1.75 }}>{response}</div>
              </div>
            )}
          </div>
          <div className="card-footer">
            <form onSubmit={handleTextQuery} style={{ display:'flex',gap:'.625rem' }}>
              <input className="form-control" placeholder="Or type your question..." value={query} onChange={e=>setQuery(e.target.value)} />
              <button type="submit" className="btn btn-primary btn-sm">Ask</button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h4>💡 Quick Questions</h4></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.625rem' }}>
            {[
              'What is my current coverage amount?',
              'When is my next appointment?',
              'When does my plan renew?',
              'Who is my assigned agent?',
              'How do I file a claim?',
            ].map(q=>(
              <button key={q} className="btn btn-outline" style={{ textAlign:'left',justifyContent:'flex-start',padding:'.75rem 1rem' }}
                onClick={() => { setTranscript(q); simulateTyping(getResponse(q)) }}>
                💬 {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main User Dashboard ───────────────────────────────────
export default function UserDash() {
  const [section, setSection] = useState('overview')
  const [plans, setPlans] = useState([])
  const [appointments, setAppointments] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()
  const toast = useToast()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const userId = user.id || 1; // Fallback for demo
      const [pData, aData, nData] = await Promise.all([
        planApi.getPlans(),
        appointmentApi.getUserAppointments(userId),
        notificationApi.getForUser(userId)
      ])
      setPlans(pData.data || [])
      setAppointments(aData.data.content || [])
      setNotifications(nData.data || [])
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      // toast('Error', 'Failed to load dashboard data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    toast('Signed out', 'Goodbye!', 'info')
    navigate('/auth')
  }

  if (loading && !user) return <div style={{ display:'flex',height:'100vh',alignItems:'center',justifyContent:'center' }}>Loading...</div>

  return (
    <div>
      {/* Navbar strip */}
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <Link className="navbar-brand" to="/"><div className="navbar-logo-icon">AI</div>Insur<span className="brand-dot">AI</span></Link>
          <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.875rem',color:'var(--text-secondary)' }}>
              <div style={{ width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary-dark),var(--accent))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'.75rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              {user?.firstName} {user?.lastName}
            </div>
            <span className="badge badge-primary">User</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-user">
              <div className="sidebar-avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
              <div className="sidebar-user-info">
                <div className="name">{user?.firstName} {user?.lastName}</div>
                <div className="role">User · {user?.department || 'Member'}</div>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-section-label">Overview</div>
            {[
              { id:'overview', icon:'🏠', label:'Dashboard' },
              { id:'plans',    icon:'📋', label:'My Plans' },
            ].map(item => (
              <div key={item.id} className={`sidebar-link${section===item.id?' active':''}`} onClick={()=>setSection(item.id)}>
                <span className="icon">{item.icon}</span>{item.label}
              </div>
            ))}
            <div className="sidebar-section-label">Appointments</div>
            {[
              { id:'book',    icon:'📅', label:'Book Appointment' },
              { id:'history', icon:'🕒', label:'History' },
            ].map(item => (
              <div key={item.id} className={`sidebar-link${section===item.id?' active':''}`} onClick={()=>setSection(item.id)}>
                <span className="icon">{item.icon}</span>{item.label}
              </div>
            ))}
            <div className="sidebar-section-label">Tools</div>
            {[
              { id:'voice',   icon:'🎤', label:'Voice Assistant' },
              { id:'notifs',  icon:'🔔', label:'Notifications', badge:3 },
            ].map(item => (
              <div key={item.id} className={`sidebar-link${section===item.id?' active':''}`} onClick={()=>setSection(item.id)}>
                <span className="icon">{item.icon}</span>{item.label}
                {item.badge && <span className="badge-count">{item.badge}</span>}
              </div>
            ))}
            <div className="sidebar-section-label">Account</div>
            <div className={`sidebar-link${section==='profile'?' active':''}`} onClick={()=>setSection('profile')}>
              <span className="icon">👤</span>My Profile
            </div>
            <div className="sidebar-link" onClick={()=>navigate('/auth')}>
              <span className="icon">🚪</span>Sign Out
            </div>
          </nav>
        </aside>

        <main className="main-content">
          {section === 'overview' && <OverviewSection onNav={setSection} user={user} appointments={appointments} notifications={notifications} />}
          {section === 'voice'    && <VoiceSection user={user} />}
          {section === 'plans'    && <PlansSection plans={plans} />}
          {section === 'book'     && <BookSection toast={toast} user={user} onDone={fetchDashboardData} />}
          {section === 'history'  && <HistorySection appointments={appointments} />}
          {section === 'notifs'   && <NotifsSection notifications={notifications} onRead={fetchDashboardData} />}
          {section === 'profile'  && <ProfileSection toast={toast} user={user} />}
        </main>
      </div>
    </div>
  )
}

function PlansSection({ plans }) {
  return (
    <div>
      <div className="page-header"><h2>📋 My Insurance Plans</h2><p>View and manage your active insurance plans.</p></div>
      <div className="grid-2">
        {plans.map(p=>(
          <div key={p.id} className="card" style={{ borderTop:`4px solid var(--primary)` }}>
            <div className="card-header">
              <h4>{p.name}</h4>
              <span className={`badge ${p.isActive ? 'badge-success' : 'badge-danger'} badge-dot`}>{p.isActive ? 'Active' : 'Expired'}</span>
            </div>
            <div className="card-body">
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1.25rem' }}>
                <div style={{ background:'var(--grey-50)',borderRadius:'var(--radius-md)',padding:'.875rem' }}>
                  <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Premium</div>
                  <div style={{ fontWeight:800,color:'var(--primary)',fontSize:'1.125rem' }}>₹{p.premium}/mo</div>
                </div>
                <div style={{ background:'var(--grey-50)',borderRadius:'var(--radius-md)',padding:'.875rem' }}>
                  <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Coverage</div>
                  <div style={{ fontWeight:800,fontSize:'1.125rem' }}>₹{p.coverageAmount.toLocaleString()}</div>
                </div>
              </div>
              <p style={{ fontSize:'.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{p.description}</p>
              <div style={{ fontSize:'.8125rem',color:'var(--text-muted)',marginTop:'.75rem' }}>🛡️ Category: {p.category}</div>
            </div>
          </div>
        ))}
        {plans.length === 0 && <p className="card p-4 text-center">No active plans found.</p>}
      </div>
    </div>
  )
}

function BookSection({ toast, user, onDone }) {
  const [step, setStep]     = useState(0)
  const [agent, setAgent]   = useState(null)
  const [date, setDate]     = useState('')
  const [time, setTime]     = useState('')
  const [reason, setReason] = useState('coverage-upgrade')
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const resp = await agentApi.getAgents()
      setAgents(resp.data || [])
    } catch (err) {
      toast('Error', 'Failed to load agents', 'error')
    }
  }

  const slots = ['09:00','09:30','10:00','10:30','11:00', '11:30', '14:00','14:30','15:00','15:30']

  async function confirm() {
    setLoading(true)
    try {
      await appointmentApi.book({
        agentId: agent.id,
        date,
        time: time + ':00',
        reason,
        mode: 'VIDEO_CALL',
        notes: 'Booked via dashboard'
      })
      toast('Appointment Booked! 🎉', `Confirmed with ${agent?.firstName} ${agent?.lastName} on ${date} at ${time}`, 'success')
      onDone()
      setStep(0); setAgent(null); setDate(''); setTime('')
    } catch (err) {
      toast('Booking failed', err.message || 'Slot might be unavailable', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header"><h2>📅 Book Appointment</h2><p>Schedule a meeting with your insurance agent.</p></div>
      {/* Stepper */}
      <div style={{ display:'flex',alignItems:'center',gap:0,marginBottom:'2rem',background:'var(--grey-50)',borderRadius:'var(--radius-lg)',padding:'1rem 1.5rem' }}>
        {['Select Agent','Choose Time','Confirm'].map((s,i)=>(
          <div key={s} style={{ display:'flex',alignItems:'center',flex:i<2?1:'auto' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'.625rem' }}>
              <div style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'.875rem',
                background: step>i ? 'var(--success-light)' : step===i ? 'var(--primary)' : 'var(--grey-200)',
                color: step>=i ? 'white' : 'var(--text-muted)' }}>
                {step>i ? '✓' : i+1}
              </div>
              <span style={{ fontSize:'.875rem',fontWeight:600,color:step===i?'var(--primary)':step>i?'var(--success)':'var(--text-muted)' }}>{s}</span>
            </div>
            {i<2 && <div style={{ flex:1,height:2,background:step>i?'var(--success-light)':'var(--grey-200)',margin:'0 1rem' }} />}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          {step === 0 && (
            <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
              <h4>Choose Your Agent</h4>
              {agents.map(a=>(
                <div key={a.id} onClick={()=>{setAgent(a);setStep(1)}}
                  style={{ display:'flex',alignItems:'center',gap:'1.25rem',padding:'1.125rem',borderRadius:'var(--radius-md)',
                    border:`2px solid ${agent?.id===a.id?'var(--primary)':'var(--border)'}`,cursor:'pointer',
                    background:agent?.id===a.id?'var(--primary-50)':'white',transition:'all .2s' }}>
                  <div style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary-dark),var(--accent))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,flexShrink:0 }}>
                    {a.firstName[0]}{a.lastName[0]}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700 }}>{a.firstName} {a.lastName}</div>
                    <div style={{ fontSize:'.8125rem',color:'var(--text-muted)' }}>{a.company} · {a.specialization || 'Insurance Expert'}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontWeight:700,color:'var(--warning)' }}>⭐ 4.8</div>
                    <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Available</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              <h4 style={{ marginBottom:'1.25rem' }}>Select Date & Time</h4>
              <div className="grid-2">
                <div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input className="form-control" type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Meeting Mode</label>
                    <select className="form-control">
                      <option>🎥 Video Call</option>
                      <option>📞 Phone Call</option>
                      <option>🏢 In-Person</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Reason</label>
                    <select className="form-control" value={reason} onChange={e=>setReason(e.target.value)}>
                      <option value="coverage-upgrade">Coverage Upgrade</option>
                      <option value="new-enrollment">New Enrollment</option>
                      <option value="policy-review">Policy Review</option>
                      <option value="claims-assistance">Claims Assistance</option>
                      <option value="family-floater">Family Floater Addition</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="form-label">Available Time Slots</label>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'.5rem',marginTop:'.5rem' }}>
                    {slots.map(s=>(
                      <button key={s} className="btn btn-sm" onClick={()=>setTime(s)}
                        style={{ background:time===s?'var(--primary)':'white',color:time===s?'white':'var(--text-secondary)',
                          border:`1.5px solid ${time===s?'var(--primary)':'var(--border)'}` }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display:'flex',gap:'.75rem',marginTop:'1.5rem' }}>
                <button className="btn btn-ghost" onClick={()=>setStep(0)}>← Back</button>
                <button className="btn btn-primary" disabled={!date||!time} onClick={()=>setStep(2)}>Next →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 style={{ marginBottom:'1.25rem' }}>Confirm Appointment</h4>
              <div style={{ background:'var(--grey-50)',borderRadius:'var(--radius-lg)',padding:'1.5rem',marginBottom:'1.5rem' }}>
                {[['Agent', agent?.firstName + ' ' + agent?.lastName], ['Date', date], ['Time', time], ['Mode', '🎥 Video Call'], ['Reason', reason.replace(/-/g,' ')]].map(([k,v])=>(
                  <div key={k} style={{ display:'flex',justifyContent:'space-between',padding:'.625rem 0',borderBottom:'1px solid var(--border)' }}>
                    <span style={{ color:'var(--text-muted)',fontSize:'.875rem' }}>{k}</span>
                    <span style={{ fontWeight:600,fontSize:'.875rem' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex',gap:'.75rem' }}>
                <button className="btn btn-ghost" onClick={()=>setStep(1)}>← Back</button>
                <button className="btn btn-primary" onClick={confirm} disabled={loading}>{loading ? 'Booking...' : '✓ Confirm Booking'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function HistorySection({ appointments }) {
  const statusBadge = { CONFIRMED:'badge-success', COMPLETED:'badge-neutral', CANCELLED:'badge-danger', PENDING:'badge-warning', REJECTED:'badge-danger' }
  return (
    <div>
      <div className="page-header"><h2>🕒 Appointment History</h2><p>All your past and upcoming appointments.</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Agent</th><th>Date</th><th>Time</th><th>Reason</th><th>Mode</th><th>Status</th></tr></thead>
            <tbody>
              {appointments.map((a,i)=>(
                <tr key={i}>
                  <td style={{ fontWeight:600 }}>{a.agentName}</td>
                  <td>{a.date}</td><td>{a.time}</td>
                  <td style={{ textTransform:'capitalize' }}>{a.reason}</td>
                  <td>{a.mode}</td>
                  <td><span className={`badge ${statusBadge[a.status]||'badge-neutral'} badge-dot`} style={{ textTransform:'capitalize' }}>{a.status}</span></td>
                </tr>
              ))}
              {appointments.length === 0 && <tr><td colSpan="6" style={{ textAlign:'center', padding:'2rem' }}>No appointment history found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function NotifsSection({ notifications, onRead }) {
  const markRead = async (id) => {
    try {
      await notificationApi.markAsRead(id)
      onRead()
    } catch (err) {}
  }

  return (
    <div>
      <div className="page-header">
        <h2>🔔 Notifications</h2>
        <button className="btn btn-outline btn-sm">Mark All Read</button>
      </div>
      <div className="card">
        <div className="card-body">
          {notifications.map(n=>(
            <div key={n.id} className={`notif-item${!n.isRead?' notif-unread':''}`} style={{ marginBottom:'.5rem',padding:'.875rem',borderRadius:'var(--radius-md)',cursor:'pointer' }}
              onClick={()=>markRead(n.id)}>
              <div className={`notif-icon blue`}>🔔</div>
              <div className="notif-content" style={{ flex:1 }}>
                <div className="title">{n.title} {!n.isRead&&<span className="badge badge-primary" style={{ fontSize:'.5rem',marginLeft:'.375rem' }}>NEW</span>}</div>
                <div className="desc">{n.message}</div>
                <div className="time">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
          {notifications.length === 0 && <p style={{ textAlign:'center', padding:'2rem' }}>No notifications.</p>}
        </div>
      </div>
    </div>
  )
}

function ProfileSection({ toast, user }) {
  const [editing, setEditing] = useState(false)
  return (
    <div>
      <div className="page-header"><h2>👤 My Profile</h2><p>Manage your personal and account information.</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h4>Personal Information</h4>
            <button className="btn btn-outline btn-sm" onClick={()=>setEditing(!editing)}>{editing?'Cancel':'Edit'}</button>
          </div>
          <div className="card-body">
            <div style={{ display:'flex',alignItems:'center',gap:'1.25rem',marginBottom:'1.5rem',paddingBottom:'1.5rem',borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary-dark),var(--accent))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'1.5rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <div style={{ fontSize:'1.25rem',fontWeight:700 }}>{user?.firstName} {user?.lastName}</div>
                <div style={{ fontSize:'.875rem',color:'var(--text-muted)' }}>{user?.email}</div>
                <span className="badge badge-primary" style={{ marginTop:'.25rem' }}>User</span>
              </div>
            </div>
            {[
              ['First Name', user?.firstName],
              ['Last Name', user?.lastName],
              ['Email', user?.email],
              ['Phone', user?.phone || 'Not provided'],
              ['Role', user?.role],
              ['User ID', user?.userId || 'N/A']
            ].map(([l,v])=>(
              <div key={l} className="form-group">
                <label className="form-label">{l}</label>
                <input className="form-control" defaultValue={v} readOnly={!editing} style={{ background:editing?'white':'var(--grey-50)' }}/>
              </div>
            ))}
            {editing && <button className="btn btn-primary" onClick={()=>{setEditing(false);toast('Profile updated!','','success')}}>Save Changes</button>}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>Security</h4></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">Current Password</label><input type="password" className="form-control" placeholder="••••••••"/></div>
            <div className="form-group"><label className="form-label">New Password</label><input type="password" className="form-control" placeholder="••••••••"/></div>
            <div className="form-group"><label className="form-label">Confirm Password</label><input type="password" className="form-control" placeholder="••••••••"/></div>
            <button className="btn btn-primary" onClick={()=>toast('Password updated!','','success')}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'
import { appointmentApi, notificationApi } from '../utils/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useEffect } from 'react'

const SECTIONS = ['adash','pending','upcoming','ahistory','avail','customers','aprofile']

export default function AgentDash() {
  const [section, setSection] = useState('adash')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  
  const navigate = useNavigate()
  const toast = useToast()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/auth')
      return
    }
    fetchAgentData()
  }, [user])

  const fetchAgentData = async () => {
    try {
      setLoading(true)
      const agentId = user?.id || 1
      const resp = await appointmentApi.getAgentAppointments(agentId)
      setAppointments(resp?.data?.content || [])
    } catch (err) {
      console.error('Failed to fetch agent data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  if (loading && !user) return <div style={{ display:'flex',height:'100vh',alignItems:'center',justifyContent:'center' }}>Loading...</div>

  return (
    <div>
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <Link className="navbar-brand" to="/"><div className="navbar-logo-icon">AI</div>Insur<span className="brand-dot">AI</span></Link>
          <div style={{ display:'flex',alignItems:'center',gap:'.75rem' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.875rem',color:'var(--text-secondary)' }}>
              <div style={{ width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#006064,#00ACC1)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'.75rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              {user?.firstName} {user?.lastName}
            </div>
            <span className="badge badge-info">Agent</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-user">
              <div className="sidebar-avatar" style={{ background:'linear-gradient(135deg,#006064,#00ACC1)' }}>{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
              <div className="sidebar-user-info"><div className="name">{user?.firstName} {user?.lastName}</div><div className="role">Agent · {user?.company || 'InsurAI'}</div></div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-section-label">Overview</div>
            <div className={`sidebar-link${section==='adash'?' active':''}`} onClick={()=>setSection('adash')}><span className="icon">🏠</span>Dashboard</div>
            <div className="sidebar-section-label">Appointments</div>
            <div className={`sidebar-link${section==='pending'?' active':''}`} onClick={()=>setSection('pending')}><span className="icon">⏳</span>Pending Requests<span className="badge-count">4</span></div>
            <div className={`sidebar-link${section==='upcoming'?' active':''}`} onClick={()=>setSection('upcoming')}><span className="icon">📅</span>Upcoming</div>
            <div className={`sidebar-link${section==='ahistory'?' active':''}`} onClick={()=>setSection('ahistory')}><span className="icon">🕒</span>History</div>
            <div className="sidebar-section-label">Availability</div>
            <div className={`sidebar-link${section==='avail'?' active':''}`} onClick={()=>setSection('avail')}><span className="icon">🗓️</span>Set Availability</div>
            <div className="sidebar-section-label">Customers</div>
            <div className={`sidebar-link${section==='customers'?' active':''}`} onClick={()=>setSection('customers')}><span className="icon">👥</span>My Customers</div>
            <div className="sidebar-section-label">Account</div>
            <div className={`sidebar-link${section==='aprofile'?' active':''}`} onClick={()=>setSection('aprofile')}><span className="icon">👤</span>Profile</div>
            <div className="sidebar-link" onClick={handleLogout}><span className="icon">🚪</span>Sign Out</div>
          </nav>
        </aside>

        <main className="main-content">
          {section==='adash'    && <AgentOverview user={user} appointments={appointments} />}
          {section==='pending'  && <PendingSection toast={toast} appointments={appointments} refresh={fetchAgentData} />}
          {section==='upcoming' && <UpcomingSection toast={toast} appointments={appointments} refresh={fetchAgentData} />}
          {section==='ahistory' && <AHistorySection appointments={appointments} />}
          {section==='avail'    && <AvailSection toast={toast} />}
          {section==='customers'&& <CustomersSection toast={toast} />}
          {section==='aprofile' && <AProfileSection toast={toast} user={user} />}
        </main>
      </div>
    </div>
  )
}

const perfData = [
  {month:'Oct',value:18},{month:'Nov',value:22},{month:'Dec',value:15},{month:'Jan',value:20},{month:'Feb',value:19},{month:'Mar',value:24}
]

function AgentOverview({ user, appointments }) {
  const pending = appointments.filter(a => a.status === 'PENDING')
  const confirmedToday = appointments.filter(a => a.status === 'CONFIRMED')
  
  return (
    <div>
      <div className="page-header"><h2>Good Morning, {user?.firstName}! 🌟</h2><p>Your performance overview for today.</p></div>
      <div className="grid-4 mb-4">
        {[
          { icon:'📅', label:'Pending Requests', value: pending.length.toString(), color:'cyan',   change:'Action required' },
          { icon:'✅', label:"Today's Meetings",  value: confirmedToday.length.toString(), color:'green',  change:'↑ All confirmed' },
          { icon:'👥', label:'Active Customers',  value:'28',color:'blue',   change:'↑ 3 new this month' },
          { icon:'⭐', label:'Avg. Rating',        value:'4.9',color:'orange',change:'87 reviews' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change up">{s.change}</div></div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>📅 Today's Schedule</h4><span className="badge badge-primary">March 8</span></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
            {confirmedToday.length > 0 ? confirmedToday.map((s,i)=>(
              <div key={i} style={{ display:'flex',gap:'1rem',alignItems:'flex-start',padding:'.875rem',background:i===0?'var(--primary-50)':'var(--grey-50)',borderRadius:'var(--radius-md)',border:`1px solid ${i===0?'var(--primary-100)':'var(--border)'}` }}>
                <div style={{ textAlign:'center',minWidth:50 }}>
                  <div style={{ fontSize:'.75rem',color:i===0?'var(--primary)':'var(--grey-600)',fontWeight:700 }}>{s.time}</div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:'.9rem' }}>{s.userName} – {s.reason}</div>
                  <div style={{ fontSize:'.8125rem',color:'var(--text-muted)' }}>{s.mode}</div>
                </div>
                <span className="badge badge-success badge-dot">Confirmed</span>
              </div>
            )) : <p style={{ textAlign:'center', color:'var(--text-muted)' }}>No meetings today.</p>}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>📊 Monthly Performance</h4></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={perfData}>
                <XAxis dataKey="month" tick={{ fontSize:12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem',marginTop:'1rem' }}>
              <div style={{ padding:'.875rem',background:'var(--grey-50)',borderRadius:'var(--radius-md)',textAlign:'center' }}>
                <div style={{ fontSize:'1.25rem',fontWeight:800,color:'var(--primary)' }}>87%</div>
                <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Acceptance Rate</div>
              </div>
              <div style={{ padding:'.875rem',background:'var(--grey-50)',borderRadius:'var(--radius-md)',textAlign:'center' }}>
                <div style={{ fontSize:'1.25rem',fontWeight:800,color:'var(--success-light)' }}>24</div>
                <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Appts This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PendingSection({ toast, appointments, refresh }) {
  const reqs = appointments.filter(a => a.status === 'PENDING')

  const handleAction = async (id, action) => {
    try {
      if (action === 'accept') await appointmentApi.accept(id)
      else await appointmentApi.reject(id, 'Requested by agent')
      toast(action === 'accept' ? 'Confirmed' : 'Rejected', '', 'success')
      refresh()
    } catch (err) {
      toast('Error', 'Action failed', 'error')
    }
  }

  return (
    <div>
      <div className="page-header"><h2>⏳ Pending Requests</h2><p>Review and respond to appointment requests.</p></div>
      <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
        {reqs.map((r,i)=>(
          <div key={i} className="card" style={{ borderLeft:'4px solid var(--warning-light)' }}>
            <div className="card-body">
              <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem' }}>
                <div style={{ display:'flex',gap:'1rem',alignItems:'center' }}>
                  <div style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,var(--primary),var(--accent))',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,flexShrink:0 }}>
                    {r.userName[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:'1rem' }}>{r.userName}</div>
                    <div style={{ fontSize:'.8125rem',color:'var(--text-muted)' }}>Client</div>
                    <div style={{ fontSize:'.875rem',color:'var(--primary)',fontWeight:600,marginTop:'.25rem' }}>📅 {r.date} · {r.time} · {r.mode}</div>
                    <div style={{ fontSize:'.875rem',color:'var(--text-secondary)',marginTop:'.125rem' }}><strong>Reason:</strong> {r.reason}</div>
                  </div>
                </div>
                <div style={{ display:'flex',gap:'.75rem',alignItems:'center' }}>
                  <button className="btn btn-success btn-sm" onClick={()=>handleAction(r.id, 'accept')}>✓ Accept</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>handleAction(r.id, 'reject')}>✕ Reject</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {reqs.length === 0 && <div className="card"><div className="card-body text-center" style={{ padding:'3rem',color:'var(--text-muted)' }}>✅ No pending requests!</div></div>}
      </div>
    </div>
  )
}

function UpcomingSection({ toast, appointments, refresh }) {
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED')
  
  const handleComplete = async (id) => {
    try {
      await appointmentApi.complete(id)
      toast('Success', 'Appointment marked as completed', 'success')
      refresh()
    } catch (err) {
      toast('Error', 'Action failed', 'error')
    }
  }

  return (
    <div>
      <div className="page-header"><h2>📅 Upcoming Appointments</h2><p>All confirmed meetings for the next 30 days.</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Date & Time</th><th>Reason</th><th>Mode</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {confirmed.map((a,i)=>(
                <tr key={i}>
                  <td><div style={{ fontWeight:600 }}>{a.userName}</div><div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>Client</div></td>
                  <td>{a.date} · {a.time}</td><td>{a.reason}</td><td>{a.mode}</td>
                  <td><span className="badge badge-success badge-dot">Confirmed</span></td>
                  <td>
                    <div style={{ display:'flex',gap:'.5rem' }}>
                      <button className="btn btn-success btn-sm" onClick={()=>handleComplete(a.id)}>Complete</button>
                      <button className="btn btn-danger btn-sm">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
              {confirmed.length === 0 && <tr><td colSpan="6" style={{ textAlign:'center', padding:'2rem' }}>No upcoming appointments.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AHistorySection({ appointments }) {
  const history = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED' || a.status === 'REJECTED')
  const statusBadge = { COMPLETED:'badge-neutral', CANCELLED:'badge-danger', REJECTED:'badge-danger' }

  return (
    <div>
      <div className="page-header"><h2>🕒 Appointment History</h2><p>Record of all completed and cancelled appointments.</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Date</th><th>Reason</th><th>Status</th><th>Rating</th></tr></thead>
            <tbody>
              {history.map((a, i) => (
                <tr key={i}>
                  <td>{a.userName}</td><td>{a.date}</td><td style={{ textTransform:'capitalize' }}>{a.reason}</td>
                  <td><span className={`badge ${statusBadge[a.status]||'badge-neutral'} badge-dot`} style={{ textTransform:'capitalize' }}>{a.status}</span></td>
                  <td>{a.status === 'COMPLETED' ? '⭐⭐⭐⭐⭐ (5.0)' : '—'}</td>
                </tr>
              ))}
              {history.length === 0 && <tr><td colSpan="5" style={{ textAlign:'center', padding:'2rem' }}>No history found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AvailSection({ toast }) {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
  const [enabled, setEnabled] = useState([true,true,true,true,true,false,false])
  return (
    <div>
      <div className="page-header"><h2>🗓️ Set Availability</h2><p>Configure your available slots for appointment bookings.</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>Weekly Schedule</h4><button className="btn btn-primary btn-sm" onClick={()=>toast('Saved!','Availability updated.','success')}>Save</button></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.875rem' }}>
            {days.map((day,i)=>(
              <div key={day} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'.75rem',borderRadius:'var(--radius-md)',background:enabled[i]?'var(--primary-50)':'var(--grey-50)',border:`1px solid ${enabled[i]?'var(--primary-100)':'var(--border)'}` }}>
                <div style={{ display:'flex',alignItems:'center',gap:'.875rem' }}>
                  <input type="checkbox" checked={enabled[i]} style={{ accentColor:'var(--primary)',width:18,height:18 }} onChange={e=>setEnabled(prev=>{const n=[...prev];n[i]=e.target.checked;return n})} />
                  <span style={{ fontWeight:enabled[i]?600:400,color:enabled[i]?'var(--text-primary)':'var(--text-muted)' }}>{day}</span>
                </div>
                {enabled[i] ? (
                  <div style={{ display:'flex',gap:'.5rem',alignItems:'center' }}>
                    <input type="time" defaultValue={i<5?'09:00':'10:00'} style={{ border:'1px solid var(--border)',borderRadius:6,padding:'.25rem .5rem',fontSize:'.8125rem' }} />
                    <span style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>to</span>
                    <input type="time" defaultValue={i<5?'18:00':'14:00'} style={{ border:'1px solid var(--border)',borderRadius:6,padding:'.25rem .5rem',fontSize:'.8125rem' }} />
                  </div>
                ) : <span style={{ fontSize:'.8125rem',color:'var(--text-muted)' }}>Not Available</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>Block Time Off</h4></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">From Date</label><input type="date" className="form-control" /></div>
            <div className="form-group"><label className="form-label">To Date</label><input type="date" className="form-control" /></div>
            <div className="form-group">
              <label className="form-label">Reason</label>
              <select className="form-control"><option>Personal Leave</option><option>Training</option><option>Office Holiday</option><option>Medical Leave</option></select>
            </div>
            <button className="btn btn-primary w-full" onClick={()=>toast('Dates blocked!','Marked as unavailable.','success')}>Block These Dates</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomersSection({ toast }) {
  const customers = [
    { name:'Ravi Kumar', dept:'IT', plan:'Premium', cov:'₹7L', renewal:'Jul 2026', status:'active' },
    { name:'Meena Patel', dept:'Finance', plan:'Basic', cov:'₹3L', renewal:'May 2026', status:'renewal' },
    { name:'Suresh Iyer', dept:'HR', plan:'Premium', cov:'₹7L', renewal:'Aug 2026', status:'active' },
    { name:'Kavita Desai', dept:'Legal', plan:'Enterprise', cov:'₹20L', renewal:'Sep 2026', status:'active' },
    { name:'Rahul Verma', dept:'Sales', plan:'Basic', cov:'₹3L', renewal:'Apr 2026', status:'renewal' },
  ]
  return (
    <div>
      <div className="page-header"><h2>👥 My Customers</h2><p>View and manage your assigned customer portfolio.</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Dept</th><th>Plan</th><th>Coverage</th><th>Renewal</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {customers.map(c=>(
                <tr key={c.name}>
                  <td style={{ fontWeight:600 }}>{c.name}</td>
                  <td>{c.dept}</td>
                  <td><span className="badge badge-primary">{c.plan}</span></td>
                  <td style={{ fontWeight:700,color:'var(--primary)' }}>{c.cov}</td>
                  <td>{c.renewal}</td>
                  <td><span className={`badge ${c.status==='renewal'?'badge-warning':'badge-success'} badge-dot`} style={{ textTransform:'capitalize' }}>{c.status==='renewal'?'Renewal Due':'Active'}</span></td>
                  <td>
                    <div style={{ display:'flex',gap:'.5rem' }}>
                      <button className="btn btn-outline btn-sm" onClick={()=>toast('Booking...','','info')}>Book</button>
                      <button className="btn btn-outline btn-sm" onClick={()=>toast('Profile...','','info')}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AProfileSection({ toast, user }) {
  return (
    <div>
      <div className="page-header"><h2>👤 Agent Profile</h2><p>Manage your professional profile and credentials.</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>Professional Information</h4><button className="btn btn-outline btn-sm" onClick={()=>toast('Edit mode','','info')}>Edit</button></div>
          <div className="card-body">
            <div style={{ display:'flex',alignItems:'center',gap:'1.25rem',marginBottom:'1.5rem',paddingBottom:'1.5rem',borderBottom:'1px solid var(--border)' }}>
              <div style={{ width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,#006064,#00ACC1)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:800,fontSize:'1.5rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div>
                <div style={{ fontSize:'1.25rem',fontWeight:700 }}>{user?.firstName} {user?.lastName}</div>
                <div style={{ fontSize:'.875rem',color:'var(--text-muted)' }}>{user?.email}</div>
                <span className="badge badge-info" style={{ marginTop:'.25rem' }}>Senior Agent</span>
              </div>
            </div>
            {[['Company', user?.company || 'InsurAI'],['License No.', user?.licenseNo || 'LIC-2024-AGT-08741'],['Specialization', user?.specialization || 'Health & Life Insurance'],['Experience', (user?.experience || '8') + ' Years']].map(([l,v])=>(
              <div key={l} className="form-group"><label className="form-label">{l}</label><input className="form-control" defaultValue={v} readOnly style={{ background:'var(--grey-50)' }}/></div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>Performance Summary</h4></div>
          <div className="card-body">
            <div style={{ padding:'1rem',background:'var(--primary-50)',borderRadius:'var(--radius-md)',marginBottom:'1.25rem' }}>
              <div style={{ fontSize:'2rem',fontWeight:800,color:'var(--primary)' }}>4.9 / 5.0 ⭐</div>
              <div style={{ fontSize:'.875rem',color:'var(--text-muted)',marginTop:'.25rem' }}>Average rating from 87 customer reviews</div>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem' }}>
              {[['287','Total Appts','var(--success-light)'],['28','Active Clients','var(--primary)'],['87%','Accept Rate','var(--warning-light)'],['8 yrs','Experience','var(--accent)']].map(([v,l,c])=>(
                <div key={l} style={{ padding:'.875rem',background:'var(--grey-50)',borderRadius:'var(--radius-md)',textAlign:'center' }}>
                  <div style={{ fontSize:'1.5rem',fontWeight:800,color:c }}>{v}</div>
                  <div style={{ fontSize:'.75rem',color:'var(--text-muted)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

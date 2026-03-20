import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'
import { planApi, agentApi, appointmentApi } from '../utils/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useEffect } from 'react'

const usersData = [
  { name:'Ravi Kumar', email:'ravi.kumar@techcorp.com', dept:'IT', plan:'Premium', joined:'Jan 15, 2023', status:'active' },
  { name:'Meena Patel', email:'meena.patel@techcorp.com', dept:'Finance', plan:'Basic', joined:'Mar 2, 2023', status:'active' },
  { name:'Suresh Iyer', email:'suresh.iyer@techcorp.com', dept:'HR', plan:'Premium', joined:'Feb 10, 2023', status:'active' },
  { name:'Kavita Desai', email:'kavita.desai@techcorp.com', dept:'Legal', plan:'Enterprise', joined:'Apr 5, 2022', status:'active' },
  { name:'Rahul Verma', email:'rahul.verma@techcorp.com', dept:'Sales', plan:'Basic', joined:'Jun 18, 2023', status:'active' },
  { name:'Priya Sharma', email:'priya.sharma@techcorp.com', dept:'Marketing', plan:'Premium', joined:'Aug 22, 2022', status:'inactive' },
]

const agentsData = [
  { name:'Anita Singh', company:'LIC Corp', spec:'Health & Life', clients:28, rating:4.9, status:'active' },
  { name:'Rajesh Mehta', company:'InsurTrust', spec:'Corporate Plans', clients:21, rating:4.7, status:'active' },
  { name:'Priya Nair', company:'SafeGuard', spec:'Group Insurance', clients:19, rating:4.8, status:'active' },
  { name:'Arjun Patel', company:'MaxLife', spec:'Life & Term', clients:15, rating:4.6, status:'active' },
  { name:'Vikram Shah', company:'TrustShield', spec:'Accidental Cover', clients:11, rating:4.5, status:'inactive' },
]

const allAppts = [
  { emp:'Ravi Kumar', agent:'Anita Singh', date:'Mar 9 · 10:30 AM', reason:'Coverage upgrade', mode:'🎥', status:'confirmed' },
  { emp:'Meena Patel', agent:'Anita Singh', date:'Mar 9 · 2:00 PM', reason:'New enrollment', mode:'📞', status:'confirmed' },
  { emp:'Arjun Joshi', agent:'Rajesh Mehta', date:'Mar 10 · 11:00 AM', reason:'Plan query', mode:'🎥', status:'pending' },
  { emp:'Nisha Gupta', agent:'Priya Nair', date:'Mar 11 · 3:00 PM', reason:'Claims help', mode:'🏢', status:'rescheduled' },
  { emp:'Kiran Bhat', agent:'Anita Singh', date:'Mar 12 · 11:00 AM', reason:'Enterprise upgrade', mode:'🎥', status:'pending' },
  { emp:'Rahul Verma', agent:'Rajesh Mehta', date:'Mar 14 · 10:00 AM', reason:'Policy review', mode:'🎥', status:'cancelled' },
]

const plansData = [
  { name:'Basic Health', cat:'Health', premium:'₹2,499', cov:'₹3,00,000', subs:342, active:true },
  { name:'Premium Health', cat:'Health', premium:'₹4,999', cov:'₹7,00,000', subs:601, active:true, featured:true },
  { name:'Enterprise Plan', cat:'Health', premium:'₹8,999', cov:'₹20,00,000', subs:189, active:true },
  { name:'Group Life', cat:'Life', premium:'₹1,999', cov:'₹25,00,000', subs:875, active:true },
  { name:'Accidental Cover', cat:'Accident', premium:'₹999', cov:'₹5,00,000', subs:421, active:true },
  { name:'Family Floater', cat:'Addon', premium:'₹2,199', cov:'₹5,00,000', subs:234, active:true },
]

const monthlyData = [
  {month:'Sep',value:180},{month:'Oct',value:210},{month:'Nov',value:195},{month:'Dec',value:165},{month:'Jan',value:220},{month:'Feb',value:248},{month:'Mar',value:284}
]

const pieData = [
  { name:'Premium Health', value:601, color:'#1565C0' },
  { name:'Group Life', value:875, color:'#43A047' },
  { name:'Basic Health', value:342, color:'#00897B' },
  { name:'Enterprise', value:189, color:'#7B1FA2' },
  { name:'Others', value:655, color:'#90A4AE' },
]

const templates = {
  renewal: { subject:'Policy Renewal Reminder – Action Required', msg:'Dear User,\n\nYour insurance plan is expiring within the next 30 days. Please log in to InsurAI and confirm your renewal.\n\nRegards,\nInsurAI Team' },
  appt: { subject:'Appointment Confirmation', msg:'Dear User,\n\nYour appointment has been confirmed. Please check your dashboard for full details.\n\nRegards,\nInsurAI Team' },
  welcome: { subject:'Welcome to InsurAI!', msg:'Dear User,\n\nWelcome to InsurAI – your corporate insurance management platform! Log in to explore your benefits.\n\nRegards,\nInsurAI Team' },
}

const statusBadge = { confirmed:'badge-success', pending:'badge-warning', cancelled:'badge-danger', rescheduled:'badge-info' }

export default function AdminDash() {
  const [section, setSection] = useState('analytics')
  const [users, setUsers] = useState([])
  const [agents, setAgents] = useState([])
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const toast = useToast()
  const { user, logout } = useAuth()
  
  const [addUserOpen, setAddUserOpen]   = useState(false)
  const [addAgentOpen, setAddAgentOpen] = useState(false)
  const [addPlanOpen, setAddPlanOpen]   = useState(false)

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    fetchAdminData()
  }, [user])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      const [aData, pData] = await Promise.all([
        agentApi.getAgents(),
        planApi.getPlans(),
      ])
      setAgents(aData?.data || agentsData.map((a,i) => ({ id: i+1, firstName: a.name.split(' ')[0], lastName: a.name.split(' ')[1] || '', company: a.company, specialization: a.spec, isAvailable: a.status==='active' })))
      setPlans(pData?.data || plansData.map((p,i) => ({ id: i+1, name: p.name, category: p.cat, premium: parseInt(p.premium.replace(/[₹,]/g,'')), coverageAmount: parseInt(p.cov.replace(/[₹,]/g,'')), isActive: p.active, subscribers: p.subs })))
    } catch (err) {
      console.error(err)
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
              <div style={{ width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#4A148C,#7B1FA2)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'.75rem' }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              {user?.firstName} {user?.lastName}
            </div>
            <span className="badge badge-danger">Admin</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-user">
              <div className="sidebar-avatar" style={{ background:'linear-gradient(135deg,#4A148C,#7B1FA2)' }}>SA</div>
              <div className="sidebar-user-info"><div className="name">Super Admin</div><div className="role">System Administrator</div></div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="sidebar-section-label">Overview</div>
            {[['analytics','📊','Analytics'],['users','👥','User Management'],['agents','🧑‍💼','Agent Management'],['adminplans','📋','Plan Management'],['allappts','📅','All Appointments'],['adminnotif','🔔','Notifications'],['settings','⚙️','Settings']].map(([id,icon,label])=>(
              <div key={id} className={`sidebar-link${section===id?' active':''}`} onClick={()=>setSection(id)}>
                <span className="icon">{icon}</span>{label}
              </div>
            ))}
            <div className="sidebar-link" onClick={handleLogout}><span className="icon">🚪</span>Sign Out</div>
          </nav>
        </aside>

        <main className="main-content">
          {section==='analytics'  && <AnalyticsSection agents={agents} plans={plans} />}
          {section==='users'      && <UsersSection toast={toast} onAdd={()=>setAddUserOpen(true)} />}
          {section==='agents'     && <AgentsSection toast={toast} agents={agents} onAdd={()=>setAddAgentOpen(true)} />}
          {section==='adminplans' && <AdminPlans toast={toast} plans={plans} onAdd={()=>setAddPlanOpen(true)} />}
          {section==='allappts'   && <AllApptsSection toast={toast} />}
          {section==='adminnotif' && <AdminNotifSection toast={toast} />}
          {section==='settings'   && <SettingsSection toast={toast} />}
        </main>
      </div>

      {/* Add User Modal */}
      {addUserOpen && (
        <div className="modal-overlay" onClick={()=>setAddUserOpen(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header"><h4>Add New User</h4><button className="modal-close" onClick={()=>setAddUserOpen(false)}>✕</button></div>
            <div className="modal-body">
              <div className="form-row"><div className="form-group"><label className="form-label">First Name</label><input className="form-control" placeholder="First name"/></div><div className="form-group"><label className="form-label">Last Name</label><input className="form-control" placeholder="Last name"/></div></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-control" placeholder="user@company.com"/></div>
              <div className="form-group"><label className="form-label">Department</label><select className="form-control"><option>IT</option><option>Finance</option><option>HR</option><option>Operations</option></select></div>
              <div className="form-group"><label className="form-label">Assign Plan</label><select className="form-control"><option>Basic Health Plan</option><option>Premium Health Plan</option><option>Enterprise Plan</option></select></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setAddUserOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{setAddUserOpen(false);toast('User Added!','Account created and welcome email sent.','success')}}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AnalyticsSection() {
  return (
    <div>
      <div className="page-header"><h2>📊 Admin Analytics Dashboard</h2><p>Real-time overview of the entire InsurAI platform.</p></div>
      <div className="grid-4 mb-4">
        {[
          { icon:'👥', label:'Total Users', value:'1,247', color:'blue',   change:'↑ +42 this month' },
          { icon:'🧑‍💼', label:'Active Agents',    value:'38',    color:'cyan',   change:'↑ +3 this month' },
          { icon:'📅', label:'Appointments (MTD)',value:'284',  color:'green',  change:'↑ 18% vs last month' },
          { icon:'📋', label:'Active Plans',      value:'8',    color:'orange', change:'↑ 2 new plans' },
        ].map(s=>(
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change up">{s.change}</div></div>
          </div>
        ))}
      </div>
      <div className="grid-2 mb-4">
        <div className="card">
          <div className="card-header"><h4>📈 Monthly Appointment Trend</h4><span className="badge badge-primary">2025–26</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize:12 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>🍩 Plan Distribution</h4></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Legend iconType="circle" iconSize={10} formatter={(v)=><span style={{ fontSize:'.8rem' }}>{v}</span>} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>📅 Recent Appointments</h4></div>
          <div className="card-body" style={{ padding:0 }}>
            <table style={{ width:'100%' }}>
              <thead><tr><th>User</th><th>Agent</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {allAppts.slice(0,4).map((a,i)=>(
                  <tr key={i}><td>{a.emp}</td><td style={{ fontSize:'.8125rem' }}>{a.agent}</td><td style={{ fontSize:'.8125rem' }}>{a.date.split(' · ')[0]}</td>
                    <td><span className={`badge ${statusBadge[a.status]||'badge-neutral'} badge-dot`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>⚠️ System Alerts</h4></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
            {[
              { bg:'#FFF3E0', border:'#FFE0B2', icon:'⚠️', title:'6 Plans Expiring', desc:'6 users have plans expiring within 30 days.', tc:'#E65100' },
              { bg:'#E8F5E9', border:'#C8E6C9', icon:'✅', title:'System Healthy', desc:'All services running normally. Uptime: 99.97%', tc:'#2E7D32' },
              { bg:'var(--primary-50)', border:'var(--primary-100)', icon:'ℹ️', title:'New Agent Applications', desc:'3 new agent applications pending review.', tc:'var(--primary)' },
            ].map((a,i)=>(
              <div key={i} style={{ padding:'.875rem',background:a.bg,borderRadius:'var(--radius-md)',border:`1px solid ${a.border}`,display:'flex',gap:'.75rem' }}>
                <span>{a.icon}</span>
                <div><div style={{ fontWeight:700,fontSize:'.875rem',color:a.tc }}>{a.title}</div><div style={{ fontSize:'.8125rem',opacity:.8 }}>{a.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersSection({ toast, onAdd }) {
  return (
    <div>
      <div className="page-header"><h2>👥 User Management</h2><p>Add, edit, and manage all users and their accounts.</p></div>
      <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:'1.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add User</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Dept</th><th>Plan</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {usersData.map(u=>(
                <tr key={u.email}>
                  <td style={{ fontWeight:600 }}>{u.name}</td>
                  <td style={{ fontSize:'.8125rem' }}>{u.email}</td>
                  <td>{u.dept}</td>
                  <td><span className="badge badge-primary">{u.plan}</span></td>
                  <td style={{ fontSize:'.8125rem' }}>{u.joined}</td>
                  <td><span className={`badge ${u.status==='active'?'badge-success':'badge-neutral'} badge-dot`}>{u.status}</span></td>
                  <td>
                    <div style={{ display:'flex',gap:'.5rem' }}>
                      <button className="btn btn-outline btn-sm" onClick={()=>toast('Edit User','','info')}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>toast('User deleted',u.name+' removed.','error')}>Del</button>
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

function AgentsSection({ toast, agents, onAdd }) {
  return (
    <div>
      <div className="page-header"><h2>🧑‍💼 Agent Management</h2><p>Manage insurance agents, verify credentials, and track performance.</p></div>
      <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:'1.5rem' }}>
        <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Agent</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Agent</th><th>Company</th><th>Specialization</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {agents.map(a=>(
                <tr key={a.id}>
                  <td style={{ fontWeight:600 }}>{a.firstName} {a.lastName}</td>
                  <td>{a.company}</td><td>{a.specialization}</td>
                  <td><span className={`badge ${a.isAvailable?'badge-success':'badge-neutral'} badge-dot`}>{a.isAvailable?'Active':'Inactive'}</span></td>
                  <td>
                    <div style={{ display:'flex',gap:'.5rem' }}>
                      <button className="btn btn-outline btn-sm">Edit</button>
                      <button className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
              {agents.length === 0 && <tr><td colSpan="5" style={{ textAlign:'center', padding:'2rem' }}>No agents found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminPlans({ toast, plans, onAdd }) {
  return (
    <div>
      <div className="page-header"><h2>📋 Plan Management</h2><p>Create, edit, and manage all available corporate insurance plans.</p></div>
      <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:'1.5rem' }}>
        <button className="btn btn-primary" onClick={onAdd}>+ Create New Plan</button>
      </div>
      <div className="grid-3">
        {plans.map(p=>(
          <div key={p.id} className="card" style={{ borderTop:`3px solid ${p.isFeatured?'var(--primary)':'var(--grey-200)'}` }}>
            <div className="card-header"><h4 style={{ fontSize:'.9375rem' }}>{p.name}</h4><span className="badge badge-primary">{p.category}</span></div>
            <div className="card-body">
              {[['Premium', '₹'+p.premium,'var(--primary)'],['Coverage', '₹'+p.coverageAmount.toLocaleString(),'']].map(([l,v,c])=>(
                <div key={l} style={{ display:'flex',justifyContent:'space-between',marginBottom:'.75rem' }}>
                  <span style={{ color:'var(--text-muted)',fontSize:'.875rem' }}>{l}</span>
                  <span style={{ fontWeight:700,color:c||'var(--text-primary)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex',gap:'.5rem' }}>
                <button className="btn btn-outline btn-sm" style={{ flex:1 }}>Edit</button>
                <button className="btn btn-danger btn-sm">Deactivate</button>
              </div>
            </div>
          </div>
        ))}
        {plans.length === 0 && <p style={{ gridColumn:'1/4',textAlign:'center' }}>No plans found.</p>}
      </div>
    </div>
  )
}

function AllApptsSection({ toast }) {
  return (
    <div>
      <div className="page-header"><h2>📅 All Appointments</h2><p>View, filter, and manage all appointments across the platform.</p></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Agent</th><th>Date & Time</th><th>Reason</th><th>Mode</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {allAppts.map((a,i)=>(
                <tr key={i}>
                  <td style={{ fontWeight:600 }}>{a.emp}</td>
                  <td>{a.agent}</td><td style={{ fontSize:'.8125rem' }}>{a.date}</td>
                  <td>{a.reason}</td><td>{a.mode}</td>
                  <td><span className={`badge ${statusBadge[a.status]||'badge-neutral'} badge-dot`} style={{ textTransform:'capitalize' }}>{a.status}</span></td>
                  <td><button className="btn btn-danger btn-sm" onClick={()=>toast('Cancelled','Notification sent to both parties.','error')}>Cancel</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AdminNotifSection({ toast }) {
  const [subject, setSubject] = useState('')
  const [msg, setMsg]         = useState('')
  function loadTemplate(key) {
    if (templates[key]) { setSubject(templates[key].subject); setMsg(templates[key].msg) }
  }
  return (
    <div>
      <div className="page-header"><h2>🔔 Notification Manager</h2><p>Send bulk notifications and view notification history.</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>📧 Send Notification</h4></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">Recipients</label><select className="form-control"><option>All Users</option><option>Specific Department</option><option>Users with Expiring Plans</option><option>All Agents</option></select></div>
            <div className="form-group"><label className="form-label">Template</label>
              <select className="form-control" onChange={e=>loadTemplate(e.target.value)}>
                <option value="">Custom message</option><option value="renewal">Plan Renewal Reminder</option><option value="appt">Appointment Confirmation</option><option value="welcome">Welcome Message</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Subject</label><input className="form-control" placeholder="Notification subject..." value={subject} onChange={e=>setSubject(e.target.value)}/></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-control" rows={5} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type your message..."/></div>
            <button className="btn btn-primary w-full" onClick={()=>toast('Sent!','Delivered to all selected recipients.','success')}>🚀 Send Notification</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>📨 Recent Sent</h4></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
            {[
              { color:'blue', title:'Plan Renewal Reminder', desc:'Sent to 42 users with plans expiring next month', time:'Today, 9:00 AM · Email + SMS' },
              { color:'green', title:'Appointment Confirmation Batch', desc:'Sent to 18 users and 6 agents', time:'Yesterday, 3:45 PM · Email' },
              { color:'orange', title:'New Plan Announcement', desc:'Enterprise International Plan launch – 1,247 users', time:'Mar 5, 2026 · Email + In-App' },
            ].map((n,i)=>(
              <div key={i} className="notif-item">
                <div className={`notif-icon ${n.color}`}>📧</div>
                <div className="notif-content"><div className="title">{n.title}</div><div className="desc">{n.desc}</div><div className="time">{n.time}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsSection({ toast }) {
  return (
    <div>
      <div className="page-header"><h2>⚙️ System Settings</h2><p>Configure platform-wide settings and integrations.</p></div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><h4>General Settings</h4></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">Platform Name</label><input className="form-control" defaultValue="InsurAI Corporate Platform"/></div>
            <div className="form-group"><label className="form-label">Admin Email</label><input type="email" className="form-control" defaultValue="admin@insurai.com"/></div>
            <div className="form-group"><label className="form-label">Timezone</label><select className="form-control"><option>Asia/Kolkata (IST)</option><option>UTC</option></select></div>
            <button className="btn btn-primary" onClick={()=>toast('Settings saved!','','success')}>Save Changes</button>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h4>Integrations</h4></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
            {[['📧 Email (SMTP)', 'smtp.gmail.com · Configured'],['📱 SMS (Twilio)', 'API Configured · India'],['🤖 AI Voice API', 'OpenAI Whisper · Connected'],['💾 Database (MySQL)', 'localhost:3306 · insurai_db']].map(([t,d])=>(
              <div key={t} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1rem',border:'1px solid var(--border)',borderRadius:'var(--radius-md)' }}>
                <div><div style={{ fontWeight:700 }}>{t}</div><div style={{ fontSize:'.8125rem',color:'var(--text-muted)' }}>{d}</div></div>
                <span className="badge badge-success badge-dot">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import { useAuth } from '../context/AuthContext'

function PasswordStrength({ password }) {
  const checks = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/]
  const score = checks.filter(r => r.test(password)).length
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e']
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  if (!password) return null
  return (
    <div style={{ marginTop: '.375rem' }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i <= score ? colors[score] : 'var(--grey-200)',
            transition: 'background .3s'
          }} />
        ))}
      </div>
      {score > 0 && <div style={{ fontSize: '.75rem', color: colors[score], fontWeight: 700, marginTop: '.25rem' }}>{labels[score]}</div>}
    </div>
  )
}

export default function AuthPage() {
  const [tab, setTab]         = useState('login')          // login | register | forgot
  const [role, setRole]       = useState('USER')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [loading, setLoading] = useState(false)
  const nav   = useNavigate()
  const toast = useToast()
  const { login, register: signUp } = useAuth()

  function demoLogin(r) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast('Welcome! 👋', `Logged in as ${r}`, 'success')
      if (r === 'User') nav('/user')
      else if (r === 'Agent') nav('/agent')
      else nav('/admin')
    }, 900)
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) return toast('Missing fields', 'Please fill in all fields', 'warning')
    setLoading(true)
    try {
      const data = await login({ email, password })
      toast('Login successful!', `Welcome back, ${data.firstName}`, 'success')
      if (data.role === 'ADMIN') nav('/admin')
      else if (data.role === 'AGENT') nav('/agent')
      else nav('/user')
    } catch (err) {
      toast('Login failed', err.message || 'Invalid credentials', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) return toast('Missing fields', 'Please fill in all fields', 'warning')
    setLoading(true)
    try {
      await signUp({ firstName, lastName, email, password, role, phone: '' })
      toast('Account created!', 'Please verify your email to continue', 'success')
      setTab('login')
    } catch (err) {
      toast('Registration failed', err.message || 'Could not create account', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleForgot(e) {
    e.preventDefault()
    if (!email) return toast('Enter email', 'Please enter your email address', 'warning')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast('Email sent!', `Reset link sent to ${email}`, 'success')
      setTab('login')
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: 'linear-gradient(160deg, #0D47A1 0%, #1565C0 50%, #0097A7 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* BG circles */}
        {[[120,-50,'rgba(255,255,255,.04)'],[220,60,'rgba(255,255,255,.03)'],[80,260,'rgba(0,150,136,.15)']].map(([w,t,bg],i)=>(
          <div key={i} style={{
            position:'absolute',width:w,height:w,borderRadius:'50%',
            background:bg,top:t,right:-w/2,pointerEvents:'none'
          }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 360, width: '100%' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', marginBottom: '3rem' }}>
            <div style={{ width:38,height:38,borderRadius:8,background:'rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,fontSize:'.75rem' }}>AI</div>
            <span style={{ color:'white',fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'1.375rem' }}>InsurAI</span>
          </div>
          <h2 style={{ color:'white',marginBottom:'1rem' }}>Corporate Insurance<br/>Made Intelligent</h2>
          <p style={{ color:'rgba(255,255,255,.75)',marginBottom:'2rem',lineHeight:1.75,fontSize:'.9375rem' }}>
            Manage user benefits, book agent appointments, and get AI-powered answers — all in one place.
          </p>
          {/* Feature dots */}
          {['🔐 JWT-secured role-based access','🎤 Voice AI query assistant','📅 Smart appointment scheduling','🔔 Real-time notifications'].map(f=>(
            <div key={f} style={{ display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'.75rem' }}>
              <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--accent-light)',flexShrink:0 }}/>
              <span style={{ color:'rgba(255,255,255,.8)',fontSize:'.875rem' }}>{f}</span>
            </div>
          ))}
          {/* Demo Buttons */}
          <div style={{ marginTop:'2.5rem',paddingTop:'2rem',borderTop:'1px solid rgba(255,255,255,.15)' }}>
            <div style={{ color:'rgba(255,255,255,.6)',fontSize:'.75rem',fontWeight:700,marginBottom:'.875rem',textTransform:'uppercase',letterSpacing:'.07em' }}>Quick Demo Access</div>
            <div style={{ display:'flex',gap:'.625rem',flexWrap:'wrap' }}>
              {['User','Agent','Admin'].map(r=>(
                <button key={r} className="btn btn-sm"
                  style={{ background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.25)',color:'white' }}
                  onClick={() => demoLogin(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width:500,display:'flex',flexDirection:'column',justifyContent:'center',padding:'3rem 2.5rem',background:'white',overflowY:'auto' }}>
        {/* Tabs */}
        {tab !== 'forgot' && (
          <div style={{ display:'flex',gap:0,background:'var(--grey-100)',borderRadius:'var(--radius-md)',padding:4,marginBottom:'2rem' }}>
            {['login','register'].map(t=>(
              <button key={t} onClick={() => setTab(t)}
                className="btn" style={{
                  flex:1, background: tab===t ? 'white' : 'transparent',
                  border:'none', boxShadow: tab===t ? 'var(--shadow-sm)' : 'none',
                  color: tab===t ? 'var(--primary)' : 'var(--text-muted)',
                  borderRadius:'var(--radius-sm)'
                }}>
                {t === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>
        )}

        {/* Login Form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin}>
            <h3 style={{ marginBottom:'.375rem' }}>Welcome back 👋</h3>
            <p style={{ fontSize:'.875rem', marginBottom:'1.75rem' }}>Sign in to your InsurAI account</p>

            <div className="form-group">
              <label className="form-label">Email address <span className="required">*</span></label>
              <input className="form-control" type="email" placeholder="you@company.com"
                     value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <input className="form-control" type="password" placeholder="••••••••"
                     value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem' }}>
              <label style={{ display:'flex',gap:'.5rem',alignItems:'center',cursor:'pointer',fontSize:'.875rem' }}>
                <input type="checkbox" style={{ accentColor:'var(--primary)' }} /> Remember me
              </label>
              <button type="button" onClick={()=>setTab('forgot')}
                style={{ background:'none',border:'none',color:'var(--primary)',cursor:'pointer',fontWeight:600,fontSize:'.875rem' }}>
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
              {loading ? '⏳ Signing in...' : '→ Sign In'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === 'register' && (
          <form onSubmit={handleRegister}>
            <h3 style={{ marginBottom:'.375rem' }}>Create Account</h3>
            <p style={{ fontSize:'.875rem', marginBottom:'1.75rem' }}>Join InsurAI in minutes</p>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name <span className="required">*</span></label>
                <input className="form-control" placeholder="John" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name <span className="required">*</span></label>
                <input className="form-control" placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email <span className="required">*</span></label>
              <input className="form-control" type="email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginBottom:'.5rem' }}>
              <label className="form-label">Password <span className="required">*</span></label>
              <input className="form-control" type="password" placeholder="Min 8 chars, 1 uppercase, 1 number"
                     value={password} onChange={e=>setPassword(e.target.value)} required />
              <PasswordStrength password={password} />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <div style={{ display:'flex',gap:1,background:'var(--grey-100)',borderRadius:'var(--radius-md)',padding:3 }}>
                {['USER','AGENT'].map(r=>(
                  <button type="button" key={r} onClick={()=>setRole(r)}
                    className="btn" style={{
                      flex:1, background: role===r ? 'white' : 'transparent',
                      border:'none', boxShadow: role===r ? 'var(--shadow-sm)' : 'none',
                      color: role===r ? 'var(--primary)' : 'var(--text-muted)',
                      borderRadius:'var(--radius-sm)', fontSize:'.875rem'
                    }}>
                    {r === 'USER' ? '👤 User' : '🧑‍💼 Agent'}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading} style={{ marginTop:'.75rem' }}>
              {loading ? '⏳ Creating account...' : '🚀 Create Account'}
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {tab === 'forgot' && (
          <form onSubmit={handleForgot}>
            <button type="button" onClick={()=>setTab('login')}
              style={{ background:'none',border:'none',color:'var(--text-muted)',cursor:'pointer',fontSize:'.875rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'.375rem' }}>
              ← Back to login
            </button>
            <h3 style={{ marginBottom:'.375rem' }}>Reset Password 🔑</h3>
            <p style={{ fontSize:'.875rem', marginBottom:'1.75rem' }}>Enter your email and we'll send a reset link.</p>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-control" type="email" placeholder="you@company.com"
                     value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}>
              {loading ? '⏳ Sending...' : '📧 Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

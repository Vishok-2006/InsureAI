import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const features = [
  { icon: '🔐', title: 'JWT Authentication', desc: 'Role-based access control for Users, Agents, and Admins with secure session management.' },
  { icon: '🎤', title: 'Voice AI Assistant', desc: 'Ask questions in natural language using our AI-powered voice recognition technology.' },
  { icon: '📅', title: 'Smart Scheduling', desc: 'Book appointments with insurance agents using our conflict-free multi-step booking wizard.' },
  { icon: '📋', title: 'Plan Management', desc: 'Browse and compare corporate insurance plans with full feature details and pricing.' },
  { icon: '🔔', title: 'Smart Notifications', desc: 'Get real-time Email and SMS alerts for appointments, renewals, and policy updates.' },
  { icon: '📊', title: 'Admin Analytics', desc: 'Powerful dashboard with charts, KPIs, and usage statistics for administrators.' },
]

const steps = [
  { num: '01', title: 'Register & Verify', desc: 'Sign up with company email, verify your account, and get instant access to the platform.' },
  { num: '02', title: 'Browse Your Plan', desc: 'View your assigned insurance plan with coverage details, benefits, and renewal dates.' },
  { num: '03', title: 'Connect & Ask AI', desc: 'Book appointments with agents or use the Voice AI to get instant answers to your queries.' },
]

const stats = [
  { value: '1,200+', label: 'Users Covered' },
  { value: '38',     label: 'Insurance Agents' },
  { value: '₹20L',   label: 'Max Coverage' },
  { value: '4.9★',   label: 'Avg. Agent Rating' },
]

const plans = [
  { name: 'Basic', price: '₹2,499', coverage: '₹3,00,000', features: ['✓ Hospitalization', '✓ Emergency cover', '✓ 20 OPD visits', '✓ AI Support'] },
  { name: 'Premium', price: '₹4,999', coverage: '₹7,00,000', features: ['✓ All Basic benefits', '✓ Dental & Vision', '✓ 50 OPD visits', '✓ Family add-on'], featured: true },
  { name: 'Enterprise', price: '₹8,999', coverage: '₹20,00,000', features: ['✓ Unlimited coverage', '✓ International cover', '✓ Full family plan', '✓ Dedicated agent'] },
]

const clients = ['TechCorp India', 'BuildWave Ltd', 'Finova Solutions', 'AeroSystems Pvt', 'MedProtech']

export default function HomePage() {
  return (
    <div>
      <Navbar variant="hero" />

      {/* Hero */}
      <div className="hero" style={{ marginTop: 'var(--nav-height)' }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">🛡️ AI-Powered Insurance Platform – 2026</div>
            <h1>AI-Powered Corporate<br />Insurance Management</h1>
            <p>InsurAI automates user benefits, appointment scheduling, and insurance queries for enterprise teams — all in one intelligent platform.</p>
            <div className="hero-actions">
              <Link to="/auth" className="btn btn-white btn-lg">🚀 Get Started Free</Link>
              <Link to="/plans" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1.5px solid rgba(255,255,255,.3)' }}>
                Browse Plans →
              </Link>
            </div>
            <div className="hero-stats">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="hero-stat-value">{s.value}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div style={{ background: 'var(--grey-50)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', overflowX: 'auto', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '.8125rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}>Trusted by</span>
            {clients.map(c => (
              <div key={c} style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--grey-400)', whiteSpace: 'nowrap', letterSpacing: '.03em' }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent: 'center' }}>Platform Features</div>
            <h2 className="section-title">Everything Your Team Needs</h2>
            <p className="section-desc" style={{ margin: '0 auto 3rem' }}>
              A complete corporate insurance ecosystem — from enrollment to claims assistance — powered by AI.
            </p>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: 'var(--grey-50)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent: 'center' }}>Process</div>
            <h2>How InsurAI Works</h2>
          </div>
          <div className="grid-3">
            {steps.map((s, i) => (
              <div key={s.num} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', margin: '0 auto 1.25rem',
                  background: `linear-gradient(135deg, var(--primary-dark), var(--${i === 1 ? 'accent' : 'primary-light'}))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '1.25rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif'
                }}>
                  {s.num}
                </div>
                <h4>{s.title}</h4>
                <p style={{ fontSize: '.9rem', marginTop: '.5rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Teaser */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
            <h2>Flexible Insurance Plans</h2>
            <p className="section-desc" style={{ margin: '0 auto 3rem' }}>
              Choose the right coverage tier for your organization. All plans include AI support and online booking.
            </p>
          </div>
          <div className="grid-3">
            {plans.map(p => (
              <div key={p.name} className={`plan-card${p.featured ? ' featured' : ''}`}>
                {p.featured && <div className="plan-badge-featured">⭐ Most Popular</div>}
                <div className={`plan-header${p.featured ? ' featured-bg' : ''}`}>
                  <div className="plan-name" style={{ color: p.featured ? 'white' : undefined }}>{p.name} Plan</div>
                  <div className="plan-price">
                    <span className="amount" style={{ color: p.featured ? 'white' : undefined }}>{p.price}</span>
                    <span className="period" style={{ color: p.featured ? 'rgba(255,255,255,.7)' : undefined }}>/user/mo</span>
                  </div>
                  <div style={{ fontSize: '.8125rem', fontWeight: 600, color: p.featured ? 'rgba(255,255,255,.75)' : 'var(--text-muted)' }}>
                    Coverage: {p.coverage}
                  </div>
                </div>
                <div className="plan-body">
                  <ul className="plan-features">
                    {p.features.map(f => <li key={f} style={{ listStyle: 'none' }}>{f}</li>)}
                  </ul>
                  <Link to="/auth" className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'} w-full`}>
                    Select Plan →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/plans" className="btn btn-outline btn-lg">View All Plans & Compare →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary), #0097A7)' }}>
        <div className="container text-center">
          <h2 style={{ color: 'white', marginBottom: '1.125rem' }}>Ready to Transform Your Corporate Insurance?</h2>
          <p style={{ color: 'rgba(255,255,255,.8)', marginBottom: '2.5rem', fontSize: '1.0625rem', maxWidth: 540, margin: '0 auto 2.5rem' }}>
            Join hundreds of companies using InsurAI to simplify user benefits management.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth" className="btn btn-white btn-lg">🚀 Start for Free</Link>
            <Link to="/architecture" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.12)', color: 'white', border: '1.5px solid rgba(255,255,255,.3)' }}>
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-icon">AI</div>
                InsurAI
              </div>
              <p>AI-Powered Corporate Insurance Automation & Intelligence System. Built with React + Spring Boot + MySQL.</p>
            </div>
            <div>
              <h5>Platform</h5>
              <ul>
                <li><Link to="/auth">User Portal</Link></li>
                <li><Link to="/auth">Agent Portal</Link></li>
                <li><Link to="/auth">Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h5>Plans</h5>
              <ul>
                <li><Link to="/plans">Basic Health</Link></li>
                <li><Link to="/plans">Premium Health</Link></li>
                <li><Link to="/plans">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h5>Docs</h5>
              <ul>
                <li><Link to="/architecture">Class Diagram</Link></li>
                <li><Link to="/architecture">API Docs</Link></li>
                <li><Link to="/architecture">Architecture</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 InsurAI. Internship Project – All rights reserved.</p>
            <div className="footer-tags">
              {['React', 'Spring Boot', 'MySQL', 'JWT', 'Voice AI'].map(t => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ variant = 'default' }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isDark = variant === 'hero' && !scrolled

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}
         style={isDark ? { background: 'transparent', borderBottomColor: 'rgba(255,255,255,0.15)' } : {}}>
      <div className="navbar-inner">
        <Link className="navbar-brand" to="/">
          <div className="navbar-logo-icon">AI</div>
          Insur<span className="brand-dot">AI</span>
        </Link>

        <div className="navbar-links" style={isDark ? { '--link-color': 'rgba(255,255,255,.8)' } : {}}>
          {[['/', 'Home'], ['/plans', 'Plans'], ['/architecture', 'Architecture']].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={location.pathname === to ? 'active' : ''}
              style={{ color: isDark ? 'rgba(255,255,255,.8)' : undefined }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/auth" className="btn btn-outline btn-sm"
                style={isDark ? { color: 'white', borderColor: 'rgba(255,255,255,.5)' } : {}}>
            Login
          </Link>
          <Link to="/auth?tab=register" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

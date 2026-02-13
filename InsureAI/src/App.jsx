import React, { useState, useEffect } from 'react'
import {
  Shield,
  Mic,
  Calendar,
  Users,
  ClipboardList,
  Bell,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Cpu,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: <Shield />,
      title: "Secure User Authentication",
      desc: "Enterprise-grade security with multi-factor authentication to protect sensitive employee data."
    },
    {
      icon: <Mic />,
      title: "Voice-Based AI Query Support",
      desc: "Natural language processing allows employees to ask questions about their policies using voice commands."
    },
    {
      icon: <Calendar />,
      title: "Smart Appointment Scheduling",
      desc: "AI-driven scheduling that matches employees with the right insurance agents based on expertise."
    },
    {
      icon: <Users />,
      title: "Agent Availability Management",
      desc: "Real-time tracking of agent schedules and performance to optimize corporate insurance services."
    },
    {
      icon: <ClipboardList />,
      title: "Plan Management System",
      desc: "Comprehensive dashboard for HR to manage and update corporate insurance plans effortlessly."
    },
    {
      icon: <Bell />,
      title: "Real-Time Notifications",
      desc: "Instant alerts for policy renewals, appointment confirmations, and claim updates."
    }
  ]

  const steps = [
    { number: "01", title: "Register & Login", desc: "Easy onboarding for organizations and employees." },
    { number: "02", title: "Choose Insurance Plan", desc: "Browse AI-recommended plans for your needs." },
    { number: "03", title: "Book Appointment", desc: "Instantly schedule calls with certified agents." },
    { number: "04", title: "Get AI Assistance", desc: "Resolve queries via voice assistant and stay updated." }
  ]

  const benefits = [
    { title: "Faster insurance processing", desc: "Reduce turnaround time by 60% with AI automation." },
    { title: "Improved employee satisfaction", desc: "Instant answers and seamless claim filing experience." },
    { title: "Automated agent management", desc: "Smart load balancing and reporting for insurance teams." },
    { title: "Secure data handling", desc: "End-to-end encryption for all corporate and personal policy data." }
  ]

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-content">
          <div className="logo">
            <Cpu size={32} />
            <span>InsurAI</span>
          </div>

          <div className="nav-links">
            <Link to="home" smooth={true} className="nav-link">Home</Link>
            <Link to="features" smooth={true} className="nav-link">Features</Link>
            <Link to="how-it-works" smooth={true} className="nav-link">About</Link>
            <Link to="contact" smooth={true} className="nav-link">Contact</Link>
          </div>

          <div className="nav-auth">
            <button className="btn-login">Login</button>
            <button className="btn-register">Register</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Smart Corporate Insurance Management Powered by AI</h1>
            <p>Streamline employee insurance, schedule agent appointments, and resolve queries instantly using AI-driven voice assistance.</p>
            <div className="hero-ctas">
              <button className="btn-primary">Get Started</button>
              <button className="btn-secondary">Explore Features</button>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/hero_illustration.png" alt="InsurAI Dashboard" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Features</h2>
            <p>Powerful tools designed to revolutionize how your company handles employee insurance.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                className="feature-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Experience a seamless journey from registration to AI-powered support.</p>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <motion.div
                className="step-item"
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-image">
              <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem' }}>
                <h2>Platform Benefits</h2>
                <p>Designed to deliver value to both employees and management.</p>
              </div>
              <div className="benefit-list">
                {benefits.map((benefit, index) => (
                  <motion.div
                    className="benefit-item"
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="benefit-check" size={24} />
                    <div>
                      <h4>{benefit.title}</h4>
                      <p>{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="benefits-visual">
              {/* Visual element or secondary image could go here */}
              <motion.div
                style={{
                  background: 'var(--primary-light)',
                  padding: '3rem',
                  borderRadius: 'var(--radius-xl)',
                  border: '2px dashed var(--primary)'
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <blockquote style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary)' }}>
                  "InsurAI has transformed our HR operations, reducing policy query resolution time by over 80%."
                </blockquote>
                <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontWeight: '500' }}>— Director of HR, Global Tech Corp</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section >

      {/* Call To Action Section */}
      < section id="contact" className="section contact" >
        <div className="container">
          <motion.div
            className="cta-card"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2>Transform Your Corporate Insurance Experience</h2>
            <p>Join hundreds of companies using InsurAI to provide better insurance management for their teams.</p>
            <button className="btn-white">Start Now <ArrowRight size={20} style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }} /></button>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < footer className="footer" >
        <div className="container">
          <div className="footer-grid">
            <div className="footer-info">
              <div className="footer-logo">InsurAI</div>
              <p className="footer-text">Internship Project - Revolutionizing corporate insurance management with artificial intelligence.</p>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Menu</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">Home</a>
                <a href="#" className="footer-link">Features</a>
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Contact</a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Product</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">AI Support</a>
                <a href="#" className="footer-link">Scheduling</a>
                <a href="#" className="footer-link">Data Security</a>
                <a href="#" className="footer-link">Pricing</a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Tech Stack</h4>
              <div className="footer-links">
                <span className="footer-link">React</span>
                <span className="footer-link">Spring Boot</span>
                <span className="footer-link">MySQL</span>
                <span className="footer-link">Vite</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 InsurAI. All rights reserved.</p>
            <div className="tech-stack">
              <span>React</span>
              <span>•</span>
              <span>Spring Boot</span>
              <span>•</span>
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </footer >
    </div >
  )
}

export default App

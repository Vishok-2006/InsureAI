import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { planApi } from '../utils/api'

const catColors = { HEALTH:'var(--primary)', LIFE:'var(--success-light)', ACCIDENTAL:'var(--warning)', ADDON:'var(--accent)' }

const categoryLabel = (category) => {
  const labels = {
    HEALTH: 'Health',
    LIFE: 'Life',
    ACCIDENTAL: 'Accidental',
    ADDON: 'Addon',
    GROUP: 'Group',
  }
  return labels[category] || category
}

const faqs = [
  ['Who is eligible for corporate insurance?', 'All users on payroll are eligible. Part-time users may be eligible based on your company policy. Enrollment is usually within 30 days of joining.'],
  ['Can I add my family members?', 'Yes! The Family Floater Add-on allows you to extend coverage to your spouse and up to 2 dependent children.'],
  ['How do I file a claim?', 'Login → Claims → Submit Claim. Attach the hospital bills and discharge summary. Claims under ₹50,000 are usually processed in 5-7 working days.'],
  ['What happens when I leave the company?', 'Corporate insurance ends on the last working day. However, you can convert to a personal policy within 30 days of separation without medical underwriting.'],
  ['Is there a waiting period?', 'Most plans have a 30-day general waiting period. Pre-existing diseases are covered after 2 years (or as per your policy terms).'],
]

export default function PlansPage() {
  const [plans, setPlans] = useState([])
  const [activeCat, setActiveCat] = useState('All')
  const [annual, setAnnual]       = useState(false)
  const [openFaq, setOpenFaq]     = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const resp = await planApi.getPlans()
      setPlans(resp.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const cats = ['All','HEALTH','LIFE','ACCIDENTAL','ADDON']
  const filtered = activeCat === 'All' ? plans : plans.filter(p => p.category === activeCat)
  const price = (m) => annual ? Math.floor(m * 10) : m

  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div style={{ paddingTop:'calc(var(--nav-height) + 4rem)', paddingBottom:'3rem', textAlign:'center',
        background:'linear-gradient(135deg,var(--primary-dark),var(--primary) 60%,var(--accent))' }}>
        <div className="container">
          <div className="hero-badge" style={{ justifyContent:'center',margin:'0 auto 1.5rem' }}>📋 Compare All Plans</div>
          <h1 style={{ color:'white', marginBottom:'1rem' }}>Corporate Insurance Plans</h1>
          <p style={{ color:'rgba(255,255,255,.8)', fontSize:'1.0625rem', maxWidth:580, margin:'0 auto 2rem' }}>
            Choose the right coverage for you and your team. All plans include AI voice support, agent booking, and a digital ID card.
          </p>
          {/* Billing toggle */}
          <div style={{ display:'flex',alignItems:'center',gap:'.875rem',justifyContent:'center' }}>
            <span style={{ color:'rgba(255,255,255,.8)',fontSize:'.9rem' }}>Monthly</span>
            <div onClick={()=>setAnnual(a=>!a)} style={{
              width:52,height:28,borderRadius:14,background:annual?'var(--success-light)':'rgba(255,255,255,.25)',
              cursor:'pointer',position:'relative',transition:'all .3s'
            }}>
              <div style={{ position:'absolute',top:4,left:annual?26:4,width:20,height:20,borderRadius:'50%',background:'white',transition:'all .25s',boxShadow:'0 2px 4px rgba(0,0,0,.25)' }} />
            </div>
            <span style={{ color:'rgba(255,255,255,.8)',fontSize:'.9rem' }}>Annual <span style={{ fontSize:'.75rem',background:'var(--success-light)',color:'white',borderRadius:20,padding:'.15rem .5rem',marginLeft:'.25rem' }}>Save 2 months</span></span>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ position:'sticky',top:'var(--nav-height)',zIndex:500,background:'white',borderBottom:'1px solid var(--border)',padding:'.875rem 0' }}>
        <div className="container" style={{ display:'flex',gap:'.5rem',flexWrap:'wrap' }}>
            {cats.map(c=>(
              <button key={c} className={`filter-chip${activeCat===c?' active':''}`} onClick={()=>setActiveCat(c)}>{categoryLabel(c)}</button>
            ))}
        </div>
      </div>

      {/* Plans grid */}
      <div className="section">
        <div className="container">
          {loading ? (
             <div style={{ textAlign:'center', padding:'4rem' }}>Loading plans...</div>
          ) : (
            <div className="grid-3">
              {filtered.map(p=>(
                <div key={p.id} className={`plan-card${p.isFeatured?' featured':''}`}>
                  {p.isFeatured && <div className="plan-badge-featured">⭐ Most Popular</div>}
                  <div className={`plan-header${p.isFeatured?' featured-bg':''}`}>
                    <div style={{ display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'.5rem' }}>
                      <span className="badge" style={{ background:`${catColors[p.category]}20`,color:catColors[p.category] }}>{categoryLabel(p.category)}</span>
                    </div>
                    <div className="plan-name" style={{ color:p.isFeatured?'white':undefined }}>{p.name}</div>
                    <div className="plan-price">
                      <span className="amount" style={{ color:p.isFeatured?'white':undefined }}>₹{price(p.premium).toLocaleString('en-IN')}</span>
                      <span className="period" style={{ color:p.isFeatured?'rgba(255,255,255,.7)':undefined }}>/{annual?'year':'month'}</span>
                    </div>
                    <div style={{ fontSize:'.875rem', color:p.isFeatured?'rgba(255,255,255,.75)':'var(--text-muted)' }}>
                      Coverage: ₹{(p.coverageAmount/100000).toFixed(0)}L
                    </div>
                  </div>
                  <div className="plan-body">
                    <p style={{ fontSize:'.875rem',color:'var(--text-muted)',marginBottom:'1rem' }}>{p.description}</p>
                    <ul className="plan-features">
                      <li>AI query support</li>
                      <li>Agent booking</li>
                      <li>Digital ID card</li>
                      {p.isFeatured && <li>Priority Support</li>}
                    </ul>
                    <Link to="/auth" className={`btn ${p.isFeatured?'btn-primary':'btn-outline'} w-full`}>Choose Plan →</Link>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p style={{ gridColumn:'1/4', textAlign:'center', padding:'3rem' }}>No plans found in this category.</p>}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <section style={{ background:'var(--grey-50)', padding:'4rem 0' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Feature Comparison</h2>
            <p style={{ color:'var(--text-muted)' }}>Quick comparison of all plans at a glance</p>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    {plans.slice(0,3).map(p=>(
                      <th key={p.id} style={{ textAlign:'center', color: p.isFeatured?'var(--primary)':undefined }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Coverage Amount','₹3L','₹7L','₹20L'],
                    ['OPD Visits/yr','20','50','Unlimited'],
                    ['Dental & Vision','✗','✓','✓'],
                    ['Family Add-on','✗','✓','✓'],
                    ['International Cover','✗','✗','✓'],
                    ['Dedicated Agent','✗','✗','✓'],
                    ['Voice AI Support','✓','✓','✓'],
                  ].map(([feat, ...vals])=>(
                    <tr key={feat}>
                      <td style={{ fontWeight:600 }}>{feat}</td>
                      {vals.map((v,i)=><td key={i} style={{ textAlign:'center',color:v==='✓'?'var(--success-light)':v==='✗'?'var(--grey-400)':undefined,fontWeight:v==='✓'||v==='✗'?700:400 }}>{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-sm">
          <div className="text-center mb-4">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
            {faqs.map(([q,a],i)=>(
              <div key={i} className="card" style={{ border:'1px solid var(--border)',boxShadow:'none' }}>
                <div style={{ padding:'1.125rem 1.5rem',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center' }}
                  onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  <span style={{ fontWeight:600,fontSize:'.9375rem' }}>{q}</span>
                  <span style={{ fontSize:'1.125rem',color:'var(--primary)',transition:'transform .25s',transform:openFaq===i?'rotate(45deg)':'none' }}>+</span>
                </div>
                {openFaq===i && (
                  <div style={{ padding:'0 1.5rem 1.125rem',color:'var(--text-secondary)',fontSize:'.9rem',lineHeight:1.75 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ textAlign:'center', padding:'3rem 0 2rem',borderTop:'1px solid rgba(255,255,255,.1)' }}>
            <p style={{ color:'rgba(255,255,255,.45)',fontSize:'.875rem' }}>© 2026 InsurAI – Internship Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

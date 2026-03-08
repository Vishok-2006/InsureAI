import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const layers = [
  { title:'Presentation Layer (Frontend)', items:['React SPA', 'Vite + React Router v7', 'Recharts Visualizations', 'Browser Speech API (Voice AI)', 'Corporate Design System (CSS)'], color:'#1565C0', bg:'#E3F2FD', icon:'🖥️' },
  { title:'API Layer (Spring Boot REST)', items:['AuthController – JWT Auth', 'AppointmentController – CRUD', 'PlanController – Plan Mgmt', 'AgentController – Agents', 'AdminController – Analytics', 'NotificationController'], color:'#2E7D32', bg:'#E8F5E9', icon:'⚙️' },
  { title:'Service Layer (Business Logic)', items:['AuthService – BCrypt + JWT', 'AppointmentService – Conflict Check', 'PlanService – Enrollment', 'NotificationService – Email/SMS', 'VoiceAIService – Transcription', 'AdminService – Analytics'], color:'#E65100', bg:'#FFF3E0', icon:'🔧' },
  { title:'Data Layer (JPA + MySQL)', items:['UserRepository', 'AgentRepository', 'AppointmentRepository', 'PlanRepository', 'NotificationRepository', 'MySQL 8.0 – Schema + Seed'], color:'#6A1B9A', bg:'#F3E5F5', icon:'🗃️' },
]

const classes = [
  { name:'User', color:'#1565C0', bg:'#E3F2FD', fields:['id: Long', 'firstName: String', 'lastName: String', 'email: String (unique)', 'passwordHash: String', 'role: Role (USER|AGENT|ADMIN)', 'phone: String', 'department: String', 'userId: String (unique)', 'emailVerified: Boolean', 'isActive: Boolean', 'createdAt: LocalDateTime'], methods:['getFullName(): String', 'getPlans(): List<Plan>', 'getAppointments(): List<Appointment>'] },
  { name:'Agent', color:'#2E7D32', bg:'#E8F5E9', fields:['id: Long', 'firstName: String', 'lastName: String', 'email: String (unique)', 'company: String', 'licenseNo: String (unique)', 'specialization: String', 'yearsExperience: Integer', 'averageRating: Double', 'totalReviews: Integer', 'isAvailable: Boolean', 'availabilityJson: String (JSON)'], methods:['getFullName(): String', 'getAppointments(): List<Appointment>'] },
  { name:'Appointment', color:'#E65100', bg:'#FFF3E0', fields:['id: Long', 'user: User (ManyToOne)', 'agent: Agent (ManyToOne)', 'appointmentDate: LocalDate', 'appointmentTime: LocalTime', 'reason: String', 'mode: MeetingMode', 'status: AppointmentStatus', 'notes: String', 'createdAt: LocalDateTime'], methods:['getFormattedDate(): String', 'isUpcoming(): Boolean', 'canBeCancelled(): Boolean'] },
  { name:'Plan', color:'#6A1B9A', bg:'#F3E5F5', fields:['id: Long', 'planName: String', 'category: PlanCategory', 'monthlyPremium: BigDecimal', 'coverageAmount: BigDecimal', 'description: String', 'eligibility: String', 'features: List<String>', 'isActive: Boolean', 'isFeatured: Boolean', 'subscribers: List<User>'], methods:['getSubscriberCount(): int', 'getAnnualPremium(): BigDecimal'] },
  { name:'Notification', color:'#00695C', bg:'#E0F2F1', fields:['id: Long', 'user: User (ManyToOne)', 'appointment: Appointment', 'type: NotificationType', 'title: String', 'message: String', 'channel: String', 'isRead: Boolean', 'isSent: Boolean', 'scheduledAt: LocalDateTime', 'sentAt: LocalDateTime'], methods:['markAsRead(): void', 'getChannel(): String'] },
  { name:'Admin (System Config)', color:'#455A64', bg:'#ECEFF1', fields:['extends User (role=ADMIN)', '– SystemSettings –', 'platformName: String', 'senderEmail: String', 'smsProvider: String', 'jwtSecret: String', 'tokenExpiry: Long'], methods:['getAllUsers(): List<User>', 'getAnalytics(): Dashboard', 'sendBulkNotifications()'] },
]

const endpoints = [
  ['POST',   '/api/auth/register',            'Register new user (User / Agent)'],
  ['POST',   '/api/auth/login',               'Authenticate and get JWT token'],
  ['POST',   '/api/auth/forgot-password',      'Send password reset email'],
  ['GET',    '/api/auth/verify-email',         'Verify email with token'],
  ['GET',    '/api/plans',                    'Get all active insurance plans'],
  ['GET',    '/api/plans/{id}',               'Get plan details by ID'],
  ['POST',   '/api/appointments/book',         'Book new appointment (User)'],
  ['GET',    '/api/appointments/user/{id}',   'Get all appointments for user'],
  ['GET',    '/api/appointments/agent/{id}',  'Get all appointments for agent'],
  ['PUT',    '/api/appointments/{id}/accept', 'Agent accepts appointment'],
  ['PUT',    '/api/appointments/{id}/reject', 'Agent rejects appointment'],
  ['PUT',    '/api/appointments/{id}/cancel', 'Cancel an appointment'],
  ['PUT',    '/api/appointments/{id}/complete','Mark appointment as completed'],
  ['GET',    '/api/agents',                   'Get all available agents'],
  ['GET',    '/api/notifications/user/{id}',  'Get notifications for user'],
  ['PUT',    '/api/notifications/{id}/read',  'Mark notification as read'],
  ['GET',    '/api/admin/analytics',          'Get platform analytics (Admin only)'],
  ['GET',    '/api/admin/users',              'Get all users (Admin only)'],
  ['DELETE', '/api/admin/users/{id}',         'Delete user account (Admin only)'],
  ['POST',   '/api/admin/notifications/send', 'Send bulk notification (Admin only)'],
]

const methodColors = { GET:'#2E7D32', POST:'#1565C0', PUT:'#E65100', DELETE:'#C62828', PATCH:'#6A1B9A' }

export default function ClassDiagram() {
  return (
    <div>
      <Navbar />

      {/* Header */}
      <div style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', paddingBottom:'2.5rem',
        background:'linear-gradient(135deg,#0D47A1,#1565C0,#0097A7)', textAlign:'center' }}>
        <div className="container">
          <div className="hero-badge" style={{ justifyContent:'center',margin:'0 auto 1rem' }}>🏗️ System Architecture</div>
          <h1 style={{ color:'white',marginBottom:'1rem' }}>Architecture & Class Diagrams</h1>
          <p style={{ color:'rgba(255,255,255,.8)',fontSize:'1.0625rem',maxWidth:600,margin:'0 auto' }}>
            Full technical documentation of InsurAI's backend architecture, entity classes, data relationships, and REST API endpoints.
          </p>
          <div style={{ display:'flex',gap:'.75rem',justifyContent:'center',marginTop:'2rem',flexWrap:'wrap' }}>
            {[['🧠 React + Vite','Frontend'],['☕ Spring Boot 3','Backend'],['🗃️ MySQL 8','Database'],['🔐 JWT Security','Auth']].map(([v,l])=>(
              <div key={v} style={{ background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.2)',borderRadius:'var(--radius-md)',padding:'.625rem 1rem',backdropFilter:'blur(8px)' }}>
                <div style={{ color:'white',fontWeight:700,fontSize:'.9rem' }}>{v}</div>
                <div style={{ color:'rgba(255,255,255,.65)',fontSize:'.75rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Tier Architecture */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent:'center' }}>System Architecture</div>
            <h2>3-Tier Architecture</h2>
            <p style={{ color:'var(--text-muted)', maxWidth:560,margin:'0 auto' }}>
              InsurAI follows a clean separation of concerns with Presentation, Service, and Data tiers.
            </p>
          </div>
          <div className="grid-4">
            {layers.map(l=>(
              <div key={l.title} className="card" style={{ borderTop:`4px solid ${l.color}` }}>
                <div className="card-body">
                  <div style={{ fontSize:'2rem',marginBottom:'.875rem' }}>{l.icon}</div>
                  <h4 style={{ color:l.color,fontSize:'.9rem',marginBottom:'1rem' }}>{l.title}</h4>
                  <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:'.5rem' }}>
                    {l.items.map(item=>(
                      <li key={item} style={{ fontSize:'.8125rem',display:'flex',alignItems:'flex-start',gap:'.375rem' }}>
                        <span style={{ color:l.color,flexShrink:0 }}>▸</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* Arrows */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginTop:'1rem' }}>
            {['Browser/Client','HTTP/JSON REST APIs','JPA/Hibernate ORM','MySQL Driver JDBC'].map((a,i)=>(
              <div key={i} style={{ textAlign:'center' }}>
                <div style={{ color:'var(--text-muted)',fontSize:'.75rem',fontWeight:700 }}>↕ {a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UML Class Diagram */}
      <section className="section" style={{ background:'var(--grey-50)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent:'center' }}>UML</div>
            <h2>Entity Class Diagram</h2>
          </div>
          <div className="grid-3">
            {classes.map(cls=>(
              <div key={cls.name} className="card" style={{ fontFamily:'monospace',fontSize:'.8125rem',borderTop:`3px solid ${cls.color}` }}>
                <div style={{ background:cls.bg,padding:'.875rem 1.25rem',borderBottom:`1px solid ${cls.color}33` }}>
                  <div style={{ fontWeight:800,fontSize:.9375+'rem',color:cls.color,fontFamily:'Outfit, sans-serif' }}>«entity» {cls.name}</div>
                </div>
                <div style={{ padding:'.875rem 1.25rem',borderBottom:'1px dashed var(--grey-200)' }}>
                  <div style={{ fontSize:'.625rem',fontWeight:700,color:'var(--text-muted)',marginBottom:'.5rem',textTransform:'uppercase',letterSpacing:'.07em',fontFamily:'Inter,sans-serif' }}>Fields</div>
                  {cls.fields.map(f=>(
                    <div key={f} style={{ padding:'.2rem 0',color:'var(--text-secondary)',lineHeight:1.5 }}>
                      <span style={{ color:cls.color }}>–</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ padding:'.875rem 1.25rem' }}>
                  <div style={{ fontSize:'.625rem',fontWeight:700,color:'var(--text-muted)',marginBottom:'.5rem',textTransform:'uppercase',letterSpacing:'.07em',fontFamily:'Inter,sans-serif' }}>Methods</div>
                  {cls.methods.map(m=>(
                    <div key={m} style={{ padding:'.2rem 0',color:'var(--text-secondary)',fontStyle:'italic' }}>
                      <span style={{ color:'var(--success-light)' }}>+</span> {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entity Relationships */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent:'center' }}>Database</div>
            <h2>Entity Relationships</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header"><h4>Relationships</h4></div>
              <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
                {[
                  { from:'User', rel:'One-to-Many', to:'Appointment (as User)', desc:'An user can book many appointments' },
                  { from:'Agent', rel:'One-to-Many', to:'Appointment (as Agent)', desc:'An agent can have many appointments' },
                  { from:'User', rel:'Many-to-Many', to:'Plan via user_plans', desc:'An user can subscribe to multiple plans' },
                  { from:'User', rel:'One-to-Many', to:'Notification', desc:'A user can receive many notifications' },
                  { from:'Appointment', rel:'One-to-Many', to:'Notification', desc:'An appointment can trigger multiple notifications' },
                ].map((r,i)=>(
                  <div key={i} style={{ display:'flex',gap:'1rem',alignItems:'flex-start',padding:'.75rem',background:'var(--grey-50)',borderRadius:'var(--radius-md)' }}>
                    <div style={{ minWidth:90,fontSize:'.75rem',fontWeight:800,color:'white',background:'var(--primary)',padding:'.25rem .5rem',borderRadius:4,textAlign:'center',marginTop:'.125rem' }}>{r.rel}</div>
                    <div>
                      <div style={{ fontWeight:700,fontSize:'.875rem' }}>{r.from} → {r.to}</div>
                      <div style={{ fontSize:'.8125rem',color:'var(--text-muted)',marginTop:'.125rem' }}>{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><h4>DB Constraints & Highlights</h4></div>
              <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:'.75rem' }}>
                {[
                  { icon:'🔑', title:'Primary Keys', desc:'Auto-increment BIGINT on all entity tables.' },
                  { icon:'🔗', title:'Unique Constraints', desc:'users.email, users.user_id, agents.email, agents.license_no, appointments(agent_id,date,time).' },
                  { icon:'🛡️', title:'Conflict Prevention', desc:'Unique constraint on (agent_id, appointment_date, appointment_time) prevents double-booking.' },
                  { icon:'🗑️', title:'Cascade Strategy', desc:'User deleted → Notifications cascade deleted. Appointment deleted → Notification FK set NULL.' },
                  { icon:'📊', title:'Indexes', desc:'Indexed on: users.email, users.role, appointments.user_id, appointments.agent_id, appointments.status, notifications.user_id.' },
                ].map((h,i)=>(
                  <div key={i} style={{ display:'flex',gap:'.875rem' }}>
                    <span style={{ fontSize:'1.25rem',flexShrink:0 }}>{h.icon}</span>
                    <div><div style={{ fontWeight:700,fontSize:'.875rem' }}>{h.title}</div><div style={{ fontSize:'.8125rem',color:'var(--text-muted)',marginTop:'.125rem' }}>{h.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REST API Table */}
      <section className="section" style={{ background:'var(--grey-50)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-label" style={{ justifyContent:'center' }}>Backend</div>
            <h2>REST API Endpoints</h2>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
                <tbody>
                  {endpoints.map(([method, path, desc])=>(
                    <tr key={path}>
                      <td>
                        <span style={{ fontFamily:'monospace',fontWeight:800,fontSize:'.75rem',padding:'.2rem .5rem',borderRadius:4,
                          background:`${methodColors[method]}15`,color:methodColors[method] }}>
                          {method}
                        </span>
                      </td>
                      <td style={{ fontFamily:'monospace',fontSize:'.8125rem',color:'var(--primary)' }}>{path}</td>
                      <td style={{ fontSize:'.875rem' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="section">
        <div className="container-sm text-center">
          <h2 style={{ marginBottom:'2rem' }}>Project Information</h2>
          <div className="card">
            <div className="card-body">
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.25rem',textAlign:'left' }}>
                {[['Project Name','InsurAI – Corporate Insurance Automation & AI System'],['Type','Full-Stack Web Application (Internship Project)'],['Frontend','React 19 + Vite 7 + React Router v7 + Recharts'],['Backend','Spring Boot 3.2 + Spring Security 6 + JPA/Hibernate'],['Database','MySQL 8.0 + Schema with normalized tables'],['Authentication','JWT (HS256) + BCrypt (strength 12) + RBAC'],['AI Feature','Browser Speech API + OpenAI Whisper integration'],['Notifications','JavaMail (SMTP) + Twilio SMS API'],['Year','2025–2026'],['Domain','InsurTech / AI / Corporate HR Systems']].map(([k,v])=>(
                  <div key={k} style={{ paddingBottom:'1rem',borderBottom:'1px solid var(--grey-50)' }}>
                    <div style={{ fontSize:'.75rem',fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'.07em' }}>{k}</div>
                    <div style={{ fontWeight:600,marginTop:'.25rem' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div style={{ textAlign:'center',padding:'3rem 0 2rem',borderTop:'1px solid rgba(255,255,255,.1)' }}>
            <div style={{ color:'white',fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'1.25rem',marginBottom:'.5rem' }}>InsurAI</div>
            <p style={{ color:'rgba(255,255,255,.45)',fontSize:'.875rem' }}>© 2026 InsurAI – Architecture Documentation. Internship Project.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

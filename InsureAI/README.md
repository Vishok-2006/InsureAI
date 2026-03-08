# 🛡️ InsurAI – AI-Powered Corporate Insurance Automation & Intelligence System

> **InsurAI** is a full-stack web platform designed to modernize corporate insurance management for users, agents, and administrators. It features AI voice query handling, smart appointment scheduling, comprehensive plan management, and a rich analytics dashboard.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (React-ready) |
| **Backend** | Spring Boot 3.x (Java 17) |
| **Database** | MySQL 8.0 |
| **Authentication** | JWT (JSON Web Tokens) |
| **Security** | Spring Security + BCrypt |
| **Notifications** | JavaMail (SMTP) + Twilio SMS |
| **AI Voice** | Browser Speech API + OpenAI Whisper |
| **ORM** | Spring Data JPA + Hibernate |

---

## 📁 Project Structure

```
InsureAI/
├── frontend/                        # Frontend (HTML/CSS/JS)
│   ├── index.html                   # 🏠 Home Page
│   ├── assets/
│   │   ├── css/main.css             # Global design system
│   │   └── js/app.js                # Global utilities
│   └── pages/
│       ├── auth.html                # 🔐 Login / Register
│       ├── user-dashboard.html  # 👤 User Portal
│       ├── agent-dashboard.html     # 🧑‍💼 Agent Portal
│       ├── admin-dashboard.html     # ⚙️ Admin Portal
│       ├── plans.html               # 📋 Insurance Plans
│       └── class-diagram.html       # 🏗️ Architecture & Class Diagrams
│
└── backend/                         # Spring Boot REST API
    ├── pom.xml
    └── src/main/
        ├── java/com/insurai/
        │   ├── InsurAIApplication.java
        │   ├── model/               # JPA Entities
        │   │   ├── User.java
        │   │   ├── Agent.java
        │   │   ├── Appointment.java
        │   │   ├── Plan.java
        │   │   └── Notification.java
        │   ├── controller/          # REST Controllers
        │   │   ├── AuthController.java
        │   │   ├── AppointmentController.java
        │   │   └── ...
        │   ├── service/             # Business Logic
        │   ├── repository/          # JPA Repositories
        │   ├── dto/                 # DTOs & Response Wrappers
        │   ├── security/            # JWT Filter & Utility
        │   └── config/              # Spring Security Config
        └── resources/
            ├── application.yml      # App Configuration
            └── schema.sql           # MySQL Schema + Seed Data
```

---

## 🖥️ Pages Overview

| Page | URL | Users |
|------|-----|-------|
| 🏠 Home | `/index.html` | Public |
| 🔐 Login/Register | `/pages/auth.html` | Public |
| 👤 User Dashboard | `/pages/user-dashboard.html` | User |
| 🧑‍💼 Agent Dashboard | `/pages/agent-dashboard.html` | Agent |
| ⚙️ Admin Dashboard | `/pages/admin-dashboard.html` | Admin |
| 📋 Insurance Plans | `/pages/plans.html` | Public |
| 🏗️ Architecture | `/pages/class-diagram.html` | Public |

---

## 🔑 Demo Login (Frontend Simulation)

| Role | Action |
|------|--------|
| 👤 User | Click **User** demo button on login page |
| 🧑‍💼 Agent | Click **Agent** demo button on login page |
| ⚙️ Admin | Click **Admin** demo button on login page |

Or use these email prefixes:
- `admin@...` → Admin Dashboard  
- `agent@...` → Agent Dashboard  
- Any other email → User Dashboard

---

## ✨ Key Features

### User Portal
- 📋 View active insurance plans & coverage
- 📅 Multi-step appointment booking with calendar
- 🎤 Voice AI assistant for instant answers
- 🔔 Real-time notifications (appointments, renewals)
- 🕒 Appointment history with status

### Agent Portal
- ✅ Accept / Reject appointment requests
- 🗓️ Set weekly availability & block time off
- 👥 View assigned customer portfolio
- 📊 Performance analytics dashboard

### Admin Portal
- 👥 User Management (Add/Edit/Delete)
- 🧑‍💼 Agent Management & verification
- 📋 Plan Management (Create/Edit/Activate)
- 📅 All Appointments view with filters
- 📊 Analytics with bar charts & donut charts
- 📧 Bulk notification sender with templates
- ⚙️ System settings & integrations

---

## 🛡️ Security Features

- **JWT Authentication** – Stateless, secure token-based auth
- **Role-Based Access Control (RBAC)** – User / Agent / Admin
- **BCrypt Password Hashing** – Strength factor 12
- **Email Verification** – Required for account activation
- **SQL Injection Prevention** – JPA parameterized queries
- **CORS Configuration** – Restricted to frontend origins

---

## 🗃️ Database Schema

Key tables:
- `users` – Users and system users
- `agents` – Insurance agents with availability
- `appointments` – With **unique constraint** on `(agent_id, date, time)` for conflict prevention
- `plans` – Corporate insurance plans
- `plan_features` – Plan feature list
- `user_plans` – Many-to-many enrollment
- `notifications` – Email/SMS/in-app alerts
- `admin_logs` – Audit trail

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- MySQL 8.0+
- Maven 3.8+

### Backend Setup
```bash
# 1. Create MySQL database
mysql -u root -p < backend/src/main/resources/schema.sql

# 2. Configure database credentials
nano backend/src/main/resources/application.yml

# 3. Build and run
cd backend
mvn clean install
mvn spring-boot:run
```
> API will be available at `http://localhost:8080/api`

### Frontend Setup
Simply open the HTML files in a browser:
```bash
# Open home page
xdg-open frontend/index.html
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login + get JWT |
| GET | `/api/plans` | Get all plans |
| POST | `/api/appointments/book` | Book appointment |
| PUT | `/api/appointments/{id}/accept` | Agent accepts |
| PUT | `/api/appointments/{id}/cancel` | Cancel booking |
| GET | `/api/admin/analytics` | Admin analytics |

---

## 📸 Screenshots

Visit `/pages/class-diagram.html#screenshots` for the screenshot placeholder section.

---

## 📝 Project Information

| Field | Detail |
|-------|--------|
| **Project Name** | InsurAI |
| **Domain** | InsurTech / AI / Corporate HR |
| **Type** | Full-Stack Web Application |
| **Year** | 2025–2026 |
| **Backend** | Spring Boot 3.x (Java 17) |
| **Frontend** | HTML5 · CSS3 · JavaScript |
| **Database** | MySQL 8.0 |
| **Auth** | JWT + Spring Security |

---

*InsurAI – Making Corporate Insurance Management Smarter, Faster, and User-Friendly.*

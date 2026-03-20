s-- ============================================================
--  InsurAI – MySQL Database Schema
--  Corporate Insurance Automation & Intelligence System
--  Version: 1.0.0 | March 2026
-- ============================================================

CREATE DATABASE IF NOT EXISTS insurai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE insurai_db;

-- ── Users Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name               VARCHAR(50)  NOT NULL,
    last_name                VARCHAR(50)  NOT NULL,
    email                    VARCHAR(100) NOT NULL UNIQUE,
    password_hash            VARCHAR(255) NOT NULL,
    role                     ENUM('USER','AGENT','ADMIN') NOT NULL DEFAULT 'USER',
    phone                    VARCHAR(20),
    department               VARCHAR(100),
    user_id              VARCHAR(30)  UNIQUE,
    email_verified           BOOLEAN      NOT NULL DEFAULT FALSE,
    email_verification_token VARCHAR(100),
    password_reset_token     VARCHAR(100),
    password_reset_expires   DATETIME,
    is_active                BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role  (role),
    INDEX idx_users_dept  (department)
);

-- ── Agents Table ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agents (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name          VARCHAR(50)     NOT NULL,
    last_name           VARCHAR(50)     NOT NULL,
    email               VARCHAR(100)    NOT NULL UNIQUE,
    password_hash       VARCHAR(255)    NOT NULL,
    phone               VARCHAR(20),
    company             VARCHAR(100)    NOT NULL,
    license_no          VARCHAR(50)     UNIQUE,
    specialization      VARCHAR(100),
    years_experience    INT             DEFAULT 0,
    average_rating      DECIMAL(3,2)    DEFAULT 0.00,
    total_reviews       INT             DEFAULT 0,
    is_available        BOOLEAN         NOT NULL DEFAULT TRUE,
    is_active           BOOLEAN         NOT NULL DEFAULT TRUE,
    profile_bio         TEXT,
    availability_json   TEXT,           -- JSON: { "monday": ["09:00","09:30",...], ... }
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_agents_email    (email),
    INDEX idx_agents_avail    (is_available)
);

-- ── Plans Table ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS plans (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_name           VARCHAR(100)    NOT NULL,
    category            ENUM('HEALTH','LIFE','ACCIDENTAL','GROUP','ADDON') NOT NULL,
    monthly_premium     DECIMAL(12,2)   NOT NULL,
    coverage_amount     DECIMAL(15,2)   NOT NULL,
    description         VARCHAR(500),
    eligibility         VARCHAR(500),
    is_active           BOOLEAN         NOT NULL DEFAULT TRUE,
    is_featured         BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_plans_category (category),
    INDEX idx_plans_active   (is_active)
);

-- ── Plan Features (One-to-Many) ──────────────────────────────
CREATE TABLE IF NOT EXISTS plan_features (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_id     BIGINT       NOT NULL,
    feature     VARCHAR(200) NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- ── User-Plan Junction (Many-to-Many) ───────────────────────
CREATE TABLE IF NOT EXISTS user_plans (
    user_id         BIGINT   NOT NULL,
    plan_id         BIGINT   NOT NULL,
    enrollment_date DATE     NOT NULL DEFAULT (CURRENT_DATE),
    expiry_date     DATE,
    PRIMARY KEY (user_id, plan_id),
    FOREIGN KEY (user_id) REFERENCES users(id)  ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE CASCADE
);

-- ── Appointments Table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS appointments (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT   NOT NULL,
    agent_id            BIGINT   NOT NULL,
    appointment_date    DATE     NOT NULL,
    appointment_time    TIME     NOT NULL,
    reason              VARCHAR(255) NOT NULL,
    mode                ENUM('VIDEO_CALL','PHONE_CALL','IN_PERSON') NOT NULL DEFAULT 'VIDEO_CALL',
    status              ENUM('PENDING','CONFIRMED','REJECTED','COMPLETED','CANCELLED','RESCHEDULED') 
                        NOT NULL DEFAULT 'PENDING',
    notes               TEXT,
    created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- Conflict prevention: agent cannot have two appointments at same date+time
    UNIQUE KEY uk_agent_date_time (agent_id, appointment_date, appointment_time),
    FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE RESTRICT,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE RESTRICT,
    INDEX idx_appt_user_id   (user_id),
    INDEX idx_appt_agent_id  (agent_id),
    INDEX idx_appt_date      (appointment_date),
    INDEX idx_appt_status    (status)
);

-- ── Notifications Table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT       NOT NULL,
    appointment_id  BIGINT,
    type            VARCHAR(40)  NOT NULL,
    title           VARCHAR(200) NOT NULL,
    message         TEXT         NOT NULL,
    channel         VARCHAR(20)  NOT NULL DEFAULT 'IN_APP',
    is_read         BOOLEAN      NOT NULL DEFAULT FALSE,
    is_sent         BOOLEAN      NOT NULL DEFAULT FALSE,
    scheduled_at    DATETIME,
    sent_at         DATETIME,
    created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)        REFERENCES users(id)        ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    INDEX idx_notif_user_id  (user_id),
    INDEX idx_notif_is_read  (is_read),
    INDEX idx_notif_type     (type)
);

-- ── Admin Logs Table ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_logs (
    id          BIGINT       AUTO_INCREMENT PRIMARY KEY,
    admin_id    BIGINT       NOT NULL,
    action      VARCHAR(100) NOT NULL,
    entity      VARCHAR(50)  NOT NULL,
    entity_id   BIGINT,
    details     TEXT,
    ip_address  VARCHAR(45),
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_admin_logs_admin_id   (admin_id),
    INDEX idx_admin_logs_created_at (created_at)
);

-- ============================================================
--  Sample Seed Data
-- ============================================================

-- Admin user (password: Admin@1234)
INSERT INTO users (first_name, last_name, email, password_hash, role, email_verified, is_active)
VALUES ('Super', 'Admin', 'admin@insurai.com',
        '$2a$12$xGxWKAIm5bJjWqmjL9.b6.rB0A8vVCTl4VXClYGYDSKvDHxJi5Y.S', -- BCrypt of Admin@1234
        'ADMIN', TRUE, TRUE);

-- Sample insurance plans
INSERT INTO plans (plan_name, category, monthly_premium, coverage_amount, description, is_active, is_featured) VALUES
('Basic Health Plan',   'HEALTH',     2499.00, 300000.00,  'Essential health coverage for lean teams.',          TRUE, FALSE),
('Premium Health Plan', 'HEALTH',     4999.00, 700000.00,  'Comprehensive health + wellness for growing teams.', TRUE, TRUE),
('Enterprise Plan',     'HEALTH',     8999.00, 2000000.00, 'Full-spectrum coverage for large organizations.',    TRUE, FALSE),
('Group Life Insurance','LIFE',       1999.00, 2500000.00, 'Protect your users and their families.',        TRUE, FALSE),
('Accidental Cover',    'ACCIDENTAL',  999.00, 500000.00,  'Affordable protection against accidents.',          TRUE, FALSE),
('Family Floater',      'ADDON',      2199.00, 500000.00,  'Extend coverage to your entire family.',            TRUE, FALSE);

-- Plan features
INSERT INTO plan_features (plan_id, feature) VALUES
(1, 'In-patient hospitalization'), (1, 'General OPD (20 visits/yr)'), (1, 'Emergency ambulance'),
(2, 'In-patient hospitalization'), (2, 'Outpatient (50 visits/yr)'),  (2, 'Dental & Vision'),
(2, 'Family floater eligible'),    (2, 'Priority agent support'),
(3, 'Unlimited hospitalization'),  (3, 'Unlimited OPD visits'),       (3, 'Full dental & vision'),
(3, 'International coverage'),     (3, 'Full family coverage'),        (3, 'Dedicated account manager'),
(4, 'Term life till age 65'),      (4, 'Accidental death benefit'),    (4, 'Tax benefit under 80C'),
(5, 'Accidental hospitalization'), (5, 'Permanent disability payout'), (5, 'Fracture benefit'),
(6, 'Covers spouse + 2 children'), (6, 'Maternity benefit'),          (6, 'New-born coverage');

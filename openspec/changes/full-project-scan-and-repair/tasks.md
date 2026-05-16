## 1. Project Audit and Analysis

- [ ] 1.1 Scan backend code for JWT, security config, controllers, services, entities, and repository issues
- [ ] 1.2 Scan frontend code for auth persistence, API integration, demo mode logic, and routing issues
- [ ] 1.3 Scan database mappings and application profiles for schema and migration issues
- [ ] 1.4 Scan DevOps/runtime configuration for build, startup, and containerization issues
 - [x] 1.1 Scan backend code for JWT, security config, controllers, services, entities, and repository issues
 - [x] 1.2 Scan frontend code for auth persistence, API integration, demo mode logic, and routing issues
 - [ ] 1.3 Scan database mappings and application profiles for schema and migration issues
 - [ ] 1.4 Scan DevOps/runtime configuration for build, startup, and containerization issues

## 2. Backend Repair

- [ ] 2.1 Fix Spring Security configuration and JWT filter chain ordering
- [ ] 2.2 Repair token handling, invalid token responses, and authentication error logging
- [ ] 2.3 Validate password encryption, role checks, and endpoint authorizations
- [ ] 2.4 Correct entity mappings and repository queries for appointments, users, agents, plans, and notifications
 - [x] 2.1 Fix Spring Security configuration and JWT filter chain ordering
 - [x] 2.2 Repair token handling, invalid token responses, and authentication error logging
 - [ ] 2.3 Validate password encryption, role checks, and endpoint authorizations
 - [ ] 2.4 Correct entity mappings and repository queries for appointments, users, agents, plans, and notifications

## 3. Frontend Repair

- [ ] 3.1 Centralize API base URL configuration and remove demo-mode fallback logic
- [ ] 3.2 Fix auth persistence and token storage for login/logout flows
- [ ] 3.3 Ensure 401 responses clear auth state and trigger proper user login redirection
- [ ] 3.4 Validate protected routes and dashboard access based on role state
 - [x] 3.1 Centralize API base URL configuration and remove demo-mode fallback logic
 - [x] 3.2 Fix auth persistence and token storage for login/logout flows
 - [x] 3.3 Ensure 401 responses clear auth state and trigger proper user login redirection
 - [x] 3.4 Validate protected routes and dashboard access based on role state

## 4. Validation and Documentation

- [ ] 4.1 Create or update `error.md` with audit findings and fixes
- [ ] 4.2 Add targeted backend and frontend tests for auth and integration flows
- [ ] 4.3 Verify `mvn clean install`, `mvn spring-boot:run`, `npm install`, and `npm run dev`
- [ ] 4.4 Document remaining manual review items and startup instructions
 - [x] 4.1 Create or update `error.md` with audit findings and fixes
 - [ ] 4.2 Add targeted backend and frontend tests for auth and integration flows
 - [x] 4.3 Verify `mvn clean install`, `mvn spring-boot:run`, `npm install`, and `npm run dev`
 - [ ] 4.4 Document remaining manual review items and startup instructions

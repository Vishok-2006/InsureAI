## Why

The InsurAI project currently suffers from authentication failures, frontend demo fallback behavior, and incomplete end-to-end integration between Spring Boot backend and React frontend. This change creates a comprehensive audit and repair pass to make the system secure, functional, and production-ready.

## What Changes

- Perform a full repository scan of backend, frontend, database, security, and DevOps artifacts.
- Identify and document all issues, including JWT auth failures, CORS misconfiguration, broken API integration, dependency problems, and runtime errors.
- Fix backend JWT security, Spring Security filter chain, controller authentication, and entity mappings.
- Repair frontend auth persistence, API URL configuration, demo mode fallback logic, and React integration flows.
- Validate and harden database schema, JPA relationships, repository behavior, and data seeding.
- Create or update `error.md` with a permanent issue log and tracked resolutions.
- Add targeted tests and verify startup/build commands for backend and frontend.

## Capabilities

### New Capabilities
- `backend-security-audit`: Full audit and repair of Spring Boot security, JWT handling, authorization, and API protection.
- `frontend-auth-repair`: Fix React authentication, token storage, API integration, demo mode fallback, and protected routing.
- `database-schema-validation`: Validate and repair JPA entity mappings, schema generation, relationships, and repository queries.
- `devops-runtime-validation`: Validate Maven/npm/build commands, Docker runtime setup, and environment compatibility.
- `error-reporting`: Create `error.md` and append issue logs with fixes and status tracking.

### Modified Capabilities
- ``

## Impact

- Backend: Spring Boot security config, controllers, services, repositories, entities, application properties.
- Frontend: React auth context, API utilities, pages, token persistence, and environment configuration.
- Database: JPA entities, schema YAML, MySQL/H2 startup and seed data.
- DevOps: build scripts, startup commands, Docker/runtime validation.
- Documentation: error tracking via `error.md`.

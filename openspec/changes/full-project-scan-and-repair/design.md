## Context

InsurAI is a Spring Boot backend paired with a React frontend. The project currently demonstrates authentication failures, broken backend/frontend integration, and unclear runtime behavior related to demo mode and JWT validation. This design covers a full scan, repair, and validation of the system across security, data, and deployment boundaries.

## Goals / Non-Goals

**Goals:**
- Audit and fix backend JWT authentication, Spring Security filter chain, controller protections, and error handling.
- Repair frontend token persistence, demo mode fallback, API URL configuration, and auth-state synchronization.
- Validate JPA mappings, entity associations, repository behavior, and database schema compatibility with MySQL/H2.
- Harden security settings for tokens, password storage, CORS, and authorization checks.
- Produce a permanent issue log in `error.md` and add test coverage for key auth and integration flows.

**Non-Goals:**
- Replace the current UI design or add major new features beyond repair and validation.
- Introduce a full refresh token system unless strictly required by discovered auth flaws.
- Re-architect the backend into microservices.

## Decisions

- Use a centralized JWT utility and filter pattern to ensure consistent token validation and error handling across all protected endpoints.
- Keep API base URLs configurable through a single frontend environment entrypoint to avoid hardcoded demo-mode fallbacks.
- Maintain current role-based access semantics while tightening endpoint authorization and removing silent failures.
- Use `error.md` as the single source of truth for issues and fixes, appending new findings rather than overwriting history.

## Risks / Trade-offs

- [Risk] Large project repair may uncover deeper flaws in untested modules.
  → Mitigation: Focus first on authentication, security, and clean backend/frontend integration; preserve functionality for unaffected modules.
- [Risk] Fixing JWT security may change client behavior if expired/invalid token handling is altered.
  → Mitigation: Implement clear failure responses and update frontend to handle login redirects explicitly.
- [Risk] Adding validation and tests may extend the implementation window.
  → Mitigation: Prioritize the most critical flows and document remaining manual review items.

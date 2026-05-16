## ADDED Requirements

### Requirement: Backend authentication and JWT validation must be reliable
The backend SHALL validate JWT tokens consistently for protected endpoints and SHALL return explicit HTTP 401 responses for invalid or expired tokens.

#### Scenario: Invalid JWT token rejected
- **WHEN** a client sends a request with a malformed or expired JWT
- **THEN** the backend returns HTTP 401 Unauthorized and logs the token validation failure

### Requirement: Security filter chain must be consistent
The backend SHALL configure Spring Security filter chain so that authentication is applied before authorization checks and CORS is resolved correctly for frontend requests.

#### Scenario: CORS and auth filters order
- **WHEN** the frontend sends a request with Authorization header from a browser origin
- **THEN** the server applies CORS headers and JWT validation in the correct order and does not drop the request silently

### Requirement: Passwords and roles must be protected
The backend SHALL store passwords securely and SHALL enforce role-based access checks for admin, agent, and user endpoints.

#### Scenario: Role-based endpoint enforcement
- **WHEN** a non-admin user calls an admin-only endpoint
- **THEN** the backend returns HTTP 403 Forbidden

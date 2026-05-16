## ADDED Requirements

### Requirement: Frontend authentication state must persist correctly
The React frontend SHALL store and read JWT tokens from a single persistent storage location and SHALL never default to demo mode because of stale or invalid tokens.

#### Scenario: Login stores valid token
- **WHEN** a user logs in successfully
- **THEN** the frontend stores the new JWT and user role and does not enable demo mode

#### Scenario: Invalid token triggers logout
- **WHEN** the frontend receives 401 Unauthorized from the backend
- **THEN** it clears auth state and prompts the user to log in again instead of falling back to demo mode

### Requirement: API base URL configuration must be centralized
The frontend SHALL use a configurable API base URL and SHALL not hardcode the demo backend or switch to fallback APIs automatically.

#### Scenario: API calls use correct base URL
- **WHEN** the frontend makes authenticated API requests
- **THEN** it prefixes requests with the configured backend URL and includes the Authorization header when the user is logged in

## ADDED Requirements

### Requirement: Build and runtime commands must succeed
The project SHALL provide working commands for backend and frontend builds, and SHALL validate that startup commands run without errors in the current workspace.

#### Scenario: Maven builds backend
- **WHEN** `mvn clean install` is executed from the backend root
- **THEN** the build completes successfully without compile errors

#### Scenario: Frontend starts successfully
- **WHEN** `npm install` and `npm run dev` are executed in the React app root
- **THEN** the frontend starts without configuration errors and can reach the backend API

### Requirement: Docker/runtime artifacts must be consistent
The project SHALL document or provide runtime compatibility information for containerized startup.

#### Scenario: Docker compose execution
- **WHEN** a valid docker-compose configuration exists and is used
- **THEN** the services can start with environment variables configured correctly

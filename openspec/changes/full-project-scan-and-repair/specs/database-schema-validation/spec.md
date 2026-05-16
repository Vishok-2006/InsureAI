## ADDED Requirements

### Requirement: Entity relationships must match the data model
The system SHALL define JPA entity relationships with correct ownership, cascade settings, and foreign key mappings for agents, appointments, plans, notifications, and users.

#### Scenario: Appointment entity references valid user and agent
- **WHEN** an appointment is created
- **THEN** the appointment references existing user and agent entities through properly mapped relationships

### Requirement: Schema generation must support MySQL and H2
The backend SHALL provide a schema configuration that works for both development and production profiles and SHALL avoid invalid SQL or unsupported mapping features.

#### Scenario: Application starts with H2 or MySQL
- **WHEN** the backend starts in local or MySQL profile
- **THEN** the schema generation succeeds and the application initializes without JPA mapping errors

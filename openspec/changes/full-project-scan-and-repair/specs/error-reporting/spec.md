## ADDED Requirements

### Requirement: Project issues must be logged permanently
The project SHALL maintain an `error.md` file in the repository root with a running log of detected issues, root causes, fixes, and statuses.

#### Scenario: New issue added to error log
- **WHEN** a new issue is discovered during the audit
- **THEN** it is appended to `error.md` with a unique issue ID, severity, root cause, fix applied, and status

### Requirement: Existing issues must not be overwritten
The project SHALL preserve prior entries in `error.md` and append new entries only.

#### Scenario: Adding a fix updates log
- **WHEN** an issue is fixed and documented
- **THEN** the corresponding entry is appended with the fix and status while preserving previous history

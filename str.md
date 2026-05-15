.
|-- .env
|-- .env.example
|-- .git
|   |-- HEAD
|   |-- config
|   |-- description
|   |-- gk
|   |   `-- config
|   |-- hooks
|   |   |-- applypatch-msg.sample
|   |   |-- commit-msg.sample
|   |   |-- fsmonitor-watchman.sample
|   |   |-- post-update.sample
|   |   |-- pre-applypatch.sample
|   |   |-- pre-commit.sample
|   |   |-- pre-merge-commit.sample
|   |   |-- pre-push.sample
|   |   |-- pre-rebase.sample
|   |   |-- pre-receive.sample
|   |   |-- prepare-commit-msg.sample
|   |   |-- push-to-checkout.sample
|   |   |-- sendemail-validate.sample
|   |   `-- update.sample
|   |-- index
|   |-- info
|   |   `-- exclude
|   |-- logs
|   |   |-- HEAD
|   |   `-- refs
|   |       |-- heads
|   |       |   `-- main
|   |       `-- remotes
|   |           `-- origin
|   |               `-- HEAD
|   |-- objects
|   |   |-- info
|   |   `-- pack
|   |       |-- pack-faa4c24d7be63ae5354152b2c1e6a951ddd5d7da.idx
|   |       |-- pack-faa4c24d7be63ae5354152b2c1e6a951ddd5d7da.pack
|   |       `-- pack-faa4c24d7be63ae5354152b2c1e6a951ddd5d7da.rev
|   |-- packed-refs
|   `-- refs
|       |-- heads
|       |   `-- main
|       |-- remotes
|       |   `-- origin
|       |       `-- HEAD
|       `-- tags
|-- .github
|   `-- java-upgrade
|       |-- .gitignore
|       `-- hooks
|           `-- scripts
|               |-- recordToolUse.ps1
|               `-- recordToolUse.sh
|-- .gitignore
|-- README.md
|-- backend
|   |-- .factorypath
|   |-- pom.xml
|   |-- src
|   |   `-- main
|   |       |-- java
|   |       |   `-- com
|   |       |       `-- insurai
|   |       |           |-- InsurAIApplication.java
|   |       |           |-- config
|   |       |           |   |-- DataSeeder.java
|   |       |           |   `-- SecurityConfig.java
|   |       |           |-- controller
|   |       |           |   |-- AgentController.java
|   |       |           |   |-- AppointmentController.java
|   |       |           |   |-- AuthController.java
|   |       |           |   |-- NotificationController.java
|   |       |           |   `-- PlanController.java
|   |       |           |-- dto
|   |       |           |   |-- ApiResponse.java
|   |       |           |   |-- AppointmentDTOs.java
|   |       |           |   `-- AuthDTOs.java
|   |       |           |-- model
|   |       |           |   |-- Agent.java
|   |       |           |   |-- Appointment.java
|   |       |           |   |-- Notification.java
|   |       |           |   |-- Plan.java
|   |       |           |   `-- User.java
|   |       |           |-- repository
|   |       |           |   |-- AgentRepository.java
|   |       |           |   |-- AppointmentRepository.java
|   |       |           |   |-- NotificationRepository.java
|   |       |           |   |-- PlanRepository.java
|   |       |           |   `-- UserRepository.java
|   |       |           |-- security
|   |       |           |   |-- JwtFilter.java
|   |       |           |   `-- JwtUtil.java
|   |       |           `-- service
|   |       |               |-- AgentService.java
|   |       |               |-- AppointmentService.java
|   |       |               |-- AuthService.java
|   |       |               |-- NotificationService.java
|   |       |               |-- PlanService.java
|   |       |               `-- UserDetailsServiceImpl.java
|   |       `-- resources
|   |           |-- application-local.yml
|   |           |-- application-mysql.yml
|   |           |-- application.yml
|   |           `-- schema.sql
|   `-- target
|       |-- classes
|       |   |-- application-local.yml
|       |   |-- application-mysql.yml
|       |   |-- application.yml
|       |   `-- schema.sql
|       |-- generated-sources
|       |   `-- annotations
|       `-- maven-status
|           `-- maven-compiler-plugin
|               `-- compile
|                   `-- default-compile
|                       `-- inputFiles.lst
|-- frontend
|   |-- assets
|   |   |-- css
|   |   |   `-- main.css
|   |   `-- js
|   |       `-- app.js
|   |-- index.html
|   `-- pages
|       |-- admin-dashboard.html
|       |-- agent-dashboard.html
|       |-- auth.html
|       |-- class-diagram.html
|       |-- employee-dashboard.html
|       `-- plans.html
|-- package-lock.json
|-- react-app
|   |-- .env.example
|   |-- .gitignore
|   |-- README.md
|   |-- eslint.config.js
|   |-- index.html
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   |   `-- vite.svg
|   |-- src
|   |   |-- App.css
|   |   |-- App.jsx
|   |   |-- assets
|   |   |   `-- react.svg
|   |   |-- components
|   |   |   |-- Navbar.jsx
|   |   |   |-- ToastProvider.jsx
|   |   |   `-- toastContext.js
|   |   |-- context
|   |   |   |-- AuthContext.jsx
|   |   |   `-- authContext.js
|   |   |-- index.css
|   |   |-- main.jsx
|   |   |-- pages
|   |   |   |-- AdminDash.jsx
|   |   |   |-- AgentDash.jsx
|   |   |   |-- AuthPage.jsx
|   |   |   |-- ClassDiagram.jsx
|   |   |   |-- HomePage.jsx
|   |   |   |-- PlansPage.jsx
|   |   |   `-- UserDash.jsx
|   |   `-- utils
|   |       |-- api.js
|   |       `-- mockData.js
|   `-- vite.config.js
`-- str.md

57 directories, 115 files

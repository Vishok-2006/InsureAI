package com.insurai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * InsurAI – AI-Powered Corporate Insurance Automation & Intelligence System
 * Spring Boot Application Entry Point
 *
 * Features:
 *  - JWT-based authentication with role-based access control
 *  - User / Agent / Admin portals
 *  - Appointment scheduling with conflict prevention
 *  - Insurance plan management
 *  - Email & SMS notification system
 *  - Voice AI query handling integration
 *  - Analytics dashboard for admins
 *
 * @author InsurAI Development Team
 * @version 1.0.0
 */
@SpringBootApplication
@EnableAsync        // For async email/SMS sending
@EnableScheduling   // For scheduled reminders and renewals
public class InsurAIApplication {

    public static void main(String[] args) {
        SpringApplication.run(InsurAIApplication.class, args);
        System.out.println("""
            ╔══════════════════════════════════════════════════╗
            ║      InsurAI Backend – Server Started! 🛡️         ║
            ║   REST API available at http://localhost:8080    ║
            ║   Corporate Insurance Automation & AI System     ║
            ╚══════════════════════════════════════════════════╝
            """);
    }
}

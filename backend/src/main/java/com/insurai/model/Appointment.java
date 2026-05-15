package com.insurai.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Appointment entity – represents a scheduled meeting between an User and an Agent.
 * Stored in the 'appointments' table.
 * Includes conflict-prevention through (agentId, appointmentDate, appointmentTime) unique constraint.
 */
@Entity
@Table(name = "appointments", uniqueConstraints = {
    @UniqueConstraint(name = "uk_agent_date_time",
        columnNames = {"agent_id", "appointment_date", "appointment_time"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User is required")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "agent_id", nullable = false)
    @NotNull(message = "Agent is required")
    private Agent agent;

    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    @NotBlank(message = "Reason is required")
    @Size(max = 255)
    @Column(nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MeetingMode mode = MeetingMode.VIDEO_CALL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Size(max = 1000)
    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private java.util.List<Notification> relatedNotifications;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ── Enums ─────────────────────────────────────────────────
    public enum MeetingMode {
        VIDEO_CALL, PHONE_CALL, IN_PERSON
    }

    public enum AppointmentStatus {
        PENDING,       // Waiting for agent acceptance
        CONFIRMED,     // Agent accepted
        REJECTED,      // Agent rejected
        COMPLETED,     // Meeting done
        CANCELLED,     // Cancelled by user or agent
        RESCHEDULED    // Moved to new time
    }
}

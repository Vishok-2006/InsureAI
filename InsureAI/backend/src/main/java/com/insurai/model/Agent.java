package com.insurai.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Agent entity – represents an insurance agent.
 * Stored in the 'agents' table.
 */
@Entity
@Table(name = "agents", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = "license_no")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(length = 20)
    private String phone;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String company;

    @Column(name = "license_no", unique = true, length = 50)
    private String licenseNo;

    @Column(length = 100)
    private String specialization;

    @Min(0) @Max(50)
    @Column(name = "years_experience")
    @Builder.Default
    private Integer yearsExperience = 0;

    @DecimalMin("0.0") @DecimalMax("5.0")
    @Column(name = "average_rating", precision = 3, scale = 2)
    @Builder.Default
    private Double averageRating = 0.0;

    @Column(name = "total_reviews")
    @Builder.Default
    private Integer totalReviews = 0;

    @Column(name = "is_available", nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "profile_bio", columnDefinition = "TEXT")
    private String profileBio;

    @OneToMany(mappedBy = "agent", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    // Availability stored as JSON (days + time slots)
    @Column(name = "availability_json", columnDefinition = "TEXT")
    private String availabilityJson;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public String getFullName() {
        return firstName + " " + lastName;
    }
}

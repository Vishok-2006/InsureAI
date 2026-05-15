package com.insurai.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Plan entity – represents a corporate insurance plan.
 * Stored in the 'plans' table.
 */
@Entity
@Table(name = "plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Plan name is required")
    @Size(max = 100)
    @Column(name = "plan_name", nullable = false, length = 100)
    private String planName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PlanCategory category;

    @NotNull(message = "Monthly premium is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Premium must be positive")
    @Column(name = "monthly_premium", nullable = false, precision = 12, scale = 2)
    private BigDecimal monthlyPremium;

    @NotNull(message = "Coverage amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Coverage must be positive")
    @Column(name = "coverage_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal coverageAmount;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @Size(max = 500)
    @Column(length = 500)
    private String eligibility;

    @ElementCollection
    @CollectionTable(name = "plan_features", joinColumns = @JoinColumn(name = "plan_id"))
    @Column(name = "feature", length = 200)
    private List<String> features;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @ManyToMany(mappedBy = "plans")
    private List<User> subscribers;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public int getSubscriberCount() {
        return subscribers == null ? 0 : subscribers.size();
    }

    public enum PlanCategory {
        HEALTH, LIFE, ACCIDENTAL, GROUP, ADDON
    }
}

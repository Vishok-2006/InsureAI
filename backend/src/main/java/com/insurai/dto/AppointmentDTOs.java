package com.insurai.dto;

import com.insurai.model.Appointment.AppointmentStatus;
import com.insurai.model.Appointment.MeetingMode;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Appointment Data Transfer Objects.
 */
public class AppointmentDTOs {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AppointmentRequest {
        @NotNull(message = "Agent ID is required")
        private Long agentId;

        @NotNull(message = "Appointment date is required")
        @Future(message = "Appointment date must be in the future")
        private LocalDate date;

        @NotNull(message = "Appointment time is required")
        private LocalTime time;

        @NotBlank(message = "Reason is required")
        private String reason;

        private MeetingMode mode;
        private String notes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AppointmentResponse {
        private Long id;
        private Long userId;
        private String userName;
        private Long agentId;
        private String agentName;
        private LocalDate date;
        private LocalTime time;
        private String reason;
        private MeetingMode mode;
        private AppointmentStatus status;
        private String notes;
        private LocalDateTime createdAt;
    }
}

package com.insurai.controller;

import com.insurai.dto.*;
import com.insurai.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Appointment management.
 * Handles booking, confirmation, cancellation, and query operations.
 */
@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /**
     * POST /appointments/book
     * Book a new appointment (User only).
     * Prevents conflicts at service layer.
     */
    @PostMapping("/book")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<AppointmentDTOs.AppointmentResponse>> bookAppointment(
            @Valid @RequestBody AppointmentDTOs.AppointmentRequest request) {
        AppointmentDTOs.AppointmentResponse response = appointmentService.bookAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("Appointment booked successfully", response));
    }

    /**
     * GET /appointments/user/{userId}
     * Get all appointments for an user.
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<AppointmentDTOs.AppointmentResponse>>> getUserAppointments(
            @PathVariable Long userId, Pageable pageable) {
        Page<AppointmentDTOs.AppointmentResponse> page = appointmentService.getAppointmentsForUser(userId, pageable);
        return ResponseEntity.ok(ApiResponse.success("User appointments retrieved", page));
    }

    /**
     * GET /appointments/agent/{agentId}
     * Get all appointments for an agent.
     */
    @GetMapping("/agent/{agentId}")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<AppointmentDTOs.AppointmentResponse>>> getAgentAppointments(
            @PathVariable Long agentId, Pageable pageable) {
        Page<AppointmentDTOs.AppointmentResponse> page = appointmentService.getAppointmentsForAgent(agentId, pageable);
        return ResponseEntity.ok(ApiResponse.success("Agent appointments retrieved", page));
    }

    /**
     * PUT /appointments/{id}/accept
     * Agent accepts a pending appointment.
     */
    @PutMapping("/{id}/accept")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<ApiResponse<AppointmentDTOs.AppointmentResponse>> acceptAppointment(
            @PathVariable Long id) {
        AppointmentDTOs.AppointmentResponse response = appointmentService.acceptAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment confirmed", response));
    }

    /**
     * PUT /appointments/{id}/reject
     * Agent rejects a pending appointment.
     */
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<ApiResponse<AppointmentDTOs.AppointmentResponse>> rejectAppointment(
            @PathVariable Long id, @RequestBody(required = false) String reason) {
        AppointmentDTOs.AppointmentResponse response = appointmentService.rejectAppointment(id, reason);
        return ResponseEntity.ok(ApiResponse.success("Appointment rejected", response));
    }

    /**
     * PUT /appointments/{id}/cancel
     * Cancel an appointment (User, Agent, or Admin).
     */
    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('USER', 'AGENT', 'ADMIN')")
    public ResponseEntity<ApiResponse<AppointmentDTOs.AppointmentResponse>> cancelAppointment(
            @PathVariable Long id) {
        AppointmentDTOs.AppointmentResponse response = appointmentService.cancelAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment cancelled", response));
    }

    /**
     * PUT /appointments/{id}/complete
     * Mark an appointment as completed (Agent only).
     */
    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<ApiResponse<AppointmentDTOs.AppointmentResponse>> completeAppointment(
            @PathVariable Long id) {
        AppointmentDTOs.AppointmentResponse response = appointmentService.completeAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment marked as completed", response));
    }

    /**
     * GET /appointments
     * Get all appointments (Admin only), with pagination and filters.
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<AppointmentDTOs.AppointmentResponse>>> getAllAppointments(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String agentId,
            Pageable pageable) {
        Page<AppointmentDTOs.AppointmentResponse> page = appointmentService.getAllAppointments(status, agentId, pageable);
        return ResponseEntity.ok(ApiResponse.success("All appointments retrieved", page));
    }

    /**
     * GET /appointments/check-conflict
     * Check if an agent is available at a specific date/time.
     */
    @GetMapping("/check-conflict")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Boolean>> checkConflict(
            @RequestParam Long agentId,
            @RequestParam String date,
            @RequestParam String time) {
        boolean hasConflict = appointmentService.hasConflict(agentId, date, time);
        return ResponseEntity.ok(ApiResponse.success("Conflict check complete", hasConflict));
    }
}

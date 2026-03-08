package com.insurai.service;

import com.insurai.dto.AppointmentDTOs.*;
import com.insurai.model.Agent;
import com.insurai.model.Appointment;
import com.insurai.model.Appointment.AppointmentStatus;
import com.insurai.model.Notification.NotificationType;
import com.insurai.model.User;
import com.insurai.repository.AgentRepository;
import com.insurai.repository.AppointmentRepository;
import com.insurai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final NotificationService notificationService;

    @Transactional
    public AppointmentResponse bookAppointment(AppointmentRequest request) {
        Agent agent = agentRepository.findById(request.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        // Check for conflict
        if (appointmentRepository.existsByAgentAndAppointmentDateAndAppointmentTime(agent, request.getDate(), request.getTime())) {
            throw new RuntimeException("Time slot already booked for this agent");
        }

        // Get current user (from context in real app, placeholder for now)
        // User user = getCurrentUser(); 
        User user = userRepository.findAll().stream().findFirst().orElse(null); // STUB

        Appointment appointment = Appointment.builder()
                .user(user)
                .agent(agent)
                .appointmentDate(request.getDate())
                .appointmentTime(request.getTime())
                .reason(request.getReason())
                .mode(request.getMode() != null ? request.getMode() : Appointment.MeetingMode.VIDEO_CALL)
                .status(AppointmentStatus.PENDING)
                .notes(request.getNotes())
                .build();

        appointment = appointmentRepository.save(appointment);
        
        // Notify user
        notificationService.createNotification(user, "Appointment Request Sent", 
                "Your appointment request with " + agent.getFullName() + " for " + request.getDate() + " is pending.",
                NotificationType.APPOINTMENT_REMINDER);

        return mapToResponse(appointment);
    }

    public Page<AppointmentResponse> getAppointmentsForUser(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<AppointmentResponse> list = appointmentRepository.findByUser(user).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
        return new PageImpl<>(list, pageable, list.size());
    }

    public Page<AppointmentResponse> getAppointmentsForAgent(Long agentId, Pageable pageable) {
        Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
        List<AppointmentResponse> list = appointmentRepository.findByAgent(agent).stream()
                .map(this::mapToResponse).collect(Collectors.toList());
        return new PageImpl<>(list, pageable, list.size());
    }

    @Transactional
    public AppointmentResponse acceptAppointment(Long id) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(AppointmentStatus.CONFIRMED);
        appt = appointmentRepository.save(appt);
        
        notificationService.createNotification(appt.getUser(), "Appointment Confirmed", 
                "Your appointment with " + appt.getAgent().getFullName() + " on " + appt.getAppointmentDate() + " has been confirmed.",
                NotificationType.APPOINTMENT_CONFIRMATION);

        return mapToResponse(appt);
    }

    @Transactional
    public AppointmentResponse rejectAppointment(Long id, String reason) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(AppointmentStatus.REJECTED);
        appt.setNotes(appt.getNotes() + "\nRejection Reason: " + reason);
        return mapToResponse(appointmentRepository.save(appt));
    }

    @Transactional
    public AppointmentResponse cancelAppointment(Long id) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(AppointmentStatus.CANCELLED);
        return mapToResponse(appointmentRepository.save(appt));
    }

    @Transactional
    public AppointmentResponse completeAppointment(Long id) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        appt.setStatus(AppointmentStatus.COMPLETED);
        return mapToResponse(appointmentRepository.save(appt));
    }

    public Page<AppointmentResponse> getAllAppointments(String status, String agentId, Pageable pageable) {
        List<AppointmentResponse> list = appointmentRepository.findAll().stream()
                .map(this::mapToResponse).collect(Collectors.toList());
        return new PageImpl<>(list, pageable, list.size());
    }

    public boolean hasConflict(Long agentId, String date, String time) {
        Agent agent = agentRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
        return appointmentRepository.existsByAgentAndAppointmentDateAndAppointmentTime(
                agent, LocalDate.parse(date), LocalTime.parse(time));
    }

    private AppointmentResponse mapToResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .userId(a.getUser().getId())
                .userName(a.getUser().getFullName())
                .agentId(a.getAgent().getId())
                .agentName(a.getAgent().getFullName())
                .date(a.getAppointmentDate())
                .time(a.getAppointmentTime())
                .reason(a.getReason())
                .mode(a.getMode())
                .status(a.getStatus())
                .notes(a.getNotes())
                .createdAt(a.getCreatedAt())
                .build();
    }
}

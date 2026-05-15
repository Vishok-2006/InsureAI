package com.insurai.repository;

import com.insurai.model.Agent;
import com.insurai.model.Appointment;
import com.insurai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByAgent(Agent agent);
    
    // Check for conflicts
    boolean existsByAgentAndAppointmentDateAndAppointmentTime(Agent agent, LocalDate date, LocalTime time);
}

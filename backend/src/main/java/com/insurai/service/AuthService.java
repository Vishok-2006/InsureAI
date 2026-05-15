package com.insurai.service;

import com.insurai.dto.AuthDTOs.*;
import com.insurai.model.Agent;
import com.insurai.model.User;
import com.insurai.repository.AgentRepository;
import com.insurai.repository.UserRepository;
import com.insurai.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()) || agentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        if ("AGENT".equalsIgnoreCase(request.getRole())) {
            Agent agent = Agent.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .phone(request.getPhone())
                    .company("LIC Corp") // Default
                    .isActive(true)
                    .isAvailable(true)
                    .build();
            agentRepository.save(agent);
        } else {
            User user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .phone(request.getPhone())
                    .role(User.Role.USER)
                    .isActive(true)
                    .userId("USER-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                    .emailVerified(false)
                    .emailVerificationToken(UUID.randomUUID().toString())
                    .build();
            userRepository.save(user);
            // In a real app, send email here
        }
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String email = request.getEmail();
        String role = "USER";
        String firstName = "";
        String lastName = "";

        // Check user
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            role = userOpt.get().getRole().name();
            firstName = userOpt.get().getFirstName();
            lastName = userOpt.get().getLastName();
        } else {
            // Check agent
            var agentOpt = agentRepository.findByEmail(email);
            if (agentOpt.isPresent()) {
                role = "AGENT";
                firstName = agentOpt.get().getFirstName();
                lastName = agentOpt.get().getLastName();
            }
        }

        String token = jwtUtil.generateToken(email, role);
        return LoginResponse.builder()
                .token(token)
                .refreshToken(UUID.randomUUID().toString()) // Placeholder
                .email(email)
                .role(role)
                .firstName(firstName)
                .lastName(lastName)
                .build();
    }

    public void verifyEmail(String token) {
        // Find user by token
        // Mark verified
        // For now, stub
    }

    public void sendPasswordResetEmail(String email) {
        // Find user, generate token, send email
        // Stub
    }

    public void resetPassword(String token, String newPassword) {
        // Find user by token, update password
        // Stub
    }

    public LoginResponse refreshToken(String refreshToken) {
        // Validate refresh token and issue new one
        // Stub
        return null;
    }
}

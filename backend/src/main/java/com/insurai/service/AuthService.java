package com.insurai.service;

import com.insurai.dto.AuthDTOs.*;
import com.insurai.model.Agent;
import com.insurai.model.User;
import com.insurai.repository.AgentRepository;
import com.insurai.repository.UserRepository;
import com.insurai.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AgentRepository agentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    private final Map<String, RefreshTokenInfo> refreshTokenStore = new ConcurrentHashMap<>();

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail()) || agentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        if ("AGENT".equalsIgnoreCase(request.getRole())) {
            Agent agent = Agent.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .passwordHash(passwordEncoder.encode(request.getPassword()))
                    .phone(request.getPhone())
                    .company("LIC Corp")
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

        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            role = userOpt.get().getRole().name();
            firstName = userOpt.get().getFirstName();
            lastName = userOpt.get().getLastName();
        } else {
            var agentOpt = agentRepository.findByEmail(email);
            if (agentOpt.isPresent()) {
                role = "AGENT";
                firstName = agentOpt.get().getFirstName();
                lastName = agentOpt.get().getLastName();
            }
        }

        String token = jwtUtil.generateToken(email, role);
        String refreshToken = UUID.randomUUID().toString();
        refreshTokenStore.put(refreshToken, new RefreshTokenInfo(email, LocalDateTime.now().plusSeconds(refreshExpiration / 1000)));

        return LoginResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .email(email)
                .role(role)
                .firstName(firstName)
                .lastName(lastName)
                .build();
    }

    public void verifyEmail(String token) {
        // Placeholder implementation; no-op for current scope
    }

    public void sendPasswordResetEmail(String email) {
        // Placeholder implementation; no-op for current scope
    }

    public void resetPassword(String token, String newPassword) {
        // Placeholder implementation; no-op for current scope
    }

    public LoginResponse refreshToken(String refreshToken) {
        cleanupExpiredRefreshTokens();
        RefreshTokenInfo info = refreshTokenStore.get(refreshToken);
        if (info == null || info.getExpiry().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Refresh token is invalid or expired");
        }

        String email = info.getEmail();
        var userOpt = userRepository.findByEmail(email);
        var agentOpt = agentRepository.findByEmail(email);

        String role = userOpt.map(user -> user.getRole().name()).orElseGet(() -> agentOpt.isPresent() ? "AGENT" : "USER");
        String firstName = userOpt.map(User::getFirstName).orElseGet(() -> agentOpt.map(Agent::getFirstName).orElse(""));
        String lastName = userOpt.map(User::getLastName).orElseGet(() -> agentOpt.map(Agent::getLastName).orElse(""));

        String token = jwtUtil.generateToken(email, role);
        String newRefreshToken = UUID.randomUUID().toString();
        refreshTokenStore.remove(refreshToken);
        refreshTokenStore.put(newRefreshToken, new RefreshTokenInfo(email, LocalDateTime.now().plusSeconds(refreshExpiration / 1000)));

        return LoginResponse.builder()
                .token(token)
                .refreshToken(newRefreshToken)
                .email(email)
                .role(role)
                .firstName(firstName)
                .lastName(lastName)
                .build();
    }

    private void cleanupExpiredRefreshTokens() {
        refreshTokenStore.entrySet().removeIf(entry -> entry.getValue().getExpiry().isBefore(LocalDateTime.now()));
    }

    private static class RefreshTokenInfo {
        private final String email;
        private final LocalDateTime expiry;

        public RefreshTokenInfo(String email, LocalDateTime expiry) {
            this.email = email;
            this.expiry = expiry;
        }

        public String getEmail() {
            return email;
        }

        public LocalDateTime getExpiry() {
            return expiry;
        }
    }
}

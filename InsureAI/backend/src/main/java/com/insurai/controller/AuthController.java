package com.insurai.controller;

import com.insurai.dto.*;
import com.insurai.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication REST Controller – handles registration, login, email verification,
 * and password reset flows.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /auth/register
     * Register a new user (User or Agent).
     * Sends a verification email on success.
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(
            @Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(
            "Registration successful! Please verify your email to activate your account.", null));
    }

    /**
     * POST /auth/login
     * Authenticate user and return a JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        LoginResponse loginResp = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", loginResp));
    }

    /**
     * POST /auth/forgot-password
     * Send a password reset link to the user's email.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @RequestParam String email) {
        authService.sendPasswordResetEmail(email);
        return ResponseEntity.ok(ApiResponse.success(
            "Password reset link sent to your email.", null));
    }

    /**
     * POST /auth/reset-password
     * Reset password using the token from email.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {
        authService.resetPassword(token, newPassword);
        return ResponseEntity.ok(ApiResponse.success("Password updated successfully.", null));
    }

    /**
     * GET /auth/verify-email
     * Verify user email using the verification token.
     */
    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @RequestParam String token) {
        authService.verifyEmail(token);
        return ResponseEntity.ok(ApiResponse.success("Email verified successfully!", null));
    }

    /**
     * POST /auth/refresh
     * Refresh JWT token (if refresh token is provided).
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(
            @RequestHeader("Refresh-Token") String refreshToken) {
        LoginResponse resp = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", resp));
    }
}

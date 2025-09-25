package com.sweetshop.backend.controller;

import com.sweetshop.backend.dto.LoginDto;
import com.sweetshop.backend.dto.RegisterDto;
import com.sweetshop.backend.dto.response.JwtAuthResponse;
import com.sweetshop.backend.model.User;
import com.sweetshop.backend.repository.UserRepository;
import com.sweetshop.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to connect
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    // Constructor injection
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    /**
     * Handles user registration.
     * @param registerDto The registration data transfer object.
     * @return A response entity indicating success or failure.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDto registerDto) {
        try {
            String response = authService.register(registerDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Handles user login and returns a JWT.
     * @param loginDto The login data transfer object.
     * @return A response entity containing the JWT and user details.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDto loginDto) {
        try {
            String token = authService.login(loginDto);

            // Fetch user details to include in the response (e.g., role)
            User user = userRepository.findByUsername(loginDto.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setToken(token);
            jwtAuthResponse.setUser(user);

            return ResponseEntity.ok(jwtAuthResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
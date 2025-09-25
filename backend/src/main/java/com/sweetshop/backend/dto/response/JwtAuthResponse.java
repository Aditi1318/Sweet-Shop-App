package com.sweetshop.backend.dto.response;

import com.sweetshop.backend.model.User;
import lombok.Data;

/**
 * DTO for sending JWT token and user details upon successful authentication.
 */
@Data
public class JwtAuthResponse {

    /**
     * The JWT access token.
     */
    private String token;

    /**
     * The authenticated user's details (excluding sensitive information like password).
     */
    private User user;
}
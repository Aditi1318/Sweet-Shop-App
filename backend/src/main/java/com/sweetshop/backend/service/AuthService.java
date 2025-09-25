package com.sweetshop.backend.service;

import com.sweetshop.backend.dto.LoginDto;
import com.sweetshop.backend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
}
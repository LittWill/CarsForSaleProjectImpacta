package com.wnra.carsforsale.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;

    public String authenticate(Authentication authentication){
        return jwtService.generateToken(authentication);
    }
}

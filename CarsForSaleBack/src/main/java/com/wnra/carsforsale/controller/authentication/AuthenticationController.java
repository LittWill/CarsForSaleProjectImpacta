package com.wnra.carsforsale.controller.authentication;

import com.wnra.carsforsale.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("authenticate")
    public ResponseEntity<String> authenticate(Authentication authentication) {
        return ResponseEntity.ok(authenticationService.authenticate(authentication));
    }

}

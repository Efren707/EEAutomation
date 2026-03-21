package com.eeautomation.backend.controller;

import com.eeautomation.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public Map<String, String> getCurrentUser(Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("Unauthorized");
        }

        String email = (String) authentication.getPrincipal();

        return Map.of(
                "email", email
        );
    }

    @PutMapping("/update-email")
    public Map<String, String> updateEmail(
            Authentication auth,
            @RequestBody Map<String, String> body) {

        String currentEmail = (String) auth.getPrincipal();
        String newEmail = body.get("email");

        userService.updateEmail(currentEmail, newEmail);

        return Map.of("message", "Email updated");
    }

    @PutMapping("/change-password")
    public Map<String, String> changePassword(
            Authentication auth,
            @RequestBody Map<String, String> body) {

        String email = (String) auth.getPrincipal();

        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");

        userService.changePassword(email, oldPassword, newPassword);

        return Map.of("message", "Password updated");
    }
}
package com.todo.controllers;

import com.todo.exception.InvalidCredentialsException;
import com.todo.models.LoginResponse;
import com.todo.models.User;
import com.todo.repository.UserRepository;
import com.todo.services.AuthService;
import com.todo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RestController
public class AuthController {

    private final UserRepository userRepository;

    private final JWTUtil jwtUtil;

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository, JWTUtil jwtUtil) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("api/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            return ResponseEntity.ok(authService.validationCredentials(user));
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred during login");
        }
    }

    /*
    --> Ver esto:
    @PostMapping("api/check_user")
    public boolean checkUser(@RequestParam("email")String email) {
        List<User> list = userRepository.findByEmail(email);
        return(!list.isEmpty());
    }*/
}

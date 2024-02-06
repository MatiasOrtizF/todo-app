package com.todo.services;

import com.todo.exception.InvalidCredentialsException;
import com.todo.models.LoginResponse;
import com.todo.models.User;
import com.todo.repository.UserRepository;
import com.todo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public AuthService(JWTUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    public boolean validationToken (String token) {
        String userId = jwtUtil.getKey(token);
        return (userId != null);
    }

    public User validationEmail (String email) {
        return userRepository.findByEmail(email);
    }

    public String validationCredentials (User user) {
        User userLogged = validationEmail(user.getEmail());
        if(userLogged != null) {
            String passwordHashed = userLogged.getPassword();

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            if(argon2.verify(passwordHashed, user.getPassword())) {
                userLogged.setPassword("");
                String tokenJWT = jwtUtil.create(userLogged.getId().toString(), userLogged.getEmail());
                return tokenJWT;
            }
        } throw new InvalidCredentialsException("Invalid email or password");
    }
}

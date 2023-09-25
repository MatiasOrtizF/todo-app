package com.todo.services;

import com.todo.models.User;
import com.todo.repository.UserRepository;
import com.todo.utils.JWTUtil;
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

    public List<User> validationEmail (String email) {
        List<User> list = userRepository.findByEmail(email);
        return(list);
    }
}

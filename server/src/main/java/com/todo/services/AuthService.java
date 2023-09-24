package com.todo.services;

import com.todo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private JWTUtil jwtUtil;
    public boolean validationToken (String token) {
        String userId = jwtUtil.getKey(token);
        return (userId != null);
    }
}

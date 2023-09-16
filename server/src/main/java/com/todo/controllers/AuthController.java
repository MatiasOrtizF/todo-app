package com.todo.controllers;

import com.todo.models.LoginResponse;
import com.todo.models.User;
import com.todo.repository.UserRepository;
import com.todo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user) {
        List<User> list = userRepository.findByEmail(user.getEmail());

        if(!list.isEmpty()) {
            User userLogged = list.get(0);
            String passwordHashed = userLogged.getPassword();

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            if(argon2.verify(passwordHashed, user.getPassword())) {
                String tokenJwt = jwtUtil.create(userLogged.getId().toString(), userLogged.getEmail());

                LoginResponse response = new LoginResponse();
                response.setToken(tokenJwt);
                response.setUser(userLogged);

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

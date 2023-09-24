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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;


    @PostMapping("api/login")
    public ResponseEntity<?> login(@RequestBody User user) {
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
        return ResponseEntity.badRequest().body("Email or password is incorrect");
    }

    @PostMapping("api/check_user")
    public boolean checkUser(@RequestParam("email")String email) {
        List<User> list = userRepository.findByEmail(email);
        return(!list.isEmpty());
    }
}

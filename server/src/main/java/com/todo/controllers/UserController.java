package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.User;
import com.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/user")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));
        return ResponseEntity.ok(user);
    }
}

package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.LoginResponse;
import com.todo.models.Todo;
import com.todo.models.User;
import com.todo.repository.TodoRepository;
import com.todo.utils.JWTUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("/api/todo")
    public ResponseEntity<?> getAllTodo(@RequestHeader(value="Authorization")String token) {
        String userId = jwtUtil.getKey(token);
        if(userId != null) {
            List<Todo> list = todoRepository.findByUserId(Long.valueOf(userId));
            return ResponseEntity.ok(list);
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/api/todo")
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @GetMapping("/api/todo/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));
        return ResponseEntity.ok(todo);
    }

    @PutMapping("/api/todo/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));

        todo.setCompleted(!todo.getCompleted());

        Todo todoUpdated = todoRepository.save(todo);
        return ResponseEntity.ok(todoUpdated);
    }

    @DeleteMapping("/api/todo/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteTodo(@PathVariable Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));

        todoRepository.delete(todo);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    
}

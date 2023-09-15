package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RestController
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/api/todo")
    public List<Todo> getAllTodo() {
        return todoRepository.findAll();
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

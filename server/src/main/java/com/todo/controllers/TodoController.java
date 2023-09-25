package com.todo.controllers;

import com.todo.models.Todo;
import com.todo.services.TodoService;
import com.todo.services.TodoSharedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RequestMapping("/api/todo")
@RestController
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTodo(@RequestHeader(value="Authorization")String token) {
        List<Todo> list = todoService.getAllTodo(token);
        if(list != null) {
            return ResponseEntity.ok(list);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @PostMapping
    public ResponseEntity<?> addTodo(@RequestBody Todo todo, @RequestHeader(value="Authorization")String token) {
        Todo addedtodo = todoService.addTodo(todo, token);
        if(addedtodo != null) {
            return ResponseEntity.ok(addedtodo);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        Todo todo = todoService.getTodo(id, token);
        if(todo != null) {
            return ResponseEntity.ok(todo);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        Todo todo = todoService.updateTodo(id, token);
        if(todo != null) {
            return ResponseEntity.ok(todo);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        boolean deleted = todoService.deleteTodo(id, token);
        if(deleted) {
            Map<String,Boolean> response = new HashMap<>();
            response.put("deleted",Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @DeleteMapping("/completed")
    public ResponseEntity<?> deleteCompletedTodos(@RequestHeader(value="Authorization")String token) {
        boolean deletedCompleted = todoService.deleteCompletedTodos(token);
        if(deletedCompleted) {
            Map<String,Boolean> response = new HashMap<>();
            response.put("deleted",Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }
    
}

package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.exception.UnauthorizedException;
import com.todo.exception.UserMismatchException;
import com.todo.models.Todo;
import com.todo.services.TodoService;
import com.todo.services.TodoSharedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
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
        try {
            return ResponseEntity.ok(todoService.getAllTodo(token));
        } catch(UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: Invalid token");
        }
    }

    @PostMapping
    public ResponseEntity<?> addTodo(@RequestParam String task, @RequestHeader(value="Authorization")String token) {
        try {
            return ResponseEntity.ok(todoService.addTodo(task, token));
        } catch (ResourceNotFoundExpection e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doest no exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: invalid token");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        try {
            return ResponseEntity.ok(todoService.getTodo(id, token));
        } catch (ResourceNotFoundExpection e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo doest no exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: invalid token");
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<?> completeTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        try {
            return ResponseEntity.ok(todoService.completeTodo(id, token));
        } catch (ResourceNotFoundExpection e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo doest no exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: invalid token");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        try {
            return ResponseEntity.ok(todoService.deleteTodo(id, token));
        } catch (UserMismatchException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User Mismatch");
        } catch (ResourceNotFoundExpection e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo doest no exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: invalid token");
        }
    }

    @DeleteMapping("/completed")
    public ResponseEntity<?> deleteCompletedTodos(@RequestHeader(value="Authorization")String token) {
        try {
            return ResponseEntity.ok(todoService.deleteCompletedTodos(token));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: invalid token");
        }
    }
}

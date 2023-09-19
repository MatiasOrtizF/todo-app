package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.repository.TodoSharedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RestController
public class TodoSharedController {
    @Autowired
    private TodoSharedRepository todoSharedRepository;

    @GetMapping("/api/todo_shared")
    public List<TodoShared> getAllTodoShared() {
        return todoSharedRepository.findAll();
    }

    @PostMapping("/api/todo_shared")
    public TodoShared addTodoShared(@RequestBody TodoShared todoShared) {
        return todoSharedRepository.save(todoShared);
    }

    @GetMapping("/api/todo_shared/{id}")
    public ResponseEntity<TodoShared> getTodoShared (@PathVariable Long id) {
        TodoShared todoShared = todoSharedRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id: " + id + " is incorrect"));
        return ResponseEntity.ok(todoShared);
    }

    @DeleteMapping("/api/todo_shared/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteTodoShared(@PathVariable Long id) {
        TodoShared todoShared = todoSharedRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id: " + id + " is incorrect"));

        todoSharedRepository.delete(todoShared);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("api/todo_in_shared/{todoId}")
    public List<User> getTodoInShared (@PathVariable Long todoId) {
        List <User> list = todoSharedRepository.findByTodoId(todoId);
            return list;
    }
}

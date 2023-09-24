package com.todo.controllers;

import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.services.TodoSharedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:19006/", "192.168.0.9:8081"})
@RequestMapping("/api/todo_shared")
@RestController
public class TodoSharedController {

    private final TodoSharedService todoSharedService;

    @Autowired
    public TodoSharedController (TodoSharedService todoSharedService) {
        this.todoSharedService = todoSharedService;
    }


    @PostMapping
    public ResponseEntity<?> addTodoShared(@RequestBody TodoShared todoShared, @RequestHeader(value="Authorization")String token) {
        TodoShared addedTodoShared = todoSharedService.addTodoShared(todoShared, token);
        if(addedTodoShared != null) {
            return ResponseEntity.ok(addedTodoShared);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getTodoShared (@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        TodoShared todoShared = todoSharedService.getTodoShared(id, token);
        if(todoShared != null) {
            return ResponseEntity.ok(todoShared);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteTodoShared(@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        boolean deleted = todoSharedService.deleteTodoShared(id, token);
        if(deleted) {
            Map<String,Boolean> response = new HashMap<>();
            response.put("deleted",Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @GetMapping("all/{todoId}")
    public ResponseEntity<?> getTodoInShared (@PathVariable Long todoId, @RequestHeader(value="Authorization")String token) {
        List<User> list = todoSharedService.getTodoInShared(todoId, token);
        if(list != null) {
            return ResponseEntity.ok(list);
        } return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }
}

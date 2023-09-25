package com.todo.controllers;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.exception.UnauthorizedException;
import com.todo.exception.UserAlreadyRegisteredException;
import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.services.TodoSharedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> addTodoShared(@RequestParam String userEmail, @RequestBody Todo todo, @RequestHeader(value="Authorization")String token) {
        try {
            TodoShared addedTodoShared = todoSharedService.addTodoShared(userEmail, todo, token);
            return ResponseEntity.ok(addedTodoShared);
        } catch (UserAlreadyRegisteredException e) {
            return ResponseEntity.badRequest().body("The user is already registered");
        }catch (ResourceNotFoundExpection e) {
            return ResponseEntity.badRequest().body("The user with this email: " + userEmail + " does not exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getTodoShared (@PathVariable Long id, @RequestHeader(value="Authorization")String token) {
        TodoShared todoShared = todoSharedService.getTodoShared(id, token);
        if(todoShared != null) {
            return ResponseEntity.ok(todoShared);
        }
        return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTodoShared(@RequestParam Long userId, @RequestParam Long todoId, @RequestHeader(value="Authorization")String token) {
        try {
            todoSharedService.deleteTodoSharedByUserAndTodo(userId, todoId, token);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundExpection e) {
            return ResponseEntity.badRequest().body("The user with this id: " + userId + " and this: "+ todoId + " does not exist");
        } catch (UnauthorizedException e) {
            return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
        }
    }

    @GetMapping("all/{todoId}")
    public ResponseEntity<?> getTodoInShared (@PathVariable Long todoId, @RequestHeader(value="Authorization")String token) {
        List<User> list = todoSharedService.getTodoInShared(todoId, token);
        if(list != null) {
            return ResponseEntity.ok(list);
        } return ResponseEntity.badRequest().body("Unauthorized: Invalid token");
    }
}

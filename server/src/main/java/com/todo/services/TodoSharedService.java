package com.todo.services;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.repository.TodoSharedRepository;
import com.todo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TodoSharedService {
    private final TodoSharedRepository todoSharedRepository;
    private final JWTUtil jwtUtil;
    private final AuthService authService;

    @Autowired
    public TodoSharedService(TodoSharedRepository todoSharedRepository, JWTUtil jwtUtil, AuthService authService) {
        this.todoSharedRepository = todoSharedRepository;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    public TodoShared addTodoShared(TodoShared todoShared, String token) {
        if(authService.validationToken(token)) {
            return todoSharedRepository.save(todoShared);
        } return null;
    }

    public TodoShared getTodoShared(Long id, String token) {
        if(authService.validationToken(token)) {
            return todoSharedRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));
        } return null;
    }

    public boolean deleteTodoShared(Long id, String token) {
        if(authService.validationToken(token)) {
            TodoShared todoShared = todoSharedRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));

            todoSharedRepository.delete(todoShared);
            return true;
        }
        return false;
    }

    public List<User> getTodoInShared(Long todoId, String token) {
        if(authService.validationToken(token)) {
            List<User> list = todoSharedRepository.findByTodoId(todoId);
            return list;
        } return null;
    }
}

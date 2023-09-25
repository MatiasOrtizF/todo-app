package com.todo.services;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.exception.UnauthorizedException;
import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.repository.TodoSharedRepository;
import com.todo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public TodoShared addTodoShared(String userEmail, Todo todo, String token) {
        if(authService.validationToken(token)) {
            List<User> list = authService.validationEmail(userEmail);
            if(!list.isEmpty()) {
                TodoShared todoShared = new TodoShared();
                User user = list.get(0);
                todoShared.setTodo(todo);
                todoShared.setUser(user);
                return todoSharedRepository.save(todoShared);
            } throw new ResourceNotFoundExpection("The user with this email: " + userEmail + " does not exist");
        } throw new UnauthorizedException("Unauthorized: Invalid token");
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

    public boolean deleteTodoSharedByUserAndTodo(Long userId, Long todoId, String token) {
        if(authService.validationToken(token)) {
            List<TodoShared> list = todoSharedRepository.findByTodoIdAndUserId(todoId, userId);
            if(!list.isEmpty()) {
                TodoShared todoShared = list.get(0);
                todoSharedRepository.delete(todoShared);
                return true;
            } throw new ResourceNotFoundExpection("The user with this id: " + userId + " and this: "+ todoId + " does not exist");
        }
        throw new UnauthorizedException("Unauthorized: Invalid token");
    }

    public List<User> getTodoInShared(Long todoId, String token) {
        if(authService.validationToken(token)) {
            List<User> list = todoSharedRepository.findByTodoId(todoId);
            return list;
        } return null;
    }

    public List<TodoShared> searchTodoInShared(Long id) {
        List<TodoShared> list = todoSharedRepository.searchFindByTodoId(id);
        return list;
    }
}

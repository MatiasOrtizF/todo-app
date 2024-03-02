package com.todo.services;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.exception.UnauthorizedException;
import com.todo.exception.UserMismatchException;
import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.models.User;
import com.todo.repository.TodoRepository;
import com.todo.repository.UserRepository;
import com.todo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final JWTUtil jwtUtil;
    private final AuthService authService;
    private final TodoSharedService todoSharedService;
    private final UserRepository userRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository,JWTUtil jwtUtil, AuthService authService, TodoSharedService todoSharedService,
                       UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.todoSharedService = todoSharedService;
        this.userRepository = userRepository;
    }

    public List<Todo> getAllTodo(String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            return todoRepository.findByUserId(Long.valueOf(userId));
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }
    public Todo addTodo(String task, String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(()-> new ResourceNotFoundExpection("The user is incorrect"));

            Todo newTodo = new Todo();

            newTodo.setCompleted(false);
            newTodo.setTask(task);
            newTodo.setUser(user);

            return todoRepository.save(newTodo);
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public Todo getTodo(Long id, String token) {
        if(authService.validationToken(token)) {
            return todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The todo with this id:" + id + "is incorrect"));
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public Todo completeTodo(Long id, String token) {
        if(authService.validationToken(token)) {
            // verificar que solamente puedan completarlo los que tiene el mismo userId que los que tienen el todo.
            Todo todo = todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The todo with this id:" + id + "is incorrect"));
            todo.setCompleted(!todo.getCompleted());
            return todoRepository.save(todo);
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public boolean deleteTodo(Long id, String token ) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            Todo todo = todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The todo with this id:" + id + "is incorrect"));

            if(todo.getUser().getId().equals(Long.valueOf(userId))) {
                todoRepository.delete(todo);
                return true;
            } throw new UserMismatchException("User mismatch");
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }

    public boolean deleteCompletedTodos(String token) {
        if(authService.validationToken(token)) {
            String userId = jwtUtil.getKey(token);
            todoRepository.deleteCompletedTodosByUserId(Long.valueOf(userId));
            return true;
        } throw new UnauthorizedException("Unauthorized: invalid token");
    }
}

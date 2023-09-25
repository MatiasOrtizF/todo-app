package com.todo.services;

import com.todo.exception.ResourceNotFoundExpection;
import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.repository.TodoRepository;
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

    @Autowired
    public TodoService(TodoRepository todoRepository,JWTUtil jwtUtil, AuthService authService, TodoSharedService todoSharedService) {
        this.todoRepository = todoRepository;
        this.jwtUtil = jwtUtil;
        this.authService = authService;
        this.todoSharedService = todoSharedService;
    }

    public List<Todo> getAllTodo(String token) {
        String userId = jwtUtil.getKey(token);
        if(userId != null) {
            return todoRepository.findByUserId(Long.valueOf(userId));
        }
        return null;
    }
    public Todo addTodo(Todo todo, String token) {
        if(authService.validationToken(token)) {
            return todoRepository.save(todo);
        } return null;
    }

    public Todo getTodo(Long id, String token) {
        if(authService.validationToken(token)) {
            return todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));
        } return null;
    }

    public Todo updateTodo(Long id, String token) {
        if(authService.validationToken(token)) {
            Todo todo = todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));
            todo.setCompleted(!todo.getCompleted());
            return todoRepository.save(todo);
        } return null;
    }

    public boolean deleteTodo(Long id, String token ) {
        if(authService.validationToken(token)) {
            List<TodoShared> list = todoSharedService.searchTodoInShared(id);
            if(!list.isEmpty()) {
                for(TodoShared todoShared : list) {
                    todoSharedService.deleteTodoShared(todoShared.getId(), token);
                }
            }
            Todo todo = todoRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundExpection("The user with this id:" + id + "is incorrect"));

            todoRepository.delete(todo);
            return true;
        }
        return false;
    }

    public boolean deleteCompletedTodos(String token) {
        String userId = jwtUtil.getKey(token);
        if(authService.validationToken(token)) {
            todoRepository.deleteCompletedTodosByUserId(Long.valueOf(userId));
            return true;
        }
        return false;
    }
}

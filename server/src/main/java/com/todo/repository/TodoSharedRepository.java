package com.todo.repository;

import com.todo.models.Todo;
import com.todo.models.TodoShared;
import com.todo.models.User;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoSharedRepository extends JpaRepository<TodoShared, Long> {

    @Query("SELECT t FROM TodoShared t WHERE t.todo.id = :todoId")
    TodoShared findByTodoId(@Param("todoId")Long todoId);

    @Query("SELECT t FROM TodoShared t WHERE t.todo.id = :todoId")
    List<TodoShared> searchFindByTodoId(@Param("todoId")Long todoId);

    @Query("SELECT t FROM TodoShared t WHERE t.todo.id = :todoId AND t.user.id = :userId")
    List<TodoShared> findByTodoIdAndUserId(@Param("todoId")Long todoId, @Param("userId")Long userId);
}

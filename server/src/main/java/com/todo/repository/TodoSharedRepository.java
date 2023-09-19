package com.todo.repository;

import com.todo.models.TodoShared;
import com.todo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoSharedRepository extends JpaRepository<TodoShared, Long> {

    @Query("SELECT t.user FROM TodoShared t WHERE t.todo.id = :todoId")
    List<User> findByTodoId(@Param("todoId")Long todoId);

}

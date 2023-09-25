package com.todo.repository;

import com.todo.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("SELECT t FROM Todo t WHERE t.user.id = :userId")
    List<Todo> findByUserId(@Param("userId")Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Todo t WHERE t.user.id = :userId AND t.completed = true")
    void deleteCompletedTodosByUserId(@Param("userId")Long userId);
}

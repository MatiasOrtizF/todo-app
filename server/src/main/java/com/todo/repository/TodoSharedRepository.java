package com.todo.repository;

import com.todo.models.TodoShared;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoSharedRepository extends JpaRepository<TodoShared, Long> {
}

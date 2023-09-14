package com.todo.models;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "todo_shared")
public class TodoShared {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_todo")
    private Todo todo;
}

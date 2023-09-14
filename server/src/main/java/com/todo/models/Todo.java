package com.todo.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "task")
    private String task;

    @Column(name = "completed")
    private Boolean completed;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_user")
    private User user;
}

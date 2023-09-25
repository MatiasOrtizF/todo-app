package com.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserAlreadyRegisteredException extends RuntimeException {
    private static final Long serialVersionUID = 1L;

    public UserAlreadyRegisteredException(String message) {
        super(message);
    }
}

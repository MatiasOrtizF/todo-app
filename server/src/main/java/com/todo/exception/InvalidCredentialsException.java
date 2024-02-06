package com.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidCredentialsException extends RuntimeException{
    private static final Long serialVersionUID = 1L;

    public InvalidCredentialsException(String message) {
        super(message);
    }
}

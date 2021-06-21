package com.bloodbank.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MyException extends RuntimeException{

    public HttpStatus status;
    public MyException(String messaage, HttpStatus status)
    {
        super(messaage);
        this.status=status;
    }

}

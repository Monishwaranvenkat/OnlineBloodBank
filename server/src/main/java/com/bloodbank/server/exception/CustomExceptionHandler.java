package com.bloodbank.server.exception;

import com.bloodbank.server.payloads.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.Timestamp;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(MyException.class)
    public final ResponseEntity<ErrorResponse> handleItemNotFoundException(MyException ex, WebRequest request) {
        ErrorResponse exceptionResponse = new ErrorResponse(new Timestamp(System.currentTimeMillis()),ex.status, ex.getMessage(),
                request.getDescription(false));
        System.out.println(ex.status);
        return new ResponseEntity<>(exceptionResponse,ex.status);
    }


}

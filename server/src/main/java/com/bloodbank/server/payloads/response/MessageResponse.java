package com.bloodbank.server.payloads.response;

import org.springframework.http.HttpStatus;

import java.sql.Date;
import java.sql.Timestamp;

public class MessageResponse {

    private HttpStatus status;
    private Timestamp timestamp;
    private String message;

    public MessageResponse() {
    }

    public MessageResponse(HttpStatus status,String message) {
        this.message = message;
        this.timestamp = new Timestamp(System.currentTimeMillis());
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "MessageResponse{" +
                "status=" + status +
                ", timestamp=" + timestamp +
                ", message='" + message + '\'' +
                '}';
    }
}

package com.hiTech.Netlab.Entity;

import java.util.Date;

public class ErrorObject {

    private Integer statusCode;

    private String message;

    private Date timestamp;

    public ErrorObject() {
        super();
        // TODO Auto-generated constructor stub
    }

    public ErrorObject(Integer statusCode, String message, Date timestamp) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

}
package com.bloodbank.server.payloads.response;


import java.util.List;

public class AuthenticationResponse {
    private String name;
    private String jwt;
    private List<String> roles;
    private Boolean isactive;

    public AuthenticationResponse() {
    }

    public AuthenticationResponse(String name, String jwt, List<String> roles, Boolean isactive) {
        this.name = name;
        this.jwt = jwt;
        this.roles = roles;
        this.isactive = isactive;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public Boolean getIsactive() {
        return isactive;
    }

    public void setIsactive(Boolean isactive) {
        this.isactive = isactive;
    }


}

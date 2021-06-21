package com.bloodbank.server.payloads.request;

public class BloodRequest {
    String bloodGroup;
    Integer quantity;

    public BloodRequest() {
    }

    public BloodRequest(String bloodGroup, Integer quantity) {
        this.bloodGroup = bloodGroup;
        this.quantity = quantity;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

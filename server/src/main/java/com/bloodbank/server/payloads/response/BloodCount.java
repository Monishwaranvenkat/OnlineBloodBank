package com.bloodbank.server.payloads.response;

public class BloodCount {
    private String bloodGroup;
    private Long count;

    public BloodCount() {
    }

    public BloodCount(String bloodGroup, Long count) {
        this.bloodGroup = bloodGroup;
        this.count = count;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    @Override
    public String toString() {
        return "BloodCount{" +
                "bloodGroup='" + bloodGroup + '\'' +
                ", count=" + count +
                '}';
    }
}

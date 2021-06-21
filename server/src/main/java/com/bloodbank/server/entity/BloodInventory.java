package com.bloodbank.server.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class BloodInventory {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

   // @Column(nullable = false)
    @OneToOne
    private User user;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String expiryDate;

    @Column(nullable = false)
    private Boolean isLive=true;

    public BloodInventory() {
    }

    public BloodInventory(Long id, User user, String date, Integer quantity, String expiryDate) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.quantity = quantity;
        this.expiryDate = expiryDate;
    }

    public BloodInventory(String date, Integer quantity)
    {
        this.date = date;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Boolean getLive() {
        return isLive;
    }

    public void setLive(Boolean live) {
        isLive = live;
    }
}

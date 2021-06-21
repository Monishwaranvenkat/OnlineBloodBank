package com.bloodbank.server.entity;

import lombok.extern.apachecommons.CommonsLog;

import javax.persistence.*;
import java.util.List;

@Entity
public class DonatedLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne
    User user;

    @Column
    String date;

   @Column
   Integer quantity;

    @Column
    String bloodGroup;

    @OneToMany
    List<BloodInventory> Donators;

    public DonatedLog() {
    }

    public DonatedLog(Long id, User user, String date, Integer quantity, String bloodGroup, List<BloodInventory> donators) {
        this.id = id;
        this.user = user;
        this.date = date;
        this.quantity = quantity;
        this.bloodGroup = bloodGroup;
        Donators = donators;
    }

    public DonatedLog(Long id, User user, String date, List<BloodInventory> donators) {
        this.id = id;
        this.user = user;
        this.date = date;
        Donators = donators;
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

    public void setDate(String date) {
        this.date = date;
    }

    public List<BloodInventory> getDonators() {
        return Donators;
    }

    public void setDonators(List<BloodInventory> donators) {
        Donators = donators;
    }


}

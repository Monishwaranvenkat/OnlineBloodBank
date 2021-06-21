package com.bloodbank.server.repository;

import com.bloodbank.server.entity.BloodInventory;
import com.bloodbank.server.entity.User;
import com.bloodbank.server.payloads.response.BloodCount;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BloodBankInventoryRepository extends JpaRepository<BloodInventory,Long>
{
    @Query(value = "select SUM(b.quantity) from BloodInventory as b, User as u where u =b.user and u.bloodGroup=:bloodGroup",nativeQuery = false)
    Long getTotalByBloodGroup(String bloodGroup);

    @Query(value = "select new com.bloodbank.server.payloads.response.BloodCount( u.bloodGroup,SUM(b.quantity)) from BloodInventory as b, User as u where u =b.user and b.isLive=true GROUP BY(u.bloodGroup)")
    List<BloodCount> getBloodTotal();

    @Query(value = "select b from BloodInventory as b , User as u where u =b.user and u.bloodGroup=:bloodGroup and b.isLive=true order by b.expiryDate desc")
    List<BloodInventory> getBlood(String bloodGroup ,Pageable pageable);

    List<BloodInventory> findAllByUser(User user);

    @Query(value = "select b from BloodInventory as b  where b.isLive=true order by b.expiryDate desc")
    List<BloodInventory> getLiveBlood();

    @Query(value = "select b from BloodInventory as b  where b.isLive=true and b.expiryDate=:expiryDate")
    List<BloodInventory> getAllByExpiryDate(String expiryDate);
}
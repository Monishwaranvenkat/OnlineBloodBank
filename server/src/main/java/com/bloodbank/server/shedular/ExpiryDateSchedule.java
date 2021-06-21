package com.bloodbank.server.shedular;

import com.bloodbank.server.entity.BloodInventory;
import com.bloodbank.server.repository.BloodBankInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class ExpiryDateSchedule {

    @Autowired
    BloodBankInventoryRepository bloodBankInventoryRepository;
    @Scheduled(cron = "0 0 0 * * ?")
    public void setExpiryDate() {
        System.out.println("running schedule");
        String today = new java.sql.Date(System.currentTimeMillis()).toString();
        List<BloodInventory> bloodInventories=bloodBankInventoryRepository.getAllByExpiryDate(today);
        for (BloodInventory bloodInventory:bloodInventories
             ) {
            bloodInventory.setLive(false);
            bloodBankInventoryRepository.save(bloodInventory);
        }

    }

}

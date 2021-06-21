package com.bloodbank.server.service;


import com.bloodbank.server.entity.BloodInventory;
import com.bloodbank.server.entity.DonatedLog;
import com.bloodbank.server.entity.User;
import com.bloodbank.server.exception.MyException;
import com.bloodbank.server.payloads.request.BloodRequest;
import com.bloodbank.server.payloads.response.BloodCount;
import com.bloodbank.server.repository.BloodBankInventoryRepository;
import com.bloodbank.server.repository.DonatedLogRepository;
import com.bloodbank.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodBankService {

    @Autowired
    BloodBankInventoryRepository bloodBankInventoryRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    DonatedLogRepository donatedLogRepository;

    public BloodCount getTotalByBloodGroup(String group)
    {
        return new BloodCount(group,bloodBankInventoryRepository.getTotalByBloodGroup(group));

    }

    public List<BloodCount> getAllBloodsTotal()
    {
        return bloodBankInventoryRepository.getBloodTotal();
    }

    public List<User> getUser(String group) {
        return userRepository.getUserByBloodGroup(group);
    }

    public void addDonatedBlood(Long id, BloodInventory bloodInventory)  {
        User user = userRepository.findById(id).orElseThrow(()-> new MyException("User not found",HttpStatus.NOT_FOUND));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date date=null;
        try{
             date = sdf.parse(bloodInventory.getDate());
        }catch (ParseException e)
        {
            new MyException("Something Went wrong",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        System.out.println(bloodInventory.getDate());
        System.out.println(date);
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, 90);
        Date expiryDate=new Date(cal.getTimeInMillis());
        System.out.println(expiryDate);
        bloodInventory.setExpiryDate(expiryDate.toString());
        bloodInventory.setUser(user);
        bloodBankInventoryRepository.save(bloodInventory);
    }


    @Transactional
    public DonatedLog reciveBlood(Long id, BloodRequest bloodRequest)
    {
        User user = userRepository.findById(id).orElseThrow(()->new MyException("User not found",HttpStatus.NOT_FOUND));

        List<BloodInventory> bloodInventories= bloodBankInventoryRepository.getBlood(bloodRequest.getBloodGroup(),PageRequest.of(0,bloodRequest.getQuantity()));

        if(bloodInventories.isEmpty())
            throw new MyException("Blood was not sufficient",HttpStatus.INTERNAL_SERVER_ERROR);
        for (BloodInventory b:bloodInventories
             ) {
            b.setLive(false);
            bloodBankInventoryRepository.save(b);
        }

        DonatedLog donatedLog=new DonatedLog();
        donatedLog.setDate(new Date(System.currentTimeMillis()).toString());
        donatedLog.setBloodGroup(bloodRequest.getBloodGroup());
        donatedLog.setQuantity(bloodRequest.getQuantity());
        donatedLog.setUser(user);
        donatedLog.setDonators(bloodInventories);
        donatedLogRepository.save(donatedLog);
        return donatedLog;
    }


    public List<DonatedLog> GetUserBloodRecivedDetail(Long id) {

       return donatedLogRepository.findAllByUserId(id);
    }

    public List<BloodInventory> getDonatedDetailByUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(()->new MyException("User not found",HttpStatus.NOT_FOUND));
        return bloodBankInventoryRepository.findAllByUser(user);
    }

    @Transactional
    public List<BloodInventory> getLiveBlood() {
        return bloodBankInventoryRepository.getLiveBlood();

    }

    public List<DonatedLog> getRequestedDetails() {
        return donatedLogRepository.findAll();
    }
}

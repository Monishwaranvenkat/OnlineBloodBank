package com.bloodbank.server.controllers;

import com.bloodbank.server.entity.BloodInventory;
import com.bloodbank.server.payloads.request.BloodRequest;
import com.bloodbank.server.payloads.response.MessageResponse;
import com.bloodbank.server.service.BloodBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class BloodBankController {
    @Autowired
    BloodBankService bloodBankService;

    @PostMapping("/donateBlood")
    public ResponseEntity donateBlood(@RequestParam("id")Long id ,@RequestBody BloodInventory bloodInventory)
    {
        bloodBankService.addDonatedBlood(id,bloodInventory);
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"Blood donated successfully"));
    }
    @GetMapping("/getTotalByGroup")
    public ResponseEntity getTotalByGroup(@RequestParam("group")String group)
    {
        return ResponseEntity.ok(bloodBankService.getTotalByBloodGroup(group));
    }
    @GetMapping("/getBloodstotal")
    public ResponseEntity<?> total()
    {
        return  ResponseEntity.ok(bloodBankService.getAllBloodsTotal());
    }

    @GetMapping("/getUsersByBloodGroup")
    public ResponseEntity<?> getUsersByBloodGroup(@RequestParam("group")String group)
    {
        return ResponseEntity.ok(bloodBankService.getUser(group));
    }

    @PostMapping("/reciveBlood")
    public ResponseEntity<?> reciveBlood(@RequestParam("id")Long id,@RequestBody BloodRequest bloodRequest){
      
       return ResponseEntity.ok(bloodBankService.reciveBlood(id,bloodRequest));
    }

    @GetMapping("/GetRecivedDetailByUser")
    public ResponseEntity<?> GetRecivedDetailByUser(@RequestParam("id")Long id)
    {
        return ResponseEntity.ok(bloodBankService.GetUserBloodRecivedDetail(id));
    }

    @GetMapping("/GetDonatedDetailByUser")
    public ResponseEntity<?> GetDonatedDetailByUser(@RequestParam("id")Long id)
    {
        return ResponseEntity.ok(bloodBankService.getDonatedDetailByUser(id));
    }

    @GetMapping("/getLiveBlood")
    public ResponseEntity<?> getLiveBlood()
    {
        return ResponseEntity.ok(bloodBankService.getLiveBlood());
    }

    @GetMapping("/getRequested")
    public ResponseEntity<?> getRequested()
    {
        return ResponseEntity.ok(bloodBankService.getRequestedDetails());
    }
}

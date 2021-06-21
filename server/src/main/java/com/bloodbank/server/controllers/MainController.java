package com.bloodbank.server.controllers;

import com.bloodbank.server.entity.User;
import com.bloodbank.server.exception.MyException;
import com.bloodbank.server.payloads.request.Login;
import com.bloodbank.server.payloads.request.SignupRequest;
import com.bloodbank.server.payloads.response.AuthenticationResponse;
import com.bloodbank.server.payloads.response.MessageResponse;
import com.bloodbank.server.repository.UserRepository;
import com.bloodbank.server.security.service.JwtUtil;
import com.bloodbank.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MainController {


    @Autowired
    UserService userService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserRepository userRepository;


    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody Login loginRequest) throws Exception
    {

        AuthenticationResponse authenticationResponse=userService.loginUser(loginRequest);

        return ResponseEntity.ok(authenticationResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signUpRequest) {
        userService.addUser(signUpRequest,"ROLE_USER");
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User registered successfully!"));
    }


    @PostMapping("/addAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> signupAdmin(@RequestBody SignupRequest signUpRequest) {
        userService.addUser(signUpRequest,"ROLE_ADMIN");
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User registered successfully!"));
    }

    @GetMapping("/blockUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> blockUser(@RequestParam("id")Long id)
    {
        userService.blockUser(id);
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User with id ="+id+" is blocked"));
    }

    @GetMapping("/unblockUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> unBlockUser(@RequestParam("id")Long id)
    {
        userService.unBlockUser(id);
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User with id ="+id+" is unblocked"));
    }

    @DeleteMapping("/deleteUser")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@RequestParam("id")Long id)
    {
        userService.deleteUser(id);
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User with id ="+id+" is deleted successfully") );
    }


    @PutMapping("/updateUser")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> updateUser(@RequestParam("id")Long id,@RequestBody SignupRequest signupRequest)
    {
        userService.updateUser(id,signupRequest);
        return ResponseEntity.ok(new MessageResponse(HttpStatus.OK,"User with id ="+id+" is updated successfully") );
    }

    @GetMapping("/getAllUser")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<User> getAlluser()
    {
        return userService.getAllUser();
    }

    @GetMapping("/getUserById")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public User getUserById(@RequestParam("id")Long id)
    {
        return userService.getUserById(id);
    }


    @GetMapping("/userByJwt")
    public User getJwt(@RequestParam("id")String id)
    {

        return userRepository.findByEmail(jwtUtil.extractUsername(id)).orElseThrow(()->new MyException("User Not Found",HttpStatus.NOT_FOUND));
    }










}

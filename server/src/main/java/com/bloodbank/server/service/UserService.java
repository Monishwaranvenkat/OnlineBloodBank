package com.bloodbank.server.service;

import com.bloodbank.server.entity.Role;
import com.bloodbank.server.entity.User;
import com.bloodbank.server.exception.MyException;
import com.bloodbank.server.payloads.request.Login;
import com.bloodbank.server.payloads.request.SignupRequest;
import com.bloodbank.server.payloads.response.AuthenticationResponse;
import com.bloodbank.server.repository.RoleRepository;
import com.bloodbank.server.repository.UserRepository;
import com.bloodbank.server.security.MyUserDetails;
import com.bloodbank.server.security.service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
     RoleRepository roleRepository;

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    JwtUtil jwtUtil;



    @Transactional
    public AuthenticationResponse loginUser(Login loginRequest)
    {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new AuthenticationResponse(userDetails.getName(),jwt,roles,userDetails.isEnabled());

    }


    @Transactional
    public void addUser(SignupRequest signUpRequest,String role)throws MyException
    {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new MyException("Email already exist",HttpStatus.BAD_REQUEST);
        }

        User user=new User();

        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setPhone(signUpRequest.getPhone());
        user.setDob(signUpRequest.getDob());
        user.setBloodGroup(signUpRequest.getBloodGroup());
        user.setCity(signUpRequest.getCity());
        user.setState(signUpRequest.getState());
        user.setCountry(signUpRequest.getCountry());
        user.setActive(true);

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(role)
                .orElseThrow(() -> new MyException("Role is not found.",HttpStatus.NOT_FOUND));
        roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

    }

    @Transactional
    public void blockUser(Long id) {
        User user=userRepository.findById(id).orElseThrow(() -> new MyException("User not Found",HttpStatus.NOT_FOUND));
        user.setActive(false);
        userRepository.save(user);
    }

    @Transactional
    public void unBlockUser(Long id) {
        User user=userRepository.findById(id).orElseThrow(() -> new MyException("User not Found",HttpStatus.NOT_FOUND));
        user.setActive(true);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user=userRepository.findById(id).orElseThrow(() -> new MyException("User not Found",HttpStatus.NOT_FOUND));
        userRepository.delete(user);
    }

    @Transactional
    public void updateUser(Long id, SignupRequest signUpRequest) {
        User user=userRepository.findById(id).orElseThrow(() -> new MyException("User not Found",HttpStatus.NOT_FOUND));
        if(!signUpRequest.getEmail().equals(user.getEmail()))
            userRepository.findByEmail(signUpRequest.getEmail()).orElseThrow(() -> new MyException("Email already exist Please choose another email",HttpStatus.BAD_REQUEST));

        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setPhone(signUpRequest.getPhone());
        user.setDob(signUpRequest.getDob());
        user.setBloodGroup(signUpRequest.getBloodGroup());
        user.setCity(signUpRequest.getCity());
        user.setState(signUpRequest.getState());
        user.setCountry(signUpRequest.getCountry());
        user.setActive(true);

        userRepository.save(user);
    }

    @Transactional
    public User getUserById(Long id)
    {
        return userRepository.findById(id).orElseThrow(()->new MyException("User not Found",HttpStatus.NOT_FOUND));
    }

    @Transactional
    public List<User> getAllUser()
    {
        return userRepository.findAll();
    }

    @Transactional
    public User getUserByEmail(String email)
    {
        return userRepository.findByEmail(email).orElseThrow(()-> new MyException("User not found",HttpStatus.NOT_FOUND));
    }

}

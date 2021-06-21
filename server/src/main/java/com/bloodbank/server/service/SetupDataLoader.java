package com.bloodbank.server.service;


import com.bloodbank.server.entity.Role;
import com.bloodbank.server.entity.User;
import com.bloodbank.server.repository.RoleRepository;
import com.bloodbank.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.HashSet;



@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;



    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {


        if (alreadySetup)
            return;
        createRoleIfNotFound("ROLE_ADMIN");
        createRoleIfNotFound("ROLE_USER");
        if(userRepository.findByEmail("admin@admin.com").isPresent())
            return;

        Role adminRole = roleRepository.findByName("ROLE_ADMIN").get();
        User user = new User();
        user.setName("admin");
        user.setPassword("Admin@12");
        user.setEmail("admin@admin.com");
        user.setPhone("9952543961");
        user.setBloodGroup("O+");
        user.setState("Tamil Nadu");
        user.setCity("chennai");
        user.setCountry("India");
        user.setDob(new java.sql.Date(System.currentTimeMillis()).toString());
        user.setRoles(new HashSet(Arrays.asList(adminRole)));
        user.setActive(true);


        userRepository.save(user);

        alreadySetup = true;
    }


    @Transactional
    Role createRoleIfNotFound(
            String name) {

        Role role = roleRepository.findByName(name).orElse(null);
        if (role==null)
        {
            role=new Role(name);
            roleRepository.save(role);
        }

        return role;
    }
}
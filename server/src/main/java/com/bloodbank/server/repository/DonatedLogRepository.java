package com.bloodbank.server.repository;


import com.bloodbank.server.entity.DonatedLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonatedLogRepository extends JpaRepository<DonatedLog,Long> {

    List<DonatedLog> findAllByUserId(Long id);
}

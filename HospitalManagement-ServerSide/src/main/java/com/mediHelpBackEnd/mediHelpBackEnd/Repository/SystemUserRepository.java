package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.SystemUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SystemUserRepository extends JpaRepository<SystemUser, Long> {
    List<SystemUser> findByUserEmailAndUserPassword(String userEmail, String userPassword);
    SystemUser findByUserEmail(String userEmail);
}

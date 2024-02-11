package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Appointments;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.NurseAppoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NurseAppointRepository extends JpaRepository<NurseAppoint, Long> {
    List<NurseAppoint> findByNurseEmail(String patientEmail);
}

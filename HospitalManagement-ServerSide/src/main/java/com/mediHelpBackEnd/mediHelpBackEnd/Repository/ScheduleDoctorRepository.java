package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.ScheduleDoctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ScheduleDoctorRepository extends JpaRepository<ScheduleDoctor, Long> {
    List<ScheduleDoctor> findByDoctorNameAndDoctorSpecialization(String doctorName, String doctorSpecialization);
    List<ScheduleDoctor> findByDoctorName(String doctorName);
    List<ScheduleDoctor> findByDoctorSpecialization(String doctorSpecialization);
}

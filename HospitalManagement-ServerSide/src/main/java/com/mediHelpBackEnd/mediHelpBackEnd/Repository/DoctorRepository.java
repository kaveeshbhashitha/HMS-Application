package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByDoctorNameAndDoctorSpecialization(String doctorName, String doctorSpecialization);
    Doctor findByDoctorEmail(String doctorEmail);
    Doctor findByDoctorName(String doctorName);
    Doctor findByDoctorSpecialization(String doctorSpecialization);
}

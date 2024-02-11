package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointments, Long> {
    List<Appointments> findByDoctorName(String doctorName);
    List<Appointments> findByPatientName(String patientName);
    Appointments findByPatientEmail(String patientEmail);
    List<Appointments> findByAvailableDate(String availableDate);
}

package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.DoctorRequest;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRequestRepository extends JpaRepository<DoctorRequest, Long> {
    DoctorRequest findByPatientEmail(String patientEmail);
    DoctorRequest findByReportType(String reportType);
}

package com.mediHelpBackEnd.mediHelpBackEnd.Repository;

import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByPatientDiagnosis(String patientDiagnosis);
    List<Prescription> findByDoctorName(String doctorName);
    Prescription findByPatientEmail(String patientEmail);
}

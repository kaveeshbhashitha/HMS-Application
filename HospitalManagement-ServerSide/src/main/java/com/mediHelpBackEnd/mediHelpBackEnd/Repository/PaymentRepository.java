package com.mediHelpBackEnd.mediHelpBackEnd.Repository;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payments, Long> {
    List<Payments> findByPaymentDate(String paymentDate);
    List<Payments> findByPatientEmail(String patientEmail);
    List<Payments> findByServiceType(String serviceType);
}

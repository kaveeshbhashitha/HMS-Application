package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Payments;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentRepository paymentsRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Payments> getAllAppointments(){
        return paymentsRepository.findAll();
    }

    //add new payment to the system
    @PostMapping("/add")
    Payments newPay(@RequestBody Payments newPayment){
        return paymentsRepository.save(newPayment);
    }

    //search payments by id
    @GetMapping("/searchById/{id}")
    Payments getPaymentsById(@PathVariable Long id){
        return paymentsRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search payment by date
    @GetMapping("/searchByDate/{paymentDate}")
    List<Payments> getPaymentsByDate(@PathVariable String paymentDate){
        return paymentsRepository.findByPaymentDate(paymentDate);
    }

    //search payment by patient email
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    List<Payments> getPaymentsByPEmail(@PathVariable String patientEmail){
        return paymentsRepository.findByPatientEmail(patientEmail);
    }

    //search payment by service type
    @GetMapping("/searchByServiceType/{serviceType}")
    List<Payments> getPaymentsByServiceType(@PathVariable String serviceType){
        return paymentsRepository.findByServiceType(serviceType);
    }

    //update payment records
    @PutMapping("/update/{id}")
    Payments updatePayments(@RequestBody Payments updatePayment, @PathVariable Long id){
        return paymentsRepository.findById(id).map(payments -> {
            payments.setPatientName(updatePayment.getPatientName());
            payments.setPatientEmail(updatePayment.getPatientEmail());
            payments.setServiceType(updatePayment.getServiceType());
            payments.setHospitalCharge(updatePayment.getHospitalCharge());
            payments.setDoctorCharges(updatePayment.getDoctorCharges());
            payments.setOtherCharges(updatePayment.getOtherCharges());
            payments.setPaymentDate(updatePayment.getPaymentDate());
            return paymentsRepository.save(payments);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete payments
    @DeleteMapping("/delete/{id}")
    String deletePayment(@PathVariable Long id) {
        if (!paymentsRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        paymentsRepository.deleteById(id);
        return "Payment with id " + id + " has been deleted successfully.";
    }
}

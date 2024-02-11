package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Payments;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Prescription;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/prescription")
public class PrescriptionController {
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Prescription> getAllAppointments(){
        return prescriptionRepository.findAll();
    }

    //add new prescription to the system
    @PostMapping("/add")
    Prescription newPres(@RequestBody Prescription newPrescription){
        return prescriptionRepository.save(newPrescription);
    }

    //search prescription by id
    @GetMapping("/searchById/{id}")
    Prescription getPrescriptionsById(@PathVariable Long id){
        return prescriptionRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search prescription by date
    @GetMapping("/searchByDiagnosis/{patientDiagnosis}")
    List<Prescription> getPresByD(@PathVariable String patientDiagnosis){
        return prescriptionRepository.findByPatientDiagnosis(patientDiagnosis);
    }

    //search prescription by patient email
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    Prescription getPresByPEmail(@PathVariable String patientEmail){
        return prescriptionRepository.findByPatientEmail(patientEmail);
    }

    //search prescription by doctor name
    @GetMapping("/searchByDoctorName/{doctorName}")
    List<Prescription> getPressByDName(@PathVariable String doctorName){
        return prescriptionRepository.findByDoctorName(doctorName);
    }

    //update prescription records
    @PutMapping("/update/{id}")
    Prescription updatePres(@RequestBody Prescription updatePrescription, @PathVariable Long id){
        return prescriptionRepository.findById(id).map(prescription -> {
            prescription.setPatientName(updatePrescription.getPatientName());
            prescription.setPatientEmail(updatePrescription.getPatientEmail());
            prescription.setPatientGender(updatePrescription.getPatientGender());
            prescription.setPatientAge(updatePrescription.getPatientAge());
            prescription.setDoctorName(updatePrescription.getDoctorName());
            prescription.setPatientDiagnosis(updatePrescription.getPatientDiagnosis());
            prescription.setDoctorNote(updatePrescription.getDoctorNote());
            prescription.setDrug01(updatePrescription.getDrug01());
            prescription.setDrug02(updatePrescription.getDrug02());
            prescription.setDrug03(updatePrescription.getDrug03());
            prescription.setDrug04(updatePrescription.getDrug04());
            prescription.setDrug05(updatePrescription.getDrug05());
            prescription.setDrug06(updatePrescription.getDrug06());
            prescription.setDrug07(updatePrescription.getDrug07());
            prescription.setDrug08(updatePrescription.getDrug08());
            prescription.setDrug09(updatePrescription.getDrug09());
            prescription.setDrug10(updatePrescription.getDrug10());
            return prescriptionRepository.save(prescription);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete prescription
    @DeleteMapping("/delete/{id}")
    String deletePrescription(@PathVariable Long id) {
        if (!prescriptionRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        prescriptionRepository.deleteById(id);
        return "Prescription with id " + id + " has been deleted successfully.";
    }
}

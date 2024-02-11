package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Patient;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Patient> getAllAppointments(){
        return patientRepository.findAll();
    }

    //add new patient to the system
    @PostMapping("/add")
    Patient newPatients(@RequestBody Patient newPatient){
        return patientRepository.save(newPatient);
    }

    //search patient by id
    @GetMapping("/searchById/{id}")
    Patient getPatientsById(@PathVariable Long id){
        return patientRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search patient by name
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    Patient getDrugsByPEmail(@PathVariable String patientEmail){
        return patientRepository.findByPatientEmail(patientEmail);
    }

    //update drug
    @PutMapping("/update/{id}")
    Patient updatePatients(@RequestBody Patient updatePatient, @PathVariable Long id){
        return patientRepository.findById(id).map(patient -> {
            patient.setPatientName(updatePatient.getPatientName());
            patient.setPatientEmail(updatePatient.getPatientEmail());
            patient.setPatientGender(updatePatient.getPatientGender());
            patient.setPatientAge(updatePatient.getPatientAge());
            patient.setDateCheckIn(updatePatient.getDateCheckIn());
            patient.setOpdCharge(updatePatient.getOpdCharge());
            return patientRepository.save(patient);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete patient
    @DeleteMapping("/delete/{id}")
    String deletePatient(@PathVariable Long id) {
        if (!patientRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        patientRepository.deleteById(id);
        return "Patient with id " + id + " has been deleted successfully.";
    }
}

package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.DoctorRequest;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.DoctorRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/doctorRequest")
public class DoctorRequestController {
    @Autowired
    private DoctorRequestRepository doctorRequestRepository;

    //get all data
    @GetMapping("/searchAll")
    List<DoctorRequest> getAllAppointments(){
        return doctorRequestRepository.findAll();
    }

    //add new patient to the system
    @PostMapping("/add")
    DoctorRequest newPatients(@RequestBody DoctorRequest newPatient){
        return doctorRequestRepository.save(newPatient);
    }

    //search patient by id
    @GetMapping("/searchById/{id}")
    DoctorRequest getPatientsById(@PathVariable Long id){
        return doctorRequestRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search patient by name
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    DoctorRequest getDrugsByPEmail(@PathVariable String patientEmail){
        return doctorRequestRepository.findByPatientEmail(patientEmail);
    }
    //search by report type
    @GetMapping("/searchByReportType/{reportType}")
    DoctorRequest getPatientByReport(@PathVariable String reportType){
        return doctorRequestRepository.findByReportType(reportType);
    }

    //update drug
    @PutMapping("/update/{id}")
    DoctorRequest updatePatients(@RequestBody DoctorRequest updatePatient, @PathVariable Long id){
        return doctorRequestRepository.findById(id).map(doctorRequest -> {
            doctorRequest.setPatientName(updatePatient.getPatientName());
            doctorRequest.setPatientEmail(updatePatient.getPatientEmail());
            doctorRequest.setPatientGender(updatePatient.getPatientGender());
            doctorRequest.setPatientAge(updatePatient.getPatientAge());
            doctorRequest.setReportType(updatePatient.getReportType());
            doctorRequest.setPartOfBody(updatePatient.getPartOfBody());
            doctorRequest.setDoctorName(updatePatient.getDoctorName());
            return doctorRequestRepository.save(doctorRequest);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete patient
    @DeleteMapping("/delete/{id}")
    String deletePatient(@PathVariable Long id) {
        if (!doctorRequestRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        doctorRequestRepository.deleteById(id);
        return "Patient with id " + id + " has been deleted successfully.";
    }
}

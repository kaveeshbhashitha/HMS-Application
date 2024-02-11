package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Drug;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.MedicalReport;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.MedicalReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/medicalReports")
public class MedicalReportController {
    @Autowired
    private MedicalReportRepository medicalReportRepository;

    //get all data
    @GetMapping("/searchAll")
    List<MedicalReport> getAllAppointments(){
        return medicalReportRepository.findAll();
    }

    //add new medical report to the system
    @PostMapping("/add")
    MedicalReport newReports(@RequestBody MedicalReport newReport){
        return medicalReportRepository.save(newReport);
    }

    //search medical report by id
    @GetMapping("/searchById/{id}")
    MedicalReport getMReportById(@PathVariable Long id){
        return medicalReportRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }
    //added specified data set
    @PostMapping("/add/{id}")
    public MedicalReport newReports(@PathVariable Long id, @RequestBody MedicalReport newReport) {
        newReport.setmRId(id);
        return medicalReportRepository.save(newReport);
    }
    //search medical report by patient email
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    MedicalReport getReportsByPName(@PathVariable String patientEmail){
        return medicalReportRepository.findByPatientEmail(patientEmail);
    }

    //update medical reports
    @PutMapping("/update/{id}")
    MedicalReport updateMedicalReports(@RequestBody MedicalReport updateMReports, @PathVariable Long id){
        return medicalReportRepository.findById(id).map(medicalReports -> {
            medicalReports.setPatientName(updateMReports.getPatientName());
            medicalReports.setPatientEmail(updateMReports.getPatientEmail());
            medicalReports.setPatientGender(updateMReports.getPatientGender());
            medicalReports.setPatientAge(updateMReports.getPatientAge());
            medicalReports.setReportType(updateMReports.getReportType());
            medicalReports.setReportCharge(updateMReports.getReportCharge());
            medicalReports.setReportDate(updateMReports.getReportDate());
            medicalReports.setSampleId(updateMReports.getSampleId());
            return medicalReportRepository.save(medicalReports);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete medical report
    @DeleteMapping("/delete/{id}")
    String deleteDrugs(@PathVariable Long id) {
        if (!medicalReportRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        medicalReportRepository.deleteById(id);
        return "Medical Report with id " + id + " has been deleted successfully.";
    }
}

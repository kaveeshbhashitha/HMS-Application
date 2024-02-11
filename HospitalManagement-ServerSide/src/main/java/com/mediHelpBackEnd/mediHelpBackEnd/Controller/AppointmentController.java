package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Appointments;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Appointments> getAllAppointments(){
        return appointmentRepository.findAll();
    }

    //add new doctor to hospital
    @PostMapping("/add")
    Appointments newAppointment(@RequestBody Appointments newAppointment){
        return appointmentRepository.save(newAppointment);
    }

    //search appointments by id
    @GetMapping("/searchById/{id}")
    Appointments getAppointmentsById(@PathVariable Long id) {
        return appointmentRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    //search appointments by patient's name
    @GetMapping("/searchByPatientName/{patientName}")
    List<Appointments> getAppointmentByPName(@PathVariable String patientName) {
        return appointmentRepository.findByPatientName(patientName);
    }

    //search appointments by patient's name
    @GetMapping("/searchByPatientEmail/{patientEmail}")
    Appointments getAppointmentByPEmail(@PathVariable String patientEmail) {
        return appointmentRepository.findByPatientEmail(patientEmail);
    }

    //search appointments by doctor's email
    @GetMapping("/searchByDoctorName/{doctorName}")
    List<Appointments> getAppointmentByDocName(@PathVariable String doctorName){
        return appointmentRepository.findByDoctorName(doctorName);
    }

    //search appointments by date
    @GetMapping("/searchByDate/{appointmentDate}")
    List<Appointments> getAppointmentByScheduleDate(@PathVariable String availableDate){
        return appointmentRepository.findByAvailableDate(availableDate);
    }

    //update appointment
    @PutMapping("/update/{id}")
    Appointments updateAppoint(@RequestBody Appointments updateAppointment, @PathVariable Long id){
        return appointmentRepository.findById(id).map(appointments -> {
            appointments.setPatientName(updateAppointment.getPatientName());
            appointments.setPatientEmail(updateAppointment.getPatientEmail());
            appointments.setDoctorName(updateAppointment.getDoctorName());
            appointments.setDoctorSpecialization(updateAppointment.getDoctorSpecialization());
            appointments.setDoctorRoom(updateAppointment.getDoctorRoom());
            appointments.setDoctorCharge(updateAppointment.getDoctorCharge());
            appointments.setHospitalCharge(updateAppointment.getHospitalCharge());
            appointments.setAvailableDate(updateAppointment.getAvailableDate());
            appointments.setAvailableTime(updateAppointment.getAvailableTime());
            return appointmentRepository.save(appointments);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete appointment
    @DeleteMapping("/delete/{id}")
    String deleteAppoint(@PathVariable Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        appointmentRepository.deleteById(id);
        return "Appointment with id " + id + " has been deleted successfully.";
    }

}
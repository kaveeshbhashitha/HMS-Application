package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.ScheduleDoctor;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.ScheduleDoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/schedule")
public class ScheduleDoctorController {
    @Autowired
    private ScheduleDoctorRepository scheduleRepository;

    //get all data
    @GetMapping("/searchAll")
    List<ScheduleDoctor> getAllAppointments(){
        return scheduleRepository.findAll();
    }

    //search schedule by id
    @GetMapping("/searchById/{id}")
    ScheduleDoctor getDoctorById(@PathVariable Long id){
        return scheduleRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search appointments by doctor's name
    @GetMapping("/searchByDoctorName/{doctorName}")
    List<ScheduleDoctor> getDoctorByName(@PathVariable String doctorName){
        return scheduleRepository.findByDoctorName(doctorName);
    }

    //search appointments by doctor's specialization
    @GetMapping("/searchBySpecialization/{doctorSpecialization}")
    List<ScheduleDoctor> getDoctorBySpecialization(@PathVariable String doctorSpecialization){
        return scheduleRepository.findByDoctorSpecialization(doctorSpecialization);
    }

    //search doctor through doctor name and specialization
    @GetMapping("/searchByDoctor")
    public List<ScheduleDoctor> findDoctorByNAndSp(@RequestParam String doctorName, @RequestParam String doctorSpecialization) {
        return scheduleRepository.findByDoctorNameAndDoctorSpecialization(doctorName, doctorSpecialization);
    }

    //add new doctor schedule to hospital
    @PostMapping("/add")
    ScheduleDoctor newSchedule(@RequestBody ScheduleDoctor newShed){
        return scheduleRepository.save(newShed);
    }

    //update schedule
    @PutMapping("/update/{id}")
    ScheduleDoctor updateSchedules(@RequestBody ScheduleDoctor updateSchedule, @PathVariable Long id){
        return scheduleRepository.findById(id).map(schedules -> {
            schedules.setDoctorName(updateSchedule.getDoctorName());
            schedules.setDoctorSpecialization(updateSchedule.getDoctorSpecialization());
            schedules.setDoctorEmail(updateSchedule.getDoctorEmail());
            schedules.setDoctorRoom(updateSchedule.getDoctorRoom());
            schedules.setDoctorCharge(updateSchedule.getDoctorCharge());
            schedules.setHospitalCharge(updateSchedule.getHospitalCharge());
            schedules.setAvailableDate(updateSchedule.getAvailableDate());
            schedules.setAvailableTime(updateSchedule.getAvailableTime());
            return scheduleRepository.save(schedules);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete schedule
    @DeleteMapping("/delete/{id}")
    String deleteSchedule(@PathVariable Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        scheduleRepository.deleteById(id);
        return "Schedule with id " + id + " has been deleted successfully.";
    }
}

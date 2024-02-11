package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Doctor;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Doctor> getAllAppointments(){
        return doctorRepository.findAll();
    }

    //search doctor through doctor name and specialization
    @GetMapping("/searchByDoctor")
    public List<Doctor> findDoctorByNAndSp(@RequestParam String doctorName, @RequestParam String doctorSpecialization) {
        return doctorRepository.findByDoctorNameAndDoctorSpecialization(doctorName, doctorSpecialization);
    }

    //search appointments by id
    @GetMapping("/searchById/{id}")
    Doctor getDoctorById(@PathVariable Long id){
        return doctorRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search appointments by doctor's name
    @GetMapping("/searchByDoctorName/{doctorName}")
    Doctor getDoctorByName(@PathVariable String doctorName){
        return doctorRepository.findByDoctorName(doctorName);
    }

    //search appointments by doctor's email
    @GetMapping("/searchByDoctorEmail/{doctorEmail}")
    Doctor getDoctorByEmail(@PathVariable String doctorEmail){
        return doctorRepository.findByDoctorEmail(doctorEmail);
    }

    //search appointments by doctor's specialization
    @GetMapping("/searchByDoctorSpecialization/{doctorSpecialization}")
    Doctor getDoctorBySpecialization(@PathVariable String doctorSpecialization){
        return doctorRepository.findByDoctorSpecialization(doctorSpecialization);
    }

    //add new doctor to hospital
    @PostMapping("/add")
    Doctor newDoctor(@RequestBody Doctor newDoctor){
        return doctorRepository.save(newDoctor);
    }

    //update doctor
    @PutMapping("/update/{id}")
    Doctor updateUser(@RequestBody Doctor updateDoctor, @PathVariable Long id){
        return doctorRepository.findById(id).map(doctors -> {
            doctors.setDoctorId(updateDoctor.getDoctorId());
            doctors.setDoctorName(updateDoctor.getDoctorName());
            doctors.setDoctorEmail(updateDoctor.getDoctorEmail());
            doctors.setDoctorSpecialization(updateDoctor.getDoctorSpecialization());
            doctors.setDoctorCharge(updateDoctor.getDoctorCharge());
            doctors.setDoctorRoom(updateDoctor.getDoctorRoom());
            return doctorRepository.save(doctors);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete doctor
    @DeleteMapping("/delete/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        doctorRepository.deleteById(id);
        return "Doctor with id " + id + " has been deleted successfully.";
    }
}
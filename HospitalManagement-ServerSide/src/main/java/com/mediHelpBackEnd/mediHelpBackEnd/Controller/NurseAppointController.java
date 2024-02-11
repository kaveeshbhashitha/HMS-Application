package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.NurseAppoint;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.NurseAppointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/nurseAppoint")
public class NurseAppointController {
    @Autowired
    private NurseAppointRepository nurseAppointRepository;

    //get all data
    @GetMapping("/searchAll")
    List<NurseAppoint> getAllAppointments(){
        return nurseAppointRepository.findAll();
    }

    //add new drug to the system
    @PostMapping("/add")
    NurseAppoint newUser(@RequestBody NurseAppoint newDrug) {
        return nurseAppointRepository.save(newDrug);
    }

    //search drugs by id
    @GetMapping("/searchById/{id}")
    NurseAppoint getDrugsById(@PathVariable Long id) {
        return nurseAppointRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
    @GetMapping("/searchByNurseEmail/{nurseEmail}")
    List<NurseAppoint> getAppointmentByPEmail(@PathVariable String nurseEmail) {
        return nurseAppointRepository.findByNurseEmail(nurseEmail);
    }
    //update drug
    @PutMapping("/update/{id}")
    NurseAppoint updateDrugs(@RequestBody NurseAppoint updateDrug, @PathVariable Long id){
        return nurseAppointRepository.findById(id).map(drugs -> {
            drugs.setUserRole(updateDrug.getUserRole());
            drugs.setNurseEmail(updateDrug.getNurseEmail());
            drugs.setAppointedDoctor(updateDrug.getAppointedDoctor());
            drugs.setAddedDate(updateDrug.getAddedDate());
            drugs.setAppointedTime(updateDrug.getAppointedTime());
            drugs.setRoomNumber(updateDrug.getRoomNumber());
            return nurseAppointRepository.save(drugs);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete drug
    @DeleteMapping("/delete/{id}")
    String deleteDrugs(@PathVariable Long id) {
        if (!nurseAppointRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        nurseAppointRepository.deleteById(id);
        return "Drug with id " + id + " has been deleted successfully.";
    }
}

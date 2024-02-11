package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Doctor;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.Drug;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/drugs")
public class DrugController {
    @Autowired
    private DrugRepository drugsRepository;

    //get all data
    @GetMapping("/searchAll")
    List<Drug> getAllAppointments(){
        return drugsRepository.findAll();
    }

    //add new drug to the system
    @PostMapping("/add")
    Drug newUser(@RequestBody Drug newDrug) {
        return drugsRepository.save(newDrug);
    }

    //search drugs by id
    @GetMapping("/searchById/{id}")
    Drug getDrugsById(@PathVariable Long id) {
        return drugsRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    //search drugs by name
    @GetMapping("/searchByDrugName/{drugName}")
    Drug getDrugsByPName(@PathVariable String drugName){
        return drugsRepository.findByDrugName(drugName);
    }

    //update drug
    @PutMapping("/update/{id}")
    Drug updateDrugs(@RequestBody Drug updateDrug, @PathVariable Long id){
        return drugsRepository.findById(id).map(drugs -> {
            drugs.setDrugName(updateDrug.getDrugName());
            drugs.setDrugQuantity(updateDrug.getDrugQuantity());
            drugs.setDrugStatus(updateDrug.getDrugStatus());
            drugs.setDrugAddedDate(updateDrug.getDrugAddedDate());
            drugs.setDrugCharge(updateDrug.getDrugCharge());
            return drugsRepository.save(drugs);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete drug
    @DeleteMapping("/delete/{id}")
    String deleteDrugs(@PathVariable Long id) {
        if (!drugsRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        drugsRepository.deleteById(id);
        return "Drug with id " + id + " has been deleted successfully.";
    }
}
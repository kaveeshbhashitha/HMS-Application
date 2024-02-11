package com.mediHelpBackEnd.mediHelpBackEnd.Controller;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.ScheduleDoctor;
import com.mediHelpBackEnd.mediHelpBackEnd.Entity.SystemUser;
import com.mediHelpBackEnd.mediHelpBackEnd.Exceptions.NotFoundException;
import com.mediHelpBackEnd.mediHelpBackEnd.Repository.SystemUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/user")
public class SystemUserController {
    @Autowired
    private SystemUserRepository systemUserRepository;

    //get all data
    @GetMapping("/searchAll")
    List<SystemUser> getAllAppointments(){
        return systemUserRepository.findAll();
    }

    //search user through username and password
    @GetMapping("/login")
    public List<SystemUser> findUserByUnAndUp(@RequestParam String userEmail, @RequestParam String userPassword) {
        return systemUserRepository.findByUserEmailAndUserPassword(userEmail, userPassword);
    }

    //search user by id
    @GetMapping("/searchById/{id}")
    SystemUser getUserById(@PathVariable Long id){
        return systemUserRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    //search user by user's email
    @GetMapping("/searchByEmail/{userEmail}")
    SystemUser getUserByEmail(@PathVariable String userEmail){
        return systemUserRepository.findByUserEmail(userEmail);
    }

    //add new user to hospital MS
    @PostMapping("/add")
    SystemUser newUser(@RequestBody SystemUser newUser){
        return systemUserRepository.save(newUser);
    }

    //update user
    @PutMapping("/update/{id}")
    SystemUser updateUsers(@RequestBody SystemUser updateUser, @PathVariable Long id){
        return systemUserRepository.findById(id).map(users -> {
            users.setUserId(updateUser.getUserId());
            users.setSystemUserName(updateUser.getSystemUserName());
            users.setUserRole(updateUser.getUserRole());
            users.setUserEmail(updateUser.getUserEmail());
            users.setUserPassword(updateUser.getUserPassword());
            return systemUserRepository.save(users);
        }).orElseThrow(()->new NotFoundException(id));
    }

    //delete user
    @DeleteMapping("/delete/{id}")
    String deleteUser(@PathVariable Long id) {
        if (!systemUserRepository.existsById(id)) {
            throw new NotFoundException(id);
        }
        systemUserRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }
}

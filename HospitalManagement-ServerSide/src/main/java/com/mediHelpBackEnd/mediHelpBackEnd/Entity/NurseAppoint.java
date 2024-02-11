package com.mediHelpBackEnd.mediHelpBackEnd.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
@Entity
public class NurseAppoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long naId;
    private String userRole;
    private String appointedDoctor;
    private String appointedTime;
    private String nurseEmail;
    private Integer roomNumber;
    private String addedDate;

    public Long getNaId() {
        return naId;
    }

    public void setNaId(Long naId) {
        this.naId = naId;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getAppointedDoctor() {
        return appointedDoctor;
    }

    public void setAppointedDoctor(String appointedDoctor) {
        this.appointedDoctor = appointedDoctor;
    }

    public String getAppointedTime() {
        return appointedTime;
    }

    public void setAppointedTime(String appointedTime) {
        this.appointedTime = appointedTime;
    }

    public String getNurseEmail() {
        return nurseEmail;
    }

    public void setNurseEmail(String nurseEmail) {
        this.nurseEmail = nurseEmail;
    }

    public Integer getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(Integer roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(String addedDate) {
        this.addedDate = addedDate;
    }
}

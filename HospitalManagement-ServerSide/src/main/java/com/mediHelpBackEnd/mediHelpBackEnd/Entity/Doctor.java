package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dId;
    private String doctorId;
    private String doctorName;
    private String doctorEmail;
    private String doctorSpecialization;
    private BigDecimal doctorCharge;
    private Integer doctorRoom;

    public Long getdId() {
        return dId;
    }

    public void setdId(Long dId) {
        this.dId = dId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public String getDoctorSpecialization() {
        return doctorSpecialization;
    }

    public void setDoctorSpecialization(String doctorSpecialization) {
        this.doctorSpecialization = doctorSpecialization;
    }

    public BigDecimal getDoctorCharge() {
        return doctorCharge;
    }

    public void setDoctorCharge(BigDecimal doctorCharge) {
        this.doctorCharge = doctorCharge;
    }

    public Integer getDoctorRoom() {
        return doctorRoom;
    }

    public void setDoctorRoom(Integer doctorRoom) {
        this.doctorRoom = doctorRoom;
    }
}
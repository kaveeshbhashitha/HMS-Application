package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity
public class ScheduleDoctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schId;
    private String doctorName;
    private String doctorSpecialization;
    private String doctorEmail;
    private Integer doctorRoom;
    private BigDecimal doctorCharge;
    private BigDecimal hospitalCharge;
    private String availableTime;
    private String availableDate;

    public Long getSchId() {
        return schId;
    }

    public void setSchId(Long schId) {
        this.schId = schId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorSpecialization() {
        return doctorSpecialization;
    }

    public void setDoctorSpecialization(String doctorSpecialization) {
        this.doctorSpecialization = doctorSpecialization;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public Integer getDoctorRoom() {
        return doctorRoom;
    }

    public void setDoctorRoom(Integer doctorRoom) {
        this.doctorRoom = doctorRoom;
    }

    public BigDecimal getDoctorCharge() {
        return doctorCharge;
    }

    public void setDoctorCharge(BigDecimal doctorCharge) {
        this.doctorCharge = doctorCharge;
    }

    public BigDecimal getHospitalCharge() {
        return hospitalCharge;
    }

    public void setHospitalCharge(BigDecimal hospitalCharge) {
        this.hospitalCharge = hospitalCharge;
    }

    public String getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(String availableTime) {
        this.availableTime = availableTime;
    }

    public String getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(String availableDate) {
        this.availableDate = availableDate;
    }

}

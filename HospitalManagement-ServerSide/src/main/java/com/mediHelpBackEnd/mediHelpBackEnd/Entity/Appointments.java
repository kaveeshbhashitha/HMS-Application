package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appId;
    private String patientName;
    private String patientEmail;
    private String patientGender;
    private Integer patientAge;
    private String doctorName;
    private String doctorSpecialization;
    private Integer doctorRoom;
    private BigDecimal doctorCharge;
    private BigDecimal hospitalCharge;
    private String availableDate;
    private String availableTime;

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
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

    public String getAvailableDate() {
        return availableDate;
    }

    public void setAvailableDate(String availableDate) {
        this.availableDate = availableDate;
    }

    public String getAvailableTime() {
        return availableTime;
    }

    public void setAvailableTime(String availableTime) {
        this.availableTime = availableTime;
    }

    public String getPatientGender() {
        return patientGender;
    }

    public void setPatientGender(String patientGender) {
        this.patientGender = patientGender;
    }

    public Integer getPatientAge() {
        return patientAge;
    }

    public void setPatientAge(Integer patientAge) {
        this.patientAge = patientAge;
    }
}

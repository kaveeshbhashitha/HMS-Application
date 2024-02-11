package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pRecId;
    private String patientName;
    private String patientEmail;
    private String patientGender;
    private Integer patientAge;
    private String doctorName;
    private String patientDiagnosis;
    private String doctorNote;
    private String drug01;
    private String drug02;
    private String drug03;
    private String drug04;
    private String drug05;
    private String drug06;
    private String drug07;
    private String drug08;
    private String drug09;
    private String drug10;

    public Long getpRecId() {
        return pRecId;
    }

    public void setpRecId(Long pRecId) {
        this.pRecId = pRecId;
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

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getPatientDiagnosis() {
        return patientDiagnosis;
    }

    public void setPatientDiagnosis(String patientDiagnosis) {
        this.patientDiagnosis = patientDiagnosis;
    }

    public String getDoctorNote() {
        return doctorNote;
    }

    public void setDoctorNote(String doctorNote) {
        this.doctorNote = doctorNote;
    }

    public String getDrug01() {
        return drug01;
    }

    public void setDrug01(String drug01) {
        this.drug01 = drug01;
    }

    public String getDrug02() {
        return drug02;
    }

    public void setDrug02(String drug02) {
        this.drug02 = drug02;
    }

    public String getDrug03() {
        return drug03;
    }

    public void setDrug03(String drug03) {
        this.drug03 = drug03;
    }

    public String getDrug04() {
        return drug04;
    }

    public void setDrug04(String drug04) {
        this.drug04 = drug04;
    }

    public String getDrug05() {
        return drug05;
    }

    public void setDrug05(String drug05) {
        this.drug05 = drug05;
    }

    public String getDrug06() {
        return drug06;
    }

    public void setDrug06(String drug06) {
        this.drug06 = drug06;
    }

    public String getDrug07() {
        return drug07;
    }

    public void setDrug07(String drug07) {
        this.drug07 = drug07;
    }

    public String getDrug08() {
        return drug08;
    }

    public void setDrug08(String drug08) {
        this.drug08 = drug08;
    }

    public String getDrug09() {
        return drug09;
    }

    public void setDrug09(String drug09) {
        this.drug09 = drug09;
    }

    public String getDrug10() {
        return drug10;
    }

    public void setDrug10(String drug10) {
        this.drug10 = drug10;
    }
}

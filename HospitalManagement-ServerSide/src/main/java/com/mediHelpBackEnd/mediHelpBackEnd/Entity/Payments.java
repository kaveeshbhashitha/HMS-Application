package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;

@Entity
public class Payments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payId;
    private String patientName;
    private String patientEmail;
    private String serviceType;
    private BigDecimal hospitalCharge;
    private BigDecimal doctorCharges;
    private BigDecimal otherCharges;
    private BigDecimal reportCharge;
    private String paymentDate;

    public Long getPayId() {
        return payId;
    }

    public void setPayId(Long payId) {
        this.payId = payId;
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

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public BigDecimal getHospitalCharge() {
        return hospitalCharge;
    }

    public void setHospitalCharge(BigDecimal hospitalCharge) {
        this.hospitalCharge = hospitalCharge;
    }

    public BigDecimal getDoctorCharges() {
        return doctorCharges;
    }

    public void setDoctorCharges(BigDecimal doctorCharges) {
        this.doctorCharges = doctorCharges;
    }

    public BigDecimal getOtherCharges() {
        return otherCharges;
    }

    public void setOtherCharges(BigDecimal otherCharges) {
        this.otherCharges = otherCharges;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getReportCharge() {
        return reportCharge;
    }

    public void setReportCharge(BigDecimal reportCharge) {
        this.reportCharge = reportCharge;
    }
}

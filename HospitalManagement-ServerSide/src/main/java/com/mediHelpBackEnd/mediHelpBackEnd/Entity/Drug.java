package com.mediHelpBackEnd.mediHelpBackEnd.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Drug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long drugId;
    private String drugName;
    private Integer drugQuantity;
    private String drugStatus;
    private String drugAddedDate;
    private BigDecimal drugCharge;

    public Long getDrugId() {
        return drugId;
    }

    public void setDrugId(Long drugId) {
        this.drugId = drugId;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public Integer getDrugQuantity() {
        return drugQuantity;
    }

    public void setDrugQuantity(Integer drugQuantity) {
        this.drugQuantity = drugQuantity;
    }

    public String getDrugStatus() {
        return drugStatus;
    }

    public void setDrugStatus(String drugStatus) {
        this.drugStatus = drugStatus;
    }

    public String getDrugAddedDate() {
        return drugAddedDate;
    }

    public void setDrugAddedDate(String drugAddedDate) {
        this.drugAddedDate = drugAddedDate;
    }

    public BigDecimal getDrugCharge() {
        return drugCharge;
    }

    public void setDrugCharge(BigDecimal drugCharge) {
        this.drugCharge = drugCharge;
    }
}

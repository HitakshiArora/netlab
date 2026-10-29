package com.hiTech.Netlab.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "desktop")
public class Desktop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "serviceTag")
    @NotBlank(message = "Service Tag Name must not be null")
    @Size(max = 20)
    private String serviceTag;

    @Column(name = "description")
    @NotBlank(message = "Description must not be null")
    private String description;

    @Column(name = "hardwareConf")
    @NotBlank(message = "Hardware Configuration must not be null")
    private String hardwareConf;

    @Column(name = "location")
    @NotBlank(message = "Location must not be blank")
    private String location;

    @Column(name = "ipAddress")
    @NotBlank(message = "IP Address must not be blank")
    private String ipAddress;

    @Column(name = "os")
    @NotBlank(message = "OS must not be blank")
    private String os;

    @Column(name = "team")
    @NotBlank(message = "Team must not be blank")
    private String team;

    @Column(name = "status")
    @NotBlank(message = "Status must not be blank")
    private String status;

    @Column(name = "purchaseBy")
    @NotBlank(message = "Purchase By must not be blank")
    private String purchaseBy;

    public Desktop() {
    }

    public Desktop(String serviceTag, String description, String hardwareConf, String ipAddress, String location, String os, String team, String status, String purchaseBy) {

        this.serviceTag = serviceTag;
        this.description = description;
        this.hardwareConf = hardwareConf;
        this.ipAddress = ipAddress;
        this.location = location;
        this.os = os;
        this.team = team;
        this.status = status;
        this.purchaseBy = purchaseBy;
    }

    public String getServiceTag() {
        return serviceTag;
    }

    public void setServiceTag(String serviceTag) {
        this.serviceTag = serviceTag;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHardwareConf() {
        return hardwareConf;
    }

    public void setHardwareConf(String hardwareConf) {
        this.hardwareConf = hardwareConf;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPurchaseBy() {
        return purchaseBy;
    }

    public void setPurchaseBy(String purchaseBy) {
        this.purchaseBy = purchaseBy;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

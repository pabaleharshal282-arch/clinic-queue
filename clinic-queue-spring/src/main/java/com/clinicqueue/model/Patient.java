package com.clinicqueue.model;

public class Patient {
    private int tokenNumber;
    private String name;

    public Patient(int tokenNumber, String name) {
        this.tokenNumber = tokenNumber;
        this.name = name;
    }

    public int getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(int tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

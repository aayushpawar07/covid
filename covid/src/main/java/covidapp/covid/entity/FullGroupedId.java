package covidapp.covid.entity;

import java.io.Serializable;
import java.time.LocalDate;

public class FullGroupedId implements Serializable {

    private LocalDate date;
    private String countryRegion;

    // default constructor
    public FullGroupedId() {}

    // getters & setters
}

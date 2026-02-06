package covidapp.covid.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class FullGroupedId implements Serializable {

    private LocalDate date;
    private String countryRegion;

    // default constructor
    public FullGroupedId() {}

    public FullGroupedId(LocalDate date, String countryRegion) {
        this.date = date;
        this.countryRegion = countryRegion;
    }

    // getters & setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCountryRegion() {
        return countryRegion;
    }

    public void setCountryRegion(String countryRegion) {
        this.countryRegion = countryRegion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FullGroupedId that = (FullGroupedId) o;
        return Objects.equals(date, that.date) && Objects.equals(countryRegion, that.countryRegion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, countryRegion);
    }
}

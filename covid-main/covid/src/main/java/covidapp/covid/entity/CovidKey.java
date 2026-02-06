package covidapp.covid.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CovidKey implements Serializable {

    @Column(name = "Province/State")
    private String provinceState;

    @Column(name = "Country/Region")
    private String countryRegion;

    @Column(name = "Date")
    private String date;

    public CovidKey() {}

    public CovidKey(String provinceState, String countryRegion, String date) {
        this.provinceState = provinceState;
        this.countryRegion = countryRegion;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CovidKey)) return false;
        CovidKey key = (CovidKey) o;
        return Objects.equals(provinceState, key.provinceState) &&
                Objects.equals(countryRegion, key.countryRegion) &&
                Objects.equals(date, key.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(provinceState, countryRegion, date);
    }
}

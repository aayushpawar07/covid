package covidapp.covid.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Data
@IdClass(FullGroupedId.class)
@Table(name = "full_grouped")
public class FullGrouped {

    @Id
    @Column(name = "Date")
    private LocalDate date;

    @Id
    @Column(name = "Country/Region")
    private String countryRegion;

    @Column(name = "Confirmed")
    private Integer confirmed;

    @Column(name = "Deaths")
    private Integer deaths;

    @Column(name = "Recovered")
    private Integer recovered;

    @Column(name = "Active")
    private Integer active;

    @Column(name = "New cases")
    private Integer newCases;

    @Column(name = "New deaths")
    private Integer newDeaths;

    @Column(name = "New recovered")
    private Integer newRecovered;

    @Column(name = "WHO Region")
    private String whoRegion;
}

package covidapp.covid.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "country_wise_latest")
@Data
public class CountryWiseLatest {

    @Id
    @Column(name = "Country/Region")
    private String country;

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

    @Column(name = "Deaths / 100 Cases")
    private Double deathsPer100Cases;

    @Column(name = "Recovered / 100 Cases")
    private Double recoveredPer100Cases;

    @Column(name = "Deaths / 100 Recovered")
    private Double deathsPer100Recovered;

    @Column(name = "Confirmed last week")
    private Integer confirmedLastWeek;

    @Column(name = "1 week change")
    private Integer oneWeekChange;

    @Column(name = "1 week % increase")
    private Double oneWeekPercentIncrease;

    @Column(name = "WHO Region")
    private String whoRegion;

    // ✅ Add this field (NOT stored in DB)
    @Transient
    private boolean redAlert;
}

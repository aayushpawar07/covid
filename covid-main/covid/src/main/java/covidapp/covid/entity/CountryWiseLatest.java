package covidapp.covid.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Country Wise Latest Entity
 * 
 * Represents country-wise COVID-19 statistics
 * Maps to the "country_wise_latest" table in the database
 * 
 * Fields:
 * - country: Primary key, country name
 * - confirmed: Total confirmed cases
 * - deaths: Total deaths
 * - recovered: Total recovered cases
 * - active: Currently active cases
 * - newCases: New cases reported
 * - newDeaths: New deaths reported
 * - newRecovered: New recoveries reported
 * - deathsPer100Cases: Death rate per 100 cases
 * - recoveredPer100Cases: Recovery rate per 100 cases
 * - deathsPer100Recovered: Death rate per 100 recoveries
 * - confirmedLastWeek: Cases confirmed last week
 * - oneWeekChange: Change in cases over one week
 * - oneWeekPercentIncrease: Percentage increase over one week
 * - whoRegion: WHO region classification
 * - redAlert: Transient field (not in DB) - calculated based on deaths:recovered ratio
 */
@Entity
@Table(name = "country_wise_latest")
@Data // Lombok annotation - automatically generates getters, setters, toString, equals, hashCode
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

    /**
     * Red Alert Flag (Transient Field)
     * 
     * This field is NOT stored in the database (@Transient annotation)
     * It is calculated dynamically in the service layer
     * 
     * Red Alert Logic:
     * - true: If deaths:recovered ratio > 1:10 (deaths/recovered > 0.1)
     * - false: Otherwise
     * 
     * Used in frontend to highlight countries with high mortality rates
     */
    @Transient // Not persisted to database
    private boolean redAlert;
}

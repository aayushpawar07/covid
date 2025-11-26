package covidapp.covid.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "day_wise")
public class DayWise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Date")
    private LocalDate date;

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

    @Column(name = "no_of_countries")
    private Integer numberOfCountries;


    public DayWise() {}

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer getConfirmed() { return confirmed; }
    public void setConfirmed(Integer confirmed) { this.confirmed = confirmed; }

    public Integer getDeaths() { return deaths; }
    public void setDeaths(Integer deaths) { this.deaths = deaths; }

    public Integer getRecovered() { return recovered; }
    public void setRecovered(Integer recovered) { this.recovered = recovered; }

    public Integer getActive() { return active; }
    public void setActive(Integer active) { this.active = active; }

    public Integer getNewCases() { return newCases; }
    public void setNewCases(Integer newCases) { this.newCases = newCases; }

    public Integer getNewDeaths() { return newDeaths; }
    public void setNewDeaths(Integer newDeaths) { this.newDeaths = newDeaths; }

    public Integer getNewRecovered() { return newRecovered; }
    public void setNewRecovered(Integer newRecovered) { this.newRecovered = newRecovered; }

    public Double getDeathsPer100Cases() { return deathsPer100Cases; }
    public void setDeathsPer100Cases(Double deathsPer100Cases) { this.deathsPer100Cases = deathsPer100Cases; }

    public Double getRecoveredPer100Cases() { return recoveredPer100Cases; }
    public void setRecoveredPer100Cases(Double recoveredPer100Cases) { this.recoveredPer100Cases = recoveredPer100Cases; }

    public Double getDeathsPer100Recovered() { return deathsPer100Recovered; }
    public void setDeathsPer100Recovered(Double deathsPer100Recovered) { this.deathsPer100Recovered = deathsPer100Recovered; }

    public Integer getNumberOfCountries() { return numberOfCountries; }
    public void setNumberOfCountries(Integer numberOfCountries) { this.numberOfCountries = numberOfCountries; }
}

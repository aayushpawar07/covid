package covidapp.covid.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "worldometer")
public class WorldometerData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`Country/Region`")
    private String countryRegion;

    @Column(name = "Continent")
    private String continent;

    @Column(name = "Population")
    private Long population;

    @Column(name = "TotalCases")
    private Long totalCases;

    @Column(name = "NewCases")
    private Long newCases;

    @Column(name = "TotalDeaths")
    private Long totalDeaths;

    @Column(name = "NewDeaths")
    private Long newDeaths;

    @Column(name = "TotalRecovered")
    private Long totalRecovered;

    @Column(name = "NewRecovered")
    private Long newRecovered;

    @Column(name = "ActiveCases")
    private Long activeCases;

    @Column(name = "`Serious,Critical`")
    private Long seriousCritical;

    @Column(name = "`Tot Cases/1M pop`")
    private Long totalCases1M;

    @Column(name = "`Deaths/1M pop`")
    private Long deaths1M;

    @Column(name = "TotalTests")
    private Long totalTests;

    @Column(name = "`Tests/1M pop`")
    private Long tests1M;

    @Column(name = "`WHO Region`")
    private String whoRegion;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCountryRegion() { return countryRegion; }
    public void setCountryRegion(String countryRegion) { this.countryRegion = countryRegion; }

    public String getContinent() { return continent; }
    public void setContinent(String continent) { this.continent = continent; }

    public Long getPopulation() { return population; }
    public void setPopulation(Long population) { this.population = population; }

    public Long getTotalCases() { return totalCases; }
    public void setTotalCases(Long totalCases) { this.totalCases = totalCases; }

    public Long getNewCases() { return newCases; }
    public void setNewCases(Long newCases) { this.newCases = newCases; }

    public Long getTotalDeaths() { return totalDeaths; }
    public void setTotalDeaths(Long totalDeaths) { this.totalDeaths = totalDeaths; }

    public Long getNewDeaths() { return newDeaths; }
    public void setNewDeaths(Long newDeaths) { this.newDeaths = newDeaths; }

    public Long getTotalRecovered() { return totalRecovered; }
    public void setTotalRecovered(Long totalRecovered) { this.totalRecovered = totalRecovered; }

    public Long getNewRecovered() { return newRecovered; }
    public void setNewRecovered(Long newRecovered) { this.newRecovered = newRecovered; }

    public Long getActiveCases() { return activeCases; }
    public void setActiveCases(Long activeCases) { this.activeCases = activeCases; }

    public Long getSeriousCritical() { return seriousCritical; }
    public void setSeriousCritical(Long seriousCritical) { this.seriousCritical = seriousCritical; }

    public Long getTotalCases1M() { return totalCases1M; }
    public void setTotalCases1M(Long totalCases1M) { this.totalCases1M = totalCases1M; }

    public Long getDeaths1M() { return deaths1M; }
    public void setDeaths1M(Long deaths1M) { this.deaths1M = deaths1M; }

    public Long getTotalTests() { return totalTests; }
    public void setTotalTests(Long totalTests) { this.totalTests = totalTests; }

    public Long getTests1M() { return tests1M; }
    public void setTests1M(Long tests1M) { this.tests1M = tests1M; }

    public String getWhoRegion() { return whoRegion; }
    public void setWhoRegion(String whoRegion) { this.whoRegion = whoRegion; }
}

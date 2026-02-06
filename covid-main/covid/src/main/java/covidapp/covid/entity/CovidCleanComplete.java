package covidapp.covid.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "covid_19_clean_complete")
@Data
public class CovidCleanComplete {

    @EmbeddedId
    private CovidKey id;   // NO SINGLE @Id

    @Column(name = "Lat")
    private Double lat;

    @Column(name = "Long")
    private Double lon;

    @Column(name = "Confirmed")
    private Integer confirmed;

    @Column(name = "Deaths")
    private Integer deaths;

    @Column(name = "Recovered")
    private Integer recovered;

    @Column(name = "Active")
    private Integer active;

    @Column(name = "WHO Region")
    private String whoRegion;
}

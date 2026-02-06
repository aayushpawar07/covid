package covidapp.covid.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "usa_county_wise")
public class UsaCountryWise {

    @Id
    @Column(name = "UID")
    private Long uid;

    @Column(name = "iso2")
    private String iso2;

    @Column(name = "iso3")
    private String iso3;

    @Column(name = "code3")
    private Integer code3;

    @Column(name = "FIPS")
    private Integer fips;

    @Column(name = "Admin2")
    private String admin2;

    @Column(name = "Province_State")
    private String provinceState;

    @Column(name = "Country_Region")
    private String countryRegion;

    @Column(name = "Lat")
    private Double latitude;

    @Column(name = "Long_")
    private Double longitude;

    @Column(name = "Combined_Key")
    private String combinedKey;

    // 🔥 FIXED: Date stored as string in DB ("1/22/20")
    @Column(name = "Date")
    private String date;

    @Column(name = "Confirmed")
    private Integer confirmed;

    @Column(name = "Deaths")
    private Integer deaths;
}

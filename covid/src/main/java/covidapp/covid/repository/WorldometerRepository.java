package covidapp.covid.repository;

import covidapp.covid.entity.WorldometerData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorldometerRepository extends JpaRepository<WorldometerData, Long> {

    WorldometerData findByCountryRegion(String countryRegion);
}

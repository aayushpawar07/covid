package covidapp.covid.repository;

import covidapp.covid.entity.UsaCountryWise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface UsaCountryWiseRepository extends JpaRepository<UsaCountryWise, Long> {

    List<UsaCountryWise> findByCountryRegion(String country);

    List<UsaCountryWise> findByProvinceState(String province);

    List<UsaCountryWise> findByDate(String date);  // FIXED !!
}


package covidapp.covid.repository;

import covidapp.covid.entity.FullGrouped;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FullGroupedRepository extends JpaRepository<FullGrouped, Long> {

    List<FullGrouped> findByCountryRegion(String countryRegion);

    List<FullGrouped> findByDate(LocalDate date);

    List<FullGrouped> findByWhoRegion(String whoRegion);
}

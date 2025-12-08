package covidapp.covid.repository;

import covidapp.covid.entity.FullGrouped;
import covidapp.covid.entity.FullGroupedId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FullGroupedRepository extends JpaRepository<FullGrouped, FullGroupedId> {

    List<FullGrouped> findByCountryRegion(String countryRegion);

    List<FullGrouped> findByDate(LocalDate date);

    List<FullGrouped> findByWhoRegion(String whoRegion);
}

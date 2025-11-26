package covidapp.covid.repository;

import covidapp.covid.entity.DayWise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DayWiseRepository extends JpaRepository<DayWise, Long> {
    Optional<DayWise> findByDate(LocalDate date);
}

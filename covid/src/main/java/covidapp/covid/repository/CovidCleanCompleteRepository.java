package covidapp.covid.repository;

import covidapp.covid.entity.CovidCleanComplete;
import covidapp.covid.entity.CovidKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CovidCleanCompleteRepository
        extends JpaRepository<CovidCleanComplete, CovidKey> {
}

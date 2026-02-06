package covidapp.covid.repository;



import covidapp.covid.entity.CountryWiseLatest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryWiseRepository extends JpaRepository<CountryWiseLatest, String> {
}


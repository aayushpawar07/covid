package covidapp.covid.service;

import covidapp.covid.entity.UsaCountryWise;
import covidapp.covid.repository.UsaCountryWiseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UsaCountryWiseService {

    private final UsaCountryWiseRepository repo;

    public UsaCountryWiseService(UsaCountryWiseRepository repo) {
        this.repo = repo;
    }

    public List<UsaCountryWise> getAll() {
        return repo.findAll();
    }

    public List<UsaCountryWise> getByCountry(String country) {
        return repo.findByCountryRegion(country);
    }

    public List<UsaCountryWise> getByProvince(String province) {
        return repo.findByProvinceState(province);
    }

    public List<UsaCountryWise> getByDate(String date) {
        return repo.findByDate(date);
    }

}

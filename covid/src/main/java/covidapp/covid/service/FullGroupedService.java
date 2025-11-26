package covidapp.covid.service;

import covidapp.covid.entity.FullGrouped;
import covidapp.covid.repository.FullGroupedRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FullGroupedService {

    private final FullGroupedRepository repo;

    public FullGroupedService(FullGroupedRepository repo) {
        this.repo = repo;
    }

    public List<FullGrouped> getAll() {
        return repo.findAll();
    }

    public List<FullGrouped> getByCountry(String country) {
        return repo.findByCountryRegion(country);
    }

    public List<FullGrouped> getByDate(LocalDate date) {
        return repo.findByDate(date);
    }

    public List<FullGrouped> getByRegion(String region) {
        return repo.findByWhoRegion(region);
    }
}

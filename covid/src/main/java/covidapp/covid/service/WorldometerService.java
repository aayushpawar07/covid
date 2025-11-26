package covidapp.covid.service;

import covidapp.covid.entity.WorldometerData;
import covidapp.covid.repository.WorldometerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorldometerService {

    private final WorldometerRepository repo;

    public WorldometerService(WorldometerRepository repo) {
        this.repo = repo;
    }

    public List<WorldometerData> getAll() {
        return repo.findAll();
    }

    public WorldometerData getByCountry(String country) {
        return repo.findByCountryRegion(country);
    }
}

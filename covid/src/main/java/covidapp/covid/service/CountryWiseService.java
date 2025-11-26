package covidapp.covid.service;

import covidapp.covid.entity.CountryWiseLatest;
import covidapp.covid.repository.CountryWiseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryWiseService {

    private final CountryWiseRepository repo;

    public CountryWiseService(CountryWiseRepository repo) {
        this.repo = repo;
    }

    public List<CountryWiseLatest> getAll() {
        List<CountryWiseLatest> list = repo.findAll();

        // 🔥 Set red alert for each country
        list.forEach(country -> {
            boolean alert = country.getRecovered() != 0 &&
                    ((double) country.getDeaths() / country.getRecovered()) > 0.1;
            country.setRedAlert(alert);
        });

        return list;
    }

    public CountryWiseLatest getByCountry(String country) {
        CountryWiseLatest data = repo.findById(country).orElse(null);

        if (data != null) {
            boolean alert = data.getRecovered() != 0 &&
                    ((double) data.getDeaths() / data.getRecovered()) > 0.1;
            data.setRedAlert(alert);
        }

        return data;
    }

    public CountryWiseLatest saveCountry(CountryWiseLatest data) {

        // 🔥 Set redAlert before saving (optional)
        boolean alert = data.getRecovered() != 0 &&
                ((double) data.getDeaths() / data.getRecovered()) > 0.1;
        data.setRedAlert(alert);

        return repo.save(data);
    }
}

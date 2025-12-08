package covidapp.covid.service;

import covidapp.covid.entity.DayWise;
import covidapp.covid.repository.DayWiseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DayWiseService {

    private final DayWiseRepository repository;

    public DayWiseService(DayWiseRepository repository) {
        this.repository = repository;
    }

    public List<DayWise> getAll() {
        try {
            List<DayWise> data = repository.findAll();
            // Return empty list if null (shouldn't happen, but safety check)
            return data != null ? data : new java.util.ArrayList<>();
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error fetching day-wise data: " + e.getMessage());
            e.printStackTrace();
            // Return empty list instead of throwing exception
            // This prevents 500 error if table doesn't exist
            return new java.util.ArrayList<>();
        }
    }

    public DayWise getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
    }

    public DayWise getByDate(LocalDate date) {
        return repository.findByDate(date).orElse(null);
    }

    public DayWise create(DayWise dayWise) {
        dayWise.setId(null); // Auto-generate ID
        return repository.save(dayWise);
    }

    public DayWise update(Long id, DayWise dayWise) {
        DayWise existing = getById(id);

        existing.setDate(dayWise.getDate());
        existing.setConfirmed(dayWise.getConfirmed());
        existing.setDeaths(dayWise.getDeaths());
        existing.setRecovered(dayWise.getRecovered());
        existing.setActive(dayWise.getActive());
        existing.setNewCases(dayWise.getNewCases());
        existing.setNewDeaths(dayWise.getNewDeaths());
        existing.setNewRecovered(dayWise.getNewRecovered());
        existing.setDeathsPer100Cases(dayWise.getDeathsPer100Cases());
        existing.setRecoveredPer100Cases(dayWise.getRecoveredPer100Cases());
        existing.setDeathsPer100Recovered(dayWise.getDeathsPer100Recovered());
        existing.setNumberOfCountries(dayWise.getNumberOfCountries());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

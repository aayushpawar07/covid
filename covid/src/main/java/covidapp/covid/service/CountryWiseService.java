package covidapp.covid.service;

import covidapp.covid.entity.CountryWiseLatest;
import covidapp.covid.repository.CountryWiseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Country Wise Service
 * 
 * This service handles all business logic for country-wise COVID-19 data:
 * - Retrieving country data from database
 * - Calculating red alert status based on deaths:recovered ratio
 * - CRUD operations (Create, Read, Update, Delete) for country data
 * 
 * Red Alert Logic:
 * - A country gets red alert if deaths:recovered ratio > 1:10
 * - Formula: (deaths / recovered) > 0.1
 * - This indicates high mortality rate relative to recoveries
 */
@Service
public class CountryWiseService {

    // Repository for database operations on CountryWiseLatest entity
    private final CountryWiseRepository repo;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects CountryWiseRepository
     */
    public CountryWiseService(CountryWiseRepository repo) {
        this.repo = repo;
    }

    /**
     * Get All Countries
     * 
     * Retrieves all country-wise COVID-19 data from database
     * and calculates red alert status for each country
     * 
     * @return List of all countries with their COVID-19 statistics
     * 
     * Red Alert Calculation:
     * - If recovered > 0: Calculate deaths:recovered ratio
     * - If ratio > 0.1 (1:10): Set redAlert = true (high mortality rate)
     * - Otherwise: Set redAlert = false
     */
    public List<CountryWiseLatest> getAll() {
        // Fetch all countries from database
        List<CountryWiseLatest> list = repo.findAll();

        // Calculate and set red alert status for each country
        // Red alert = deaths:recovered ratio > 1:10 (more than 1 death per 10 recoveries)
        list.forEach(country -> {
            // Check if recovered is not zero to avoid division by zero
            boolean alert = country.getRecovered() != 0 &&
                    ((double) country.getDeaths() / country.getRecovered()) > 0.1;
            country.setRedAlert(alert);
        });

        return list;
    }

    /**
     * Get Country by Name
     * 
     * Retrieves COVID-19 data for a specific country
     * 
     * @param country Country name (used as primary key)
     * @return CountryWiseLatest object with data and red alert status, or null if not found
     */
    public CountryWiseLatest getByCountry(String country) {
        // Find country in database by name (primary key)
        CountryWiseLatest data = repo.findById(country).orElse(null);

        // Calculate red alert status if country exists
        if (data != null) {
            boolean alert = data.getRecovered() != 0 &&
                    ((double) data.getDeaths() / data.getRecovered()) > 0.1;
            data.setRedAlert(alert);
        }

        return data;
    }

    /**
     * Create/Add New Country
     * 
     * Saves a new country's COVID-19 data to database
     * 
     * @param data CountryWiseLatest object with country data
     * @return Saved CountryWiseLatest object with red alert status calculated
     */
    public CountryWiseLatest saveCountry(CountryWiseLatest data) {
        // Calculate red alert status before saving
        boolean alert = data.getRecovered() != 0 &&
                ((double) data.getDeaths() / data.getRecovered()) > 0.1;
        data.setRedAlert(alert);

        // Save to database and return
        return repo.save(data);
    }

    /**
     * Update Existing Country Data
     * 
     * Updates COVID-19 statistics for an existing country
     * Only updates fields that are provided (not null)
     * 
     * @param country Country name (primary key)
     * @param data CountryWiseLatest object with updated fields
     * @return Updated CountryWiseLatest object
     * @throws RuntimeException if country not found
     * 
     * Process:
     * 1. Find existing country in database
     * 2. Update only non-null fields (partial update)
     * 3. Recalculate red alert status based on updated data
     * 4. Save and return updated country
     */
    public CountryWiseLatest updateCountry(String country, CountryWiseLatest data) {
        // Find existing country or throw exception if not found
        CountryWiseLatest existing = repo.findById(country)
                .orElseThrow(() -> new RuntimeException("Country not found: " + country));
        
        // Update only fields that are provided (partial update)
        // This allows updating specific fields without affecting others
        if (data.getConfirmed() != null) existing.setConfirmed(data.getConfirmed());
        if (data.getDeaths() != null) existing.setDeaths(data.getDeaths());
        if (data.getRecovered() != null) existing.setRecovered(data.getRecovered());
        if (data.getActive() != null) existing.setActive(data.getActive());
        if (data.getNewCases() != null) existing.setNewCases(data.getNewCases());
        if (data.getNewDeaths() != null) existing.setNewDeaths(data.getNewDeaths());
        if (data.getNewRecovered() != null) existing.setNewRecovered(data.getNewRecovered());
        if (data.getDeathsPer100Cases() != null) existing.setDeathsPer100Cases(data.getDeathsPer100Cases());
        if (data.getRecoveredPer100Cases() != null) existing.setRecoveredPer100Cases(data.getRecoveredPer100Cases());
        if (data.getDeathsPer100Recovered() != null) existing.setDeathsPer100Recovered(data.getDeathsPer100Recovered());
        if (data.getConfirmedLastWeek() != null) existing.setConfirmedLastWeek(data.getConfirmedLastWeek());
        if (data.getOneWeekChange() != null) existing.setOneWeekChange(data.getOneWeekChange());
        if (data.getOneWeekPercentIncrease() != null) existing.setOneWeekPercentIncrease(data.getOneWeekPercentIncrease());
        if (data.getWhoRegion() != null) existing.setWhoRegion(data.getWhoRegion());

        // Recalculate red alert status with updated data
        boolean alert = existing.getRecovered() != 0 &&
                ((double) existing.getDeaths() / existing.getRecovered()) > 0.1;
        existing.setRedAlert(alert);

        // Save updated country to database
        return repo.save(existing);
    }

    /**
     * Delete Country
     * 
     * Removes a country's data from database
     * 
     * @param country Country name (primary key)
     * @throws RuntimeException if country not found
     */
    public void deleteCountry(String country) {
        // Check if country exists before deleting
        if (!repo.existsById(country)) {
            throw new RuntimeException("Country not found: " + country);
        }
        // Delete country from database
        repo.deleteById(country);
    }
}

package covidapp.covid.service;

import covidapp.covid.entity.FullGrouped;
import covidapp.covid.repository.FullGroupedRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * Full Grouped Service
 * 
 * Business logic layer for day-wise, country-wise COVID-19 data
 * Uses composite primary key (date + country)
 * 
 * Features:
 * - CRUD operations with composite key
 * - Query by country, date, or WHO region
 * - Partial updates (only update provided fields)
 */
@Service
public class FullGroupedService {

    // Repository for database operations on FullGrouped entity
    private final FullGroupedRepository repo;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects FullGroupedRepository
     */
    public FullGroupedService(FullGroupedRepository repo) {
        this.repo = repo;
    }

    public List<FullGrouped> getAll() {
        try {
            List<FullGrouped> data = repo.findAll();
            // Return empty list if null (shouldn't happen, but safety check)
            return data != null ? data : new java.util.ArrayList<>();
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error fetching full grouped data: " + e.getMessage());
            e.printStackTrace();
            // Return empty list instead of throwing exception
            // This prevents 500 error if table doesn't exist
            return new java.util.ArrayList<>();
        }
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

    /**
     * Get Full Grouped Data by Composite Key
     * 
     * Finds data using composite primary key (date + country)
     * 
     * @param date Date of the record
     * @param countryRegion Country name
     * @return FullGrouped object, or null if not found
     */
    public FullGrouped getById(LocalDate date, String countryRegion) {
        // Create composite key object (date + country)
        covidapp.covid.entity.FullGroupedId id = new covidapp.covid.entity.FullGroupedId(date, countryRegion);
        return repo.findById(id).orElse(null);
    }

    public FullGrouped create(FullGrouped data) {
        return repo.save(data);
    }

    public FullGrouped update(LocalDate date, String countryRegion, FullGrouped data) {
        FullGrouped existing = getById(date, countryRegion);
        if (existing == null) {
            throw new RuntimeException("FullGrouped data not found");
        }
        
        if (data.getConfirmed() != null) existing.setConfirmed(data.getConfirmed());
        if (data.getDeaths() != null) existing.setDeaths(data.getDeaths());
        if (data.getRecovered() != null) existing.setRecovered(data.getRecovered());
        if (data.getActive() != null) existing.setActive(data.getActive());
        if (data.getNewCases() != null) existing.setNewCases(data.getNewCases());
        if (data.getNewDeaths() != null) existing.setNewDeaths(data.getNewDeaths());
        if (data.getNewRecovered() != null) existing.setNewRecovered(data.getNewRecovered());
        if (data.getWhoRegion() != null) existing.setWhoRegion(data.getWhoRegion());

        return repo.save(existing);
    }

    public void delete(LocalDate date, String countryRegion) {
        FullGrouped existing = getById(date, countryRegion);
        if (existing == null) {
            throw new RuntimeException("FullGrouped data not found");
        }
        repo.delete(existing);
    }
}

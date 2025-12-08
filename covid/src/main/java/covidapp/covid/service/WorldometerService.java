package covidapp.covid.service;

import covidapp.covid.entity.WorldometerData;
import covidapp.covid.repository.WorldometerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Worldometer Service
 * 
 * Business logic layer for Worldometer COVID-19 data
 * Handles all database operations and business rules
 * 
 * Features:
 * - CRUD operations (Create, Read, Update, Delete)
 * - Data retrieval by ID, country name, or all records
 * - Partial updates (only update provided fields)
 */
@Service
public class WorldometerService {

    // Repository for database operations on WorldometerData entity
    private final WorldometerRepository repo;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects WorldometerRepository
     */
    public WorldometerService(WorldometerRepository repo) {
        this.repo = repo;
    }

    /**
     * Get All Worldometer Data
     * 
     * Retrieves all worldometer records from database
     * 
     * @return List of all WorldometerData objects
     */
    public List<WorldometerData> getAll() {
        try {
            List<WorldometerData> data = repo.findAll();
            // Return empty list if null (shouldn't happen, but safety check)
            return data != null ? data : new java.util.ArrayList<>();
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error fetching worldometer data: " + e.getMessage());
            e.printStackTrace();
            // Return empty list instead of throwing exception
            // This prevents 500 error if table doesn't exist
            return new java.util.ArrayList<>();
        }
    }

    /**
     * Get Worldometer Data by Country Name
     * 
     * Finds worldometer data for a specific country
     * 
     * @param country Country name to search for
     * @return WorldometerData object, or null if not found
     */
    public WorldometerData getByCountry(String country) {
        return repo.findByCountryRegion(country);
    }

    /**
     * Get Worldometer Data by ID
     * 
     * Finds worldometer data by primary key (ID)
     * 
     * @param id Primary key ID
     * @return WorldometerData object
     * @throws RuntimeException if record not found
     */
    public WorldometerData getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Worldometer data not found with id: " + id));
    }

    /**
     * Create New Worldometer Data
     * 
     * Saves a new worldometer record to database
     * 
     * @param data WorldometerData object to save
     * @return Saved WorldometerData object (with generated ID)
     */
    public WorldometerData create(WorldometerData data) {
        return repo.save(data);
    }

    /**
     * Update Existing Worldometer Data
     * 
     * Updates worldometer record by ID
     * Only updates fields that are provided (not null) - partial update
     * 
     * @param id Primary key ID of record to update
     * @param data WorldometerData object with updated fields
     * @return Updated WorldometerData object
     * @throws RuntimeException if record not found
     * 
     * Process:
     * 1. Find existing record by ID
     * 2. Update only non-null fields from provided data
     * 3. Save updated record to database
     */
    public WorldometerData update(Long id, WorldometerData data) {
        // Find existing record or throw exception
        WorldometerData existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Worldometer data not found with id: " + id));
        
        // Update only fields that are provided (partial update)
        // This allows updating specific fields without affecting others
        if (data.getCountryRegion() != null) existing.setCountryRegion(data.getCountryRegion());
        if (data.getContinent() != null) existing.setContinent(data.getContinent());
        if (data.getPopulation() != null) existing.setPopulation(data.getPopulation());
        if (data.getTotalCases() != null) existing.setTotalCases(data.getTotalCases());
        if (data.getNewCases() != null) existing.setNewCases(data.getNewCases());
        if (data.getTotalDeaths() != null) existing.setTotalDeaths(data.getTotalDeaths());
        if (data.getNewDeaths() != null) existing.setNewDeaths(data.getNewDeaths());
        if (data.getTotalRecovered() != null) existing.setTotalRecovered(data.getTotalRecovered());
        if (data.getNewRecovered() != null) existing.setNewRecovered(data.getNewRecovered());
        if (data.getActiveCases() != null) existing.setActiveCases(data.getActiveCases());
        if (data.getSeriousCritical() != null) existing.setSeriousCritical(data.getSeriousCritical());
        if (data.getTotalCases1M() != null) existing.setTotalCases1M(data.getTotalCases1M());
        if (data.getDeaths1M() != null) existing.setDeaths1M(data.getDeaths1M());
        if (data.getTotalTests() != null) existing.setTotalTests(data.getTotalTests());
        if (data.getTests1M() != null) existing.setTests1M(data.getTests1M());
        if (data.getWhoRegion() != null) existing.setWhoRegion(data.getWhoRegion());

        // Save updated record to database
        return repo.save(existing);
    }

    /**
     * Delete Worldometer Data
     * 
     * Removes worldometer record from database by ID
     * 
     * @param id Primary key ID of record to delete
     * @throws RuntimeException if record not found
     */
    public void delete(Long id) {
        // Check if record exists before deleting
        if (!repo.existsById(id)) {
            throw new RuntimeException("Worldometer data not found with id: " + id);
        }
        // Delete record from database
        repo.deleteById(id);
    }
}

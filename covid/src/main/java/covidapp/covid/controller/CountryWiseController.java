package covidapp.covid.controller;
   
import covidapp.covid.entity.CountryWiseLatest;
import covidapp.covid.service.CountryWiseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Country Wise Controller
 * 
 * REST API endpoints for country-wise COVID-19 data
 * Handles CRUD operations (Create, Read, Update, Delete)
 * 
 * Base URL: /api/country
 * 
 * Endpoints:
 * - GET /all - Get all countries
 * - GET /{country} - Get specific country by name
 * - POST /add - Add new country data
 * - PUT /{country} - Update existing country data
 * - DELETE /{country} - Delete country data
 */
@RestController
@RequestMapping("/api/country")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class CountryWiseController {

    // Service layer for business logic
    private final CountryWiseService service;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects CountryWiseService
     */
    public CountryWiseController(CountryWiseService service) {
        this.service = service;
    }

    /**
     * Get All Countries
     * 
     * GET /api/country/all
     * 
     * Retrieves all country-wise COVID-19 data
     * Each country includes red alert status calculation
     * 
     * @return List of all countries with their COVID-19 statistics
     */
    @GetMapping("/all")
    public List<CountryWiseLatest> getAll() {
        // Service handles fetching and red alert calculation
        return service.getAll();
    }

    /**
     * Get Country by Name
     * 
     * GET /api/country/{country}
     * 
     * Retrieves COVID-19 data for a specific country
     * 
     * @param country Country name (path variable, e.g., "Afghanistan")
     * @return CountryWiseLatest object with country data and red alert status
     */
    @GetMapping("/{country}")
    public CountryWiseLatest getByCountry(@PathVariable String country) {
        // Service handles fetching and red alert calculation
        return service.getByCountry(country);
    }

    /**
     * Add New Country
     * 
     * POST /api/country/add
     * 
     * Creates a new country entry in the database
     * 
     * @param data CountryWiseLatest object with country data (from request body)
     * @return Saved CountryWiseLatest object with red alert status
     */
    @PostMapping("/add")
    public CountryWiseLatest addNewCountry(@RequestBody CountryWiseLatest data) {
        // Service handles saving and red alert calculation
        return service.saveCountry(data);
    }

    /**
     * Update Country Data
     * 
     * PUT /api/country/{country}
     * 
     * Updates existing country's COVID-19 statistics
     * Only updates fields that are provided (partial update)
     * 
     * @param country Country name (path variable)
     * @param data CountryWiseLatest object with updated fields (from request body)
     * @return Updated CountryWiseLatest object
     */
    @PutMapping("/{country}")
    public CountryWiseLatest updateCountry(@PathVariable String country, @RequestBody CountryWiseLatest data) {
        // Service handles updating and red alert recalculation
        return service.updateCountry(country, data);
    }

    /**
     * Delete Country
     * 
     * DELETE /api/country/{country}
     * 
     * Removes a country's data from the database
     * 
     * @param country Country name (path variable)
     */
    @DeleteMapping("/{country}")
    public void deleteCountry(@PathVariable String country) {
        // Service handles deletion
        service.deleteCountry(country);
    }

}


package covidapp.covid.controller;

import covidapp.covid.entity.WorldometerData;
import covidapp.covid.service.WorldometerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Worldometer Controller
 * 
 * REST API endpoints for Worldometer COVID-19 data
 * Handles CRUD operations (Create, Read, Update, Delete)
 * 
 * Base URL: /api/worldometer
 * 
 * Endpoints:
 * - GET /all - Get all worldometer data
 * - GET /country/{name} - Get data by country name
 * - GET /{id} - Get data by ID
 * - POST / - Create new worldometer data
 * - PUT /{id} - Update existing data by ID
 * - DELETE /{id} - Delete data by ID
 */
@RestController
@RequestMapping("/api/worldometer")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class WorldometerController {

    // Service layer for business logic
    private final WorldometerService service;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects WorldometerService
     */
    public WorldometerController(WorldometerService service) {
        this.service = service;
    }

    /**
     * Get All Worldometer Data
     * 
     * GET /api/worldometer/all
     * 
     * @return List of all worldometer COVID-19 data
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        try {
            List<WorldometerData> data = service.getAll();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch worldometer data: " + e.getMessage());
            error.put("error", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Get Worldometer Data by Country Name
     * 
     * GET /api/worldometer/country/{name}
     * 
     * @param name Country name (path variable)
     * @return WorldometerData object for the country
     */
    @GetMapping("/country/{name}")
    public WorldometerData getByCountry(@PathVariable String name) {
        return service.getByCountry(name);
    }

    /**
     * Get Worldometer Data by ID
     * 
     * GET /api/worldometer/{id}
     * 
     * @param id Record ID (path variable)
     * @return WorldometerData object with the specified ID
     */
    @GetMapping("/{id}")
    public WorldometerData getById(@PathVariable Long id) {
        return service.getById(id);
    }

    /**
     * Create New Worldometer Data
     * 
     * POST /api/worldometer
     * 
     * @param data WorldometerData object from request body
     * @return Saved WorldometerData object
     */
    @PostMapping
    public WorldometerData create(@RequestBody WorldometerData data) {
        return service.create(data);
    }

    /**
     * Update Worldometer Data
     * 
     * PUT /api/worldometer/{id}
     * 
     * Updates existing worldometer data by ID
     * Only updates fields that are provided (partial update)
     * 
     * @param id Record ID (path variable)
     * @param data WorldometerData object with updated fields (from request body)
     * @return Updated WorldometerData object
     */
    @PutMapping("/{id}")
    public WorldometerData update(@PathVariable Long id, @RequestBody WorldometerData data) {
        return service.update(id, data);
    }

    /**
     * Delete Worldometer Data
     * 
     * DELETE /api/worldometer/{id}
     * 
     * Removes worldometer data from database by ID
     * 
     * @param id Record ID (path variable)
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

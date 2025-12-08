package covidapp.covid.controller;

import covidapp.covid.entity.FullGrouped;
import covidapp.covid.service.FullGroupedService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Full Grouped Controller
 * 
 * REST API endpoints for day-wise, country-wise COVID-19 data
 * Uses composite primary key (date + country)
 * 
 * Base URL: /api/fullgrouped
 * 
 * Endpoints:
 * - GET /all - Get all full grouped data
 * - GET /country/{name} - Get all data for a country
 * - GET /date/{date} - Get all data for a specific date
 * - GET /region/{region} - Get all data for a WHO region
 * - GET /{date}/{country} - Get specific record by date and country
 * - POST / - Create new full grouped data
 * - PUT /{date}/{country} - Update existing data
 * - DELETE /{date}/{country} - Delete data
 */
@RestController
@RequestMapping("/api/fullgrouped")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class FullGroupedController {

    // Service layer for business logic
    private final FullGroupedService service;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects FullGroupedService
     */
    public FullGroupedController(FullGroupedService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        try {
            List<FullGrouped> data = service.getAll();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch full grouped data: " + e.getMessage());
            error.put("error", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/country/{name}")
    public List<FullGrouped> getByCountry(@PathVariable String name) {
        return service.getByCountry(name);
    }

    @GetMapping("/date/{date}")
    public List<FullGrouped> getByDate(@PathVariable String date) {
        return service.getByDate(LocalDate.parse(date));
    }

    @GetMapping("/region/{region}")
    public List<FullGrouped> getByRegion(@PathVariable String region) {
        return service.getByRegion(region);
    }

    @GetMapping("/{date}/{country}")
    public FullGrouped getById(
            @PathVariable String date,
            @PathVariable String country
    ) {
        return service.getById(LocalDate.parse(date), country);
    }

    @PostMapping
    public FullGrouped create(@RequestBody FullGrouped data) {
        return service.create(data);
    }

    @PutMapping("/{date}/{country}")
    public FullGrouped update(
            @PathVariable String date,
            @PathVariable String country,
            @RequestBody FullGrouped data
    ) {
        return service.update(LocalDate.parse(date), country, data);
    }

    @DeleteMapping("/{date}/{country}")
    public void delete(
            @PathVariable String date,
            @PathVariable String country
    ) {
        service.delete(LocalDate.parse(date), country);
    }
}

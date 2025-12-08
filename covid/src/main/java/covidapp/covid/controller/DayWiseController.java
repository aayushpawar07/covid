package covidapp.covid.controller;

import covidapp.covid.entity.DayWise;
import covidapp.covid.service.DayWiseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/daywise")
@CrossOrigin("*")
public class DayWiseController {

    private final DayWiseService service;

    public DayWiseController(DayWiseService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<DayWise> data = service.getAll();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to fetch day-wise data: " + e.getMessage());
            error.put("error", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/{id}")
    public DayWise getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/by-date")
    public DayWise getByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return service.getByDate(date);
    }

    @PostMapping
    public DayWise create(@RequestBody DayWise dayWise) {
        return service.create(dayWise);
    }

    @PutMapping("/{id}")
    public DayWise update(@PathVariable Long id, @RequestBody DayWise dayWise) {
        return service.update(id, dayWise);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}

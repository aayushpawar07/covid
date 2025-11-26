package covidapp.covid.controller;

import covidapp.covid.entity.DayWise;
import covidapp.covid.service.DayWiseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/daywise")
@CrossOrigin("*")
public class DayWiseController {

    private final DayWiseService service;

    public DayWiseController(DayWiseService service) {
        this.service = service;
    }

    @GetMapping
    public List<DayWise> getAll() {
        return service.getAll();
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

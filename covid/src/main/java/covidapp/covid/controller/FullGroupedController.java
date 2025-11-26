package covidapp.covid.controller;

import covidapp.covid.entity.FullGrouped;
import covidapp.covid.service.FullGroupedService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/fullgrouped")
@CrossOrigin("*")
public class FullGroupedController {

    private final FullGroupedService service;

    public FullGroupedController(FullGroupedService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<FullGrouped> getAll() {
        return service.getAll();
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
}

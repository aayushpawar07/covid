package covidapp.covid.controller;

import covidapp.covid.entity.UsaCountryWise;
import covidapp.covid.service.UsaCountryWiseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/usa")
@CrossOrigin("*")
public class UsaCountryWiseController {

    private final UsaCountryWiseService service;

    public UsaCountryWiseController(UsaCountryWiseService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<UsaCountryWise> getAll() {
        return service.getAll();
    }

    @GetMapping("/country/{name}")
    public List<UsaCountryWise> getByCountry(@PathVariable String name) {
        return service.getByCountry(name);
    }

    @GetMapping("/province/{name}")
    public List<UsaCountryWise> getByProvince(@PathVariable String name) {
        return service.getByProvince(name);
    }

    @GetMapping("/date")
    public List<UsaCountryWise> getByDate(@RequestParam String date) {
        return service.getByDate(date);
    }


}

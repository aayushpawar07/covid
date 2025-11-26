package covidapp.covid.controller;

import covidapp.covid.entity.CountryWiseLatest;
import covidapp.covid.service.CountryWiseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/country")
@CrossOrigin("*")
public class CountryWiseController {

    private final CountryWiseService service;

    public CountryWiseController(CountryWiseService service) {

        this.service = service;
    }

    @GetMapping("/all")
    public List<CountryWiseLatest> getAll() {


        return service.getAll();
    }

    @GetMapping("/{country}")
    public CountryWiseLatest getByCountry(@PathVariable String country) {

        return service.getByCountry(country);
    }

    @PostMapping("/add")
    public CountryWiseLatest addNewCountry(@RequestBody CountryWiseLatest data) {
        return service.saveCountry(data);
    }

}


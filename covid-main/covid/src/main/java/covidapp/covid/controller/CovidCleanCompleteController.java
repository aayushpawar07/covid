package covidapp.covid.controller;

import covidapp.covid.entity.CovidCleanComplete;
import covidapp.covid.entity.CovidKey;
import covidapp.covid.service.CovidCleanCompleteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clean")
@CrossOrigin("*")
public class CovidCleanCompleteController {

    private final CovidCleanCompleteService service;

    public CovidCleanCompleteController(CovidCleanCompleteService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<CovidCleanComplete> getAll() {
        return service.getAll();
    }

    // GET by Composite Key
    @GetMapping("/{province}/{country}/{date}")
    public CovidCleanComplete getById(
            @PathVariable("province") String provinceState,
            @PathVariable("country") String countryRegion,
            @PathVariable("date") String date
    )
    {
        CovidKey key = new CovidKey(provinceState, countryRegion, date);
        return service.getById(key);
    }
}

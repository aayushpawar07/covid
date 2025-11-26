package covidapp.covid.controller;

import covidapp.covid.entity.WorldometerData;
import covidapp.covid.service.WorldometerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/worldometer")
@CrossOrigin("*")
public class WorldometerController {

    private final WorldometerService service;

    public WorldometerController(WorldometerService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<WorldometerData> getAll() {
        return service.getAll();
    }

    @GetMapping("/country/{name}")
    public WorldometerData getByCountry(@PathVariable String name) {
        return service.getByCountry(name);
    }
}

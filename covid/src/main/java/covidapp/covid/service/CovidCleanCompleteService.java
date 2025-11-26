package covidapp.covid.service;

import covidapp.covid.entity.CovidCleanComplete;
import covidapp.covid.entity.CovidKey;
import covidapp.covid.repository.CovidCleanCompleteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CovidCleanCompleteService {

    private final CovidCleanCompleteRepository repo;

    public CovidCleanCompleteService(CovidCleanCompleteRepository repo) {
        this.repo = repo;
    }

    public List<CovidCleanComplete> getAll() {
        return repo.findAll();
    }

    public CovidCleanComplete getById(CovidKey id) {
        return repo.findById(id).orElse(null);
    }
}

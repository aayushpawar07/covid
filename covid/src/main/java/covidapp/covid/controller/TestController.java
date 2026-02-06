package covidapp.covid.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class TestController {

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is running! CORS is working!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> testPut(@PathVariable String id) {
        return ResponseEntity.ok("PUT request successful for: " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> testDelete(@PathVariable String id) {
        return ResponseEntity.ok("DELETE request successful for: " + id);
    }

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }
}


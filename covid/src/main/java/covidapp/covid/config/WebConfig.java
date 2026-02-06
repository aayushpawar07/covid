package covidapp.covid.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web Configuration
 * 
 * This class configures Spring MVC settings, specifically CORS (Cross-Origin Resource Sharing)
 * 
 * This is a backup/secondary CORS configuration
 * Primary CORS handling is done by CorsFilter
 * 
 * Purpose:
 * - Configures CORS for all endpoints (/**)
 * - Allows all origins, methods, and headers
 * - Works alongside CorsFilter for comprehensive CORS support
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configure CORS Mappings
     * 
     * Sets up CORS rules for all endpoints
     * 
     * @param registry CORS registry to configure
     * 
     * Configuration:
     * - All paths (/**): Apply CORS to all endpoints
     * - All origins (*): Allow requests from any origin
     * - All methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
     * - All headers (*): Allow any headers in requests
     * - No credentials: Don't allow cookies/auth headers (required for "*" origin)
     * - Max age: Cache preflight responses for 1 hour
     */
    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**") // Apply to all endpoints
                .allowedOriginPatterns("*") // Allow all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH") // All HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(false) // No credentials (required for "*" origin)
                .maxAge(3600); // Cache preflight for 1 hour
    }
}


package covidapp.covid.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * CORS Filter
 * 
 * This filter handles Cross-Origin Resource Sharing (CORS) for all HTTP requests
 * It runs before any other filters/controllers (HIGHEST_PRECEDENCE)
 * 
 * Purpose:
 * - Allows frontend (running on different port) to access backend APIs
 * - Handles preflight OPTIONS requests
 * - Sets CORS headers on all responses
 * 
 * Features:
 * - Allows all origins (*)
 * - Allows all HTTP methods (GET, POST, PUT, DELETE, OPTIONS, PATCH)
 * - Allows all headers
 * - Handles preflight requests automatically
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE) // Run this filter first, before any other filters
public class CorsFilter extends OncePerRequestFilter {

    /**
     * Filter Method - Executes for every HTTP request
     * 
     * This method:
     * 1. Sets CORS headers on the response
     * 2. Handles preflight OPTIONS requests
     * 3. Continues the filter chain for actual requests
     * 
     * @param request HTTP request from client
     * @param response HTTP response to client
     * @param filterChain Chain of filters to continue processing
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        
        // Get the origin (where the request is coming from, e.g., http://localhost:3000)
        String origin = request.getHeader("Origin");
        
        // Set CORS headers for all requests
        // If origin is specified, use it; otherwise allow all origins
        if (origin != null && !origin.isEmpty()) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        } else {
            response.setHeader("Access-Control-Allow-Origin", "*");
        }
        
        // Allow all HTTP methods
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        
        // Allow all headers in requests
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
        
        // Cache preflight response for 1 hour (3600 seconds)
        response.setHeader("Access-Control-Max-Age", "3600");
        
        // Don't allow credentials (cookies, auth headers) - set to false for "*" origin
        response.setHeader("Access-Control-Allow-Credentials", "false");
        
        // Expose all headers to frontend
        response.setHeader("Access-Control-Expose-Headers", "*");
        
        // Handle preflight OPTIONS request
        // Browser sends OPTIONS request before actual request to check CORS permissions
        // We must respond immediately without processing the actual request
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK); // 200 OK
            response.setContentLength(0); // No body content
            response.getWriter().flush(); // Send response immediately
            return; // Don't continue filter chain for OPTIONS
        }
        
        // For actual requests (GET, POST, PUT, DELETE), continue to next filter/controller
        filterChain.doFilter(request, response);
    }
}


package covidapp.covid.controller;

import covidapp.covid.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Session Controller
 * 
 * This controller handles session management operations:
 * - Validating if a user's session is still active
 * - Checking if session has expired
 * - Logging out users (clearing session)
 * 
 * Features:
 * - Session expiration checking (compares current time with expiry time)
 * - Automatic session cleanup when expired
 * - Returns remaining session time to frontend
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {

    // Repository for database operations on User entity
    private final UserRepository userRepository;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects UserRepository
     */
    public SessionController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Validate Session Endpoint
     * 
     * POST /api/auth/validate-session
     * 
     * Checks if a user's session is still valid and not expired
     * Called periodically by frontend to verify session status
     * 
     * @param request Map containing username and sessionToken
     * @return ResponseEntity with validation result and remaining time
     * 
     * Process:
     * 1. Validates username and sessionToken are provided
     * 2. Finds user in database
     * 3. Checks if sessionToken matches user's stored token
     * 4. Checks if session has expired (current time > expiry time)
     * 5. If expired: Clears session from database and returns invalid
     * 6. If valid: Returns valid=true with remaining time in seconds
     */
    @PostMapping("/validate-session")
    public ResponseEntity<?> validateSession(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String sessionToken = request.get("sessionToken");

        // Validate required fields
        if (username == null || sessionToken == null) {
            return ResponseEntity.badRequest().body("Username and session token are required");
        }

        // Find user and validate session
        return userRepository.findByUsername(username)
                .filter(user -> {
                    // Step 1: Check if session token matches the one stored in database
                    if (!sessionToken.equals(user.getSessionToken())) {
                        return false; // Token mismatch - invalid session
                    }
                    
                    // Step 2: Check if session expiry time exists
                    if (user.getSessionExpiryTime() == null) {
                        return false; // No expiry time - invalid session
                    }
                    
                    // Step 3: Check if session has expired
                    long currentTime = System.currentTimeMillis(); // Current time in milliseconds
                    if (currentTime > user.getSessionExpiryTime()) {
                        // Session expired - automatically clear it from database
                        user.setSessionToken(null);
                        user.setSessionExpiryTime(null);
                        userRepository.save(user);
                        return false; // Session expired
                    }
                    
                    // All checks passed - session is valid
                    return true;
                })
                .map(user -> {
                    // Session is valid - return success response
                    Map<String, Object> response = new HashMap<>();
                    response.put("valid", true);
                    response.put("username", username);
                    
                    // Calculate how much time is left before session expires (in seconds)
                    long remainingTime = (user.getSessionExpiryTime() - System.currentTimeMillis()) / 1000;
                    response.put("remainingTime", remainingTime);
                    
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    // Session is invalid or expired
                    Map<String, Object> response = new HashMap<>();
                    response.put("valid", false);
                    response.put("message", "Session expired or invalid. Please login again.");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                });
    }

    /**
     * Logout Endpoint
     * 
     * POST /api/auth/logout
     * 
     * Logs out a user by clearing their session token and expiry time
     * 
     * @param request Map containing username
     * @return ResponseEntity with success message
     * 
     * Process:
     * 1. Gets username from request
     * 2. Finds user in database
     * 3. Clears sessionToken and sessionExpiryTime
     * 4. Saves updated user to database
     * 5. Returns success message
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        // Clear session if username is provided
        if (username != null) {
            userRepository.findByUsername(username).ifPresent(user -> {
                // Clear session token and expiry time
                user.setSessionToken(null);
                user.setSessionExpiryTime(null);
                // Save to database
                userRepository.save(user);
            });
        }

        // Return success response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}


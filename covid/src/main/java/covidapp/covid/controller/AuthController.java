package covidapp.covid.controller;

import covidapp.covid.entity.User;
import covidapp.covid.repository.UserRepository;
import covidapp.covid.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Authentication Controller
 * 
 * This controller handles all authentication-related operations:
 * - User registration (signup)
 * - User login with OTP verification
 * - Session management with automatic expiration
 * 
 * Features:
 * - Two-factor authentication using OTP sent via email
 * - Session token generation for secure authentication
 * - Session expiration based on configurable timeout
 * - Single session per user (new login invalidates old session)
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    // Repository for database operations on User entity
    private final UserRepository userRepository;
    
    // Service for sending OTP emails
    private final EmailService emailService;
    
    // Temporary storage for pending OTPs (username -> OTP)
    // Uses ConcurrentHashMap for thread-safe operations
    private final Map<String, String> pendingOtps = new ConcurrentHashMap<>();

    // Session timeout in minutes (read from application.properties, default: 30 minutes)
    @Value("${app.session.timeout.minutes:30}")
    private int sessionTimeoutMinutes;

    /**
     * Constructor - Dependency injection
     * Spring automatically injects UserRepository and EmailService
     */
    public AuthController(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    /**
     * User Registration Endpoint
     * 
     * POST /api/auth/signup
     * 
     * Creates a new user account in the database
     * 
     * @param request User object containing username, password, and email
     * @return ResponseEntity with success message and username, or error message
     * 
     * Process:
     * 1. Validates that all required fields (username, password, email) are provided
     * 2. Checks if username already exists in database
     * 3. Creates new User entity and saves to database
     * 4. Returns success response with username
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User request) {
        // Validate required fields
        if (request.getUsername() == null || request.getPassword() == null || request.getEmail() == null) {
            return ResponseEntity.badRequest().body("Username, password, and email are required");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        // Create new user and save to database
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail());
        userRepository.save(user);

        // Return success response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("username", user.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * User Login Endpoint (Step 1: Password Verification)
     * 
     * POST /api/auth/login
     * 
     * Verifies user credentials and sends OTP to user's email
     * This is the first step of two-factor authentication
     * 
     * @param request User object containing username and password
     * @return ResponseEntity with success message and username, or error message
     * 
     * Process:
     * 1. Validates username and password are provided
     * 2. Finds user in database by username
     * 3. Verifies password matches
     * 4. Generates 6-digit OTP and stores it temporarily
     * 5. Sends OTP to user's email address
     * 6. Returns success message (user must verify OTP in next step)
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {
        // Validate required fields
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        // Find user, verify password, and send OTP
        return userRepository.findByUsername(request.getUsername())
                .filter(user -> user.getPassword().equals(request.getPassword())) // Verify password
                .map(user -> {
                    // Generate random 6-digit OTP (000000 to 999999)
                    String otp = String.format("%06d", new Random().nextInt(1_000_000));
                    
                    // Store OTP temporarily (will be removed after verification or expiration)
                    pendingOtps.put(user.getUsername(), otp);

                    // Send OTP to user's email address
                    try {
                        emailService.sendOtpEmail(user.getEmail(), otp);
                    } catch (Exception e) {
                        System.err.println("Failed to send OTP email: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to send OTP email. Please try again.");
                    }

                    // Return success response
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Password verified. OTP has been sent to your email.");
                    response.put("username", user.getUsername());
                    return ResponseEntity.ok(response);
                })
                .map(ResponseEntity.class::cast)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid username or password"));
    }

    /**
     * OTP Verification Endpoint (Step 2: Complete Login)
     * 
     * POST /api/auth/verify-otp
     * 
     * Verifies the OTP sent to user's email and completes the login process
     * Creates a session token and sets expiration time
     * 
     * @param request Map containing username and otp
     * @return ResponseEntity with session token and username, or error message
     * 
     * Process:
     * 1. Validates username and OTP are provided
     * 2. Retrieves expected OTP from temporary storage
     * 3. Compares provided OTP with expected OTP
     * 4. If valid:
     *    - Removes OTP from temporary storage
     *    - Generates unique session token (UUID)
     *    - Calculates session expiration time (current time + timeout)
     *    - Updates user in database with session token and expiry
     *    - This automatically invalidates any previous sessions (single session feature)
     * 5. Returns session token to frontend for authentication
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String otp = request.get("otp");

        // Validate required fields
        if (username == null || otp == null) {
            return ResponseEntity.badRequest().body("Username and OTP are required");
        }

        // Get the OTP that was sent to user's email
        String expectedOtp = pendingOtps.get(username);

        // Verify OTP matches
        if (expectedOtp != null && expectedOtp.equals(otp)) {
            // Remove OTP from temporary storage (one-time use)
            pendingOtps.remove(username);

            // Generate unique session token using UUID (e.g., "a1b2c3d4-e5f6-7890-abcd-ef1234567890")
            String sessionToken = UUID.randomUUID().toString();
            
            // Calculate when this session will expire
            // Current time in milliseconds + (timeout minutes * 60 seconds * 1000 milliseconds)
            long expiryTime = System.currentTimeMillis() + (sessionTimeoutMinutes * 60 * 1000L);
            
            // Update user in database with new session token and expiry time
            // This automatically invalidates any previous sessions (single session per user)
            userRepository.findByUsername(username).ifPresent(user -> {
                user.setSessionToken(sessionToken);
                user.setSessionExpiryTime(expiryTime);
                userRepository.save(user);
            });

            // Return success response with session token
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("username", username);
            response.put("token", sessionToken);
            response.put("sessionToken", sessionToken);

            return ResponseEntity.ok(response);
        }

        // OTP is invalid or expired
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid or expired OTP");
    }
}



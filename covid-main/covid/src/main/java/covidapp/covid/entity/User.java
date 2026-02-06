package covidapp.covid.entity;

import jakarta.persistence.*;

/**
 * User Entity
 * 
 * Represents a user in the system
 * Maps to the "users" table in the database
 * 
 * Fields:
 * - id: Auto-generated unique identifier
 * - username: Unique username for login
 * - password: User's password (stored as plain text - should be hashed in production)
 * - email: User's email address for OTP verification
 * - sessionToken: Current active session token (UUID)
 * - sessionExpiryTime: Timestamp when session expires (milliseconds since epoch)
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(length = 255)
    private String sessionToken;

    @Column(name = "session_expiry")
    private Long sessionExpiryTime;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSessionToken() {
        return sessionToken;
    }

    public void setSessionToken(String sessionToken) {
        this.sessionToken = sessionToken;
    }

    public Long getSessionExpiryTime() {
        return sessionExpiryTime;
    }

    public void setSessionExpiryTime(Long sessionExpiryTime) {
        this.sessionExpiryTime = sessionExpiryTime;
    }
}



/**
 * Authentication Context
 * 
 * This context provides authentication state and functions throughout the application
 * 
 * Features:
 * - User login/logout management
 * - Session token storage in localStorage
 * - Automatic session validation (every 10 seconds)
 * - Session expiration handling
 * - Single session enforcement (logout on other device login)
 * 
 * Usage:
 * - Wrap your app with <AuthProvider>
 * - Use useAuth() hook in any component to access auth state
 */
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "../api/axiosConfig";

// Create React Context for authentication
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * 
 * Provides authentication context to all child components
 * Manages user state, session validation, and automatic logout
 * 
 * @param {ReactNode} children - Child components that need auth context
 */
export function AuthProvider({ children }) {
  // Current logged-in user state (null if not logged in)
  const [user, setUser] = useState(null);
  
  // Reference to interval ID for session validation (used to clear interval)
  const sessionCheckInterval = useRef(null);

  /**
   * Effect: Initialize and Validate Session on App Load
   * 
   * Runs once when component mounts (on app load)
   * 
   * Process:
   * 1. Checks if user data exists in localStorage
   * 2. If exists, validates session with backend
   * 3. If valid, sets user state and starts periodic validation
   * 4. If invalid, clears session and redirects to login
   * 5. Cleans up interval when component unmounts
   */
  useEffect(() => {
    const validateAndSetUser = async () => {
      // Get user data from browser's localStorage
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        // If user has session token, validate it immediately
        if (userData && userData.username && userData.sessionToken) {
          try {
            // Call backend to validate session
            const response = await axios.post("/api/auth/validate-session", {
              username: userData.username,
              sessionToken: userData.sessionToken,
            });

            if (response.data.valid) {
              // Session is valid - set user and start periodic checks
              setUser(userData);
              startSessionValidation(userData);
            } else {
              // Session invalid or expired - logout user
              handleSessionExpired("Session expired. Please login again.");
            }
          } catch (error) {
            // Network error or session expired - logout user
            handleSessionExpired("Session expired. Please login again.");
          }
        } else {
          // No session token - just set user data (might be incomplete)
          setUser(userData);
        }
      }
    };

    // Run validation on component mount
    validateAndSetUser();

    // Cleanup: Clear interval when component unmounts (prevents memory leaks)
    return () => {
      if (sessionCheckInterval.current) {
        clearInterval(sessionCheckInterval.current);
      }
    };
  }, []); // Empty dependency array = run only once on mount

  /**
   * Start Periodic Session Validation
   * 
   * Sets up an interval to check session validity every 10 seconds
   * This ensures user is automatically logged out if:
   * - Session expires (timeout)
   * - User logs in from another device (single session)
   * 
   * @param {Object} userData - User object with username and sessionToken
   */
  const startSessionValidation = (userData) => {
    // Clear any existing interval to prevent multiple intervals
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
    }

    // Set up interval to check session every 10 seconds
    sessionCheckInterval.current = setInterval(async () => {
      // Only check if user data exists
      if (userData && userData.username && userData.sessionToken) {
        try {
          // Call backend to validate session
          const response = await axios.post("/api/auth/validate-session", {
            username: userData.username,
            sessionToken: userData.sessionToken,
          });

          // If session is invalid, logout user
          if (!response.data.valid) {
            handleSessionExpired();
          }
        } catch (error) {
          // If backend returns 401 (Unauthorized), session is invalid
          if (error.response?.status === 401) {
            handleSessionExpired();
          }
        }
      }
    }, 10000); // Check every 10 seconds (10000 milliseconds)
  };

  /**
   * Handle Session Expiration
   * 
   * Called when session is invalid or expired
   * Logs out user, clears data, and redirects to login page
   * 
   * @param {string} message - Message to show to user (default: session expired message)
   */
  const handleSessionExpired = (message = "Your session has expired. Please login again.") => {
    // Stop periodic session validation
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
      sessionCheckInterval.current = null;
    }

    // Clear user state
    setUser(null);
    
    // Remove user data from browser storage
    localStorage.removeItem("authUser");
    
    // Show alert to user
    alert(message);
    
    // Redirect to login page
    window.location.href = "/login";
  };

  /**
   * Login Function
   * 
   * Called after successful OTP verification
   * Stores user data and session token, starts session validation
   * 
   * @param {Object} data - User data from backend (username, token, sessionToken)
   */
  const login = (data) => {
    // Prepare user data object with session token
    const userData = {
      ...data,
      sessionToken: data.token || data.sessionToken, // Use token or sessionToken
    };
    
    // Update user state
    setUser(userData);
    
    // Save to localStorage for persistence (survives page refresh)
    localStorage.setItem("authUser", JSON.stringify(userData));
    
    // Start periodic session validation
    startSessionValidation(userData);
  };

  /**
   * Logout Function
   * 
   * Logs out user by:
   * 1. Stopping session validation
   * 2. Calling backend to clear session token
   * 3. Clearing user state and localStorage
   */
  const logout = async () => {
    // Stop periodic session validation
    if (sessionCheckInterval.current) {
      clearInterval(sessionCheckInterval.current);
      sessionCheckInterval.current = null;
    }

    // Call backend to clear session token from database
    if (user && user.username) {
      try {
        await axios.post("/api/auth/logout", {
          username: user.username,
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    // Clear user state
    setUser(null);
    
    // Remove user data from browser storage
    localStorage.removeItem("authUser");
  };

  // Value object provided to all consumers of this context
  const value = {
    user, // Current user object (null if not logged in)
    isAuthenticated: !!user, // Boolean: true if user is logged in
    login, // Function to login user
    logout, // Function to logout user
  };

  // Provide context value to all child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context
 * 
 * Usage in components:
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * @returns {Object} Auth context value with user, isAuthenticated, login, logout
 */
export function useAuth() {
  return useContext(AuthContext);
}



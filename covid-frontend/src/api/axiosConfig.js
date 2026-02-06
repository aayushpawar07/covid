/**
 * Axios Configuration
 * 
 * Centralized HTTP client configuration for API requests
 * 
 * Features:
 * - Base URL configuration (backend server)
 * - Request interceptors (log outgoing requests)
 * - Response interceptors (handle errors globally)
 * - Automatic JSON content-type headers
 * 
 * Usage:
 * import axios from "../api/axiosConfig";
 * const response = await axios.get("/api/country/all");
 */
import axios from "axios";

/**
 * Create Axios Instance
 * 
 * Configured axios instance with base URL and default headers
 * All API calls use this instance
 */
const instance = axios.create({
  baseURL: "http://localhost:8081",  // Spring Boot backend server URL
  headers: {
    "Content-Type": "application/json", // Default content type for all requests
  },
});

/**
 * Request Interceptor
 * 
 * Runs before every HTTP request is sent
 * 
 * Purpose:
 * - Log request URL for debugging
 * - Can add authentication tokens here
 * - Can modify request config before sending
 */
instance.interceptors.request.use(
  (config) => {
    // Log request URL to console for debugging
    console.log("Request Sent:", config.url);
    return config; // Return config to proceed with request
  },
  (error) => Promise.reject(error) // Reject on error
);

/**
 * Response Interceptor
 * 
 * Runs after every HTTP response is received
 * 
 * Purpose:
 * - Handle errors globally
 * - Provide user-friendly error messages
 * - Log errors for debugging
 */
instance.interceptors.response.use(
  (response) => response, // Return successful response as-is
  (error) => {
    // Handle different types of errors
    if (error.code === "ECONNREFUSED" || error.message.includes("Network Error")) {
      // Backend server is not running or unreachable
      console.error("❌ Backend connection failed. Is the server running on http://localhost:8081?");
      console.error("Error details:", error.message);
    } else if (error.response) {
      // Backend responded with error status (4xx, 5xx)
      console.error("❌ API Error:", error.response.status, error.response.statusText);
      console.error("Response data:", error.response.data);
    } else {
      // Other errors (timeout, etc.)
      console.error("❌ API Error:", error.message);
    }
    return Promise.reject(error); // Reject to trigger catch block in calling code
  }
);

// Export configured axios instance
export default instance;

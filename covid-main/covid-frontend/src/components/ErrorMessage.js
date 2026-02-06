import React from "react";
import { Alert, Box, Typography, useTheme } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

export default function ErrorMessage({ message, error }) {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isConnectionError = 
    error?.code === "ECONNREFUSED" || 
    error?.message?.includes("Network Error") ||
    message?.toLowerCase().includes("network");

  return (
    <Alert 
      severity="error" 
      icon={<ErrorOutline sx={{ fontSize: 28 }} />}
      sx={{ 
        mt: 2,
        borderRadius: 3,
        bgcolor: mode === "dark" 
          ? "rgba(255, 82, 82, 0.1)" 
          : "rgba(244, 67, 54, 0.1)",
        border: `1px solid ${mode === "dark" ? "rgba(255, 82, 82, 0.3)" : "rgba(244, 67, 54, 0.3)"}`,
        backdropFilter: mode === "dark" ? "blur(10px)" : "none",
        WebkitBackdropFilter: mode === "dark" ? "blur(10px)" : "none",
        boxShadow: mode === "dark"
          ? "0 4px 16px rgba(255, 82, 82, 0.2)"
          : "0 4px 12px rgba(244, 67, 54, 0.15)",
        "& .MuiAlert-icon": {
          color: "error.main",
        },
        "& .MuiAlert-message": {
          width: "100%",
        },
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600, mb: isConnectionError ? 1.5 : 0, color: "error.main" }}>
        {message}
      </Typography>
      {isConnectionError && (
        <Box 
          sx={{ 
            mt: 1.5, 
            pl: 2, 
            borderLeft: `3px solid ${mode === "dark" ? "rgba(255, 82, 82, 0.5)" : "rgba(244, 67, 54, 0.5)"}`,
            borderRadius: 1,
            bgcolor: mode === "dark" ? "rgba(255, 82, 82, 0.05)" : "rgba(244, 67, 54, 0.05)",
            py: 1,
          }}
        >
          <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600, color: "text.primary" }}>
            Possible solutions:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2.5, mb: 0, color: "text.secondary" }}>
            <li style={{ marginBottom: "0.5rem" }}>Make sure the backend server is running on http://localhost:8081</li>
            <li style={{ marginBottom: "0.5rem" }}>Check if the Spring Boot application has started successfully</li>
            <li style={{ marginBottom: "0.5rem" }}>Verify the database connection is working</li>
            <li>Check browser console for more details</li>
          </Typography>
        </Box>
      )}
    </Alert>
  );
}

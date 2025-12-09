import React from "react";
import { CircularProgress, Box, Typography, useTheme } from "@mui/material";
import { Coronavirus } from "@mui/icons-material";

export default function Loader({ message = "Loading..." }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        mt: 8,
        mb: 8,
        gap: 3,
        position: "relative",
      }}
    >
      {/* Animated Rings */}
      <Box
        sx={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `3px solid ${mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)"}`,
          animation: "pulse 2s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: `2px solid ${mode === "dark" ? "rgba(255, 107, 157, 0.2)" : "rgba(233, 30, 99, 0.2)"}`,
          animation: "pulse 2s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />
      
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          zIndex: 1,
        }}
      >
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: "primary.main",
            animationDuration: "1.5s",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Coronavirus
            sx={{
              fontSize: 40,
              color: mode === "dark" ? "#00E5FF" : "#0066CC",
              animation: "float 3s ease-in-out infinite",
              filter: `drop-shadow(0 0 10px ${mode === "dark" ? "rgba(0, 229, 255, 0.6)" : "rgba(0, 102, 204, 0.6)"})`,
            }}
          />
        </Box>
      </Box>
      
      {message && (
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            letterSpacing: "0.05em",
            animation: "fadeIn 0.6s ease-out",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      )}
      
      {/* Loading Dots Animation */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `bounce 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                  opacity: 0.5,
                },
                "40%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

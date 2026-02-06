import React from "react";
import { Box, useTheme } from "@mui/material";

/**
 * AnimatedBackground Component
 * 
 * Creates a beautiful animated background with floating particles
 * and gradient orbs for visual appeal
 */
export default function AnimatedBackground() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        opacity: mode === "dark" ? 0.4 : 0.2,
      }}
    >
      {/* Animated Gradient Orbs */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",
          top: "-300px",
          left: "-300px",
          animation: "float 20s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)",
          bottom: "-250px",
          right: "-250px",
          animation: "float 25s ease-in-out infinite reverse",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129, 199, 132, 0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse 15s ease-in-out infinite",
          filter: "blur(50px)",
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: "absolute",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            borderRadius: "50%",
            background: mode === "dark"
              ? "rgba(0, 229, 255, 0.3)"
              : "rgba(0, 102, 204, 0.2)",
            boxShadow: `0 0 ${particle.size * 2}px ${mode === "dark" ? "rgba(0, 229, 255, 0.5)" : "rgba(0, 102, 204, 0.3)"}`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0px) translateX(0px)",
                opacity: 0.3,
              },
              "25%": {
                transform: `translateY(-${Math.random() * 30 + 10}px) translateX(${Math.random() * 20 - 10}px)`,
                opacity: 0.6,
              },
              "50%": {
                transform: `translateY(-${Math.random() * 50 + 20}px) translateX(${Math.random() * 30 - 15}px)`,
                opacity: 0.4,
              },
              "75%": {
                transform: `translateY(-${Math.random() * 30 + 10}px) translateX(${Math.random() * 20 - 10}px)`,
                opacity: 0.5,
              },
            },
          }}
        />
      ))}

      {/* Animated Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: mode === "dark"
            ? "linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)"
            : "linear-gradient(rgba(0, 102, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 204, 0.02) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
          "@keyframes gridMove": {
            "0%": {
              transform: "translate(0, 0)",
            },
            "100%": {
              transform: "translate(50px, 50px)",
            },
          },
        }}
      />
    </Box>
  );
}


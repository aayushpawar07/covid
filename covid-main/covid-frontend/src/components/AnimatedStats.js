import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Coronavirus, Warning, CheckCircle, Assessment } from "@mui/icons-material";

/**
 * AnimatedStats Component
 * 
 * Displays animated statistics with icons and numbers
 * Includes count-up animation and icon animations
 */
export default function AnimatedStats({ value, label, icon, color, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [label]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current = Math.min(increment * step, value);
        setCount(Math.floor(current));

        if (step >= steps) {
          setCount(value);
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  const IconComponent = icon;

  return (
    <Box
      id={`stat-${label}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        borderRadius: 3,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${color}30`,
        transition: "all 0.3s ease",
        animation: "fadeInUp 0.6s ease-out",
        animationDelay: `${delay}ms`,
        "&:hover": {
          transform: "translateY(-5px) scale(1.05)",
          borderColor: `${color}60`,
          boxShadow: `0 8px 24px ${color}30`,
        },
        "@keyframes fadeInUp": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
          animation: "bounce 2s ease-in-out infinite",
          "@keyframes bounce": {
            "0%, 100%": {
              transform: "translateY(0)",
            },
            "50%": {
              transform: "translateY(-10px)",
            },
          },
        }}
      >
        <IconComponent
          sx={{
            fontSize: 48,
            color: color,
            filter: `drop-shadow(0 0 10px ${color}60)`,
          }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: color,
          mb: 1,
          fontFamily: "monospace",
        }}
      >
        {count.toLocaleString()}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "0.75rem",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}


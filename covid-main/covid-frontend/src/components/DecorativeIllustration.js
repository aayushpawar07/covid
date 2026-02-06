import React from "react";
import { Box, useTheme } from "@mui/material";

/**
 * DecorativeIllustration Component
 * 
 * SVG-based decorative illustrations for the COVID dashboard
 */
export default function DecorativeIllustration({ type = "virus", size = 200 }) {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const primaryColor = mode === "dark" ? "#00E5FF" : "#0066CC";
  const secondaryColor = mode === "dark" ? "#FF6B9D" : "#E91E63";

  const illustrations = {
    virus: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "rotate 20s linear infinite",
        }}
      >
        {/* Main Circle */}
        <circle
          cx="100"
          cy="100"
          r="40"
          fill={`url(#gradient1)`}
          opacity="0.8"
          style={{
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        
        {/* Spikes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + 40 * Math.cos(rad);
          const y1 = 100 + 40 * Math.sin(rad);
          const x2 = 100 + 60 * Math.cos(rad);
          const y2 = 100 + 60 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? primaryColor : secondaryColor}
              strokeWidth="3"
              style={{
                animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
        
        {/* Small dots */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 70 * Math.cos(rad);
          const y = 100 + 70 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={i % 2 === 0 ? primaryColor : secondaryColor}
              style={{
                animation: `pulse ${1.5 + i * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          );
        })}
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    ),
    
    chart: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chart bars */}
        {[20, 50, 80, 110, 140, 170].map((x, i) => {
          const height = 30 + Math.random() * 100;
          return (
            <rect
              key={i}
              x={x}
              y={200 - height}
              width="20"
              height={height}
              fill={`url(#gradient${i % 2})`}
              rx="4"
              style={{
                animation: `fadeInUp ${0.5 + i * 0.1}s ease-out`,
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "both",
              }}
            />
          );
        })}
        
        <defs>
          <linearGradient id="gradient0" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    ),
    
    globe: (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Globe circles */}
        <circle
          cx="100"
          cy="100"
          r="70"
          stroke={primaryColor}
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <circle
          cx="100"
          cy="100"
          r="50"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill={`url(#globeGradient)`}
          opacity="0.6"
          style={{
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        
        {/* Grid lines */}
        <line
          x1="100"
          y1="30"
          x2="100"
          y2="170"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.2"
        />
        <line
          x1="30"
          y1="100"
          x2="170"
          y2="100"
          stroke={secondaryColor}
          strokeWidth="1"
          opacity="0.2"
        />
        
        {/* Dots representing data points */}
        {[45, 60, 75, 90, 110, 125, 140, 155].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 60 * Math.cos(rad);
          const y = 100 + 60 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={i % 2 === 0 ? primaryColor : secondaryColor}
              style={{
                animation: `pulse ${2 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
        
        <defs>
          <radialGradient id="globeGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
    ),
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: mode === "dark" ? 0.3 : 0.2,
        pointerEvents: "none",
      }}
    >
      {illustrations[type] || illustrations.virus}
    </Box>
  );
}


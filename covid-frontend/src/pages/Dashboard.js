import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Alert,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Coronavirus,
  Warning,
  CheckCircle,
  TrendingUp,
  Refresh,
  ShowChart,
  Assessment,
  Timeline,
  CameraAlt,
} from "@mui/icons-material";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import GlobalStatsChart from "../components/GlobalStatsChart";
import PieChartComponent from "../components/PieChartComponent";
import { captureAndDownload } from "../utils/screenshot";

/**
 * Dashboard Component
 * 
 * Main dashboard page displaying global COVID-19 statistics
 * 
 * Features:
 * - Global statistics cards (Total Cases, Deaths, Recovered, Active)
 * - Recovery rate and death rate with progress bars
 * - Interactive charts (Bar chart and Pie chart)
 * - Data aggregation from multiple sources (Worldometer, Country-wise)
 * - Fallback mechanism if one API fails
 * - Real-time data refresh
 */
export default function Dashboard() {
  // State for aggregated global statistics
  const [summary, setSummary] = useState({});
  
  // Loading state (true when fetching data for first time)
  const [loading, setLoading] = useState(true);
  
  // Error message if data fetch fails
  const [error, setError] = useState("");
  
  // Error object for detailed error information
  const [errorObj, setErrorObj] = useState(null);
  
  // Refreshing state (true when manually refreshing data)
  const [refreshing, setRefreshing] = useState(false);
  
  // Screenshot capture state
  const [capturing, setCapturing] = useState(false);
  
  // Get theme for dark/light mode
  const theme = useTheme();
  const mode = theme.palette.mode;

  /**
   * Fetch Dashboard Data
   * 
   * Fetches and aggregates COVID-19 data from multiple sources
   * Uses fallback mechanism: tries Worldometer first, then Country-wise
   * 
   * @param {boolean} showRefreshing - If true, shows refreshing indicator instead of loading
   * 
   * Process:
   * 1. Try to fetch from Worldometer API
   * 2. Aggregate all countries' data (sum up totals)
   * 3. If Worldometer fails or returns empty, try Country-wise API
   * 4. Aggregate Country-wise data (different field names)
   * 5. Update summary state with aggregated data
   */
  const fetchData = async (showRefreshing = false) => {
    try {
      // Set appropriate loading state
      if (showRefreshing) {
        setRefreshing(true); // Show "Refreshing..." indicator
      } else {
        setLoading(true); // Show full page loader
      }
      setError("");
      
      // Initialize aggregated data object
      let aggregated = { totalCases: 0, totalDeaths: 0, totalRecovered: 0, activeCases: 0 };
      
      // Try Worldometer API first (primary data source)
      try {
        const worldometerRes = await axios.get("/api/worldometer/all");
        const worldometerData = worldometerRes.data || [];
        
        // If data exists, aggregate it
        if (worldometerData.length > 0) {
          // Sum up all countries' statistics
          aggregated = worldometerData.reduce(
            (acc, item) => ({
              totalCases: (acc.totalCases || 0) + (Number(item.totalCases) || 0),
              totalDeaths: (acc.totalDeaths || 0) + (Number(item.totalDeaths) || 0),
              totalRecovered: (acc.totalRecovered || 0) + (Number(item.totalRecovered) || 0),
              activeCases: (acc.activeCases || 0) + (Number(item.activeCases) || 0),
            }),
            { totalCases: 0, totalDeaths: 0, totalRecovered: 0, activeCases: 0 }
          );
        }
      } catch (worldometerErr) {
        // Worldometer API failed - will try fallback
        console.warn("Worldometer API failed, trying country-wise:", worldometerErr);
      }
      
      // Fallback: Use Country-wise API if Worldometer is empty or failed
      if (aggregated.totalCases === 0) {
        try {
          const countryRes = await axios.get("/api/country/all");
          const countryData = countryRes.data || [];
          
          // Aggregate Country-wise data (different field names)
          if (countryData.length > 0) {
            aggregated = countryData.reduce(
              (acc, item) => ({
                totalCases: (acc.totalCases || 0) + (Number(item.confirmed) || 0),
                totalDeaths: (acc.totalDeaths || 0) + (Number(item.deaths) || 0),
                totalRecovered: (acc.totalRecovered || 0) + (Number(item.recovered) || 0),
                activeCases: (acc.activeCases || 0) + (Number(item.active) || 0),
              }),
              { totalCases: 0, totalDeaths: 0, totalRecovered: 0, activeCases: 0 }
            );
          }
        } catch (countryErr) {
          console.warn("Country-wise API also failed:", countryErr);
        }
      }
      
      // Update state with aggregated data
      setSummary(aggregated);
      setLoading(false);
      setRefreshing(false);
      setErrorObj(null);
    } catch (err) {
      // Handle any unexpected errors
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data");
      setErrorObj(err);
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Effect: Fetch Data on Component Mount
   * 
   * Runs once when Dashboard component loads
   * Fetches initial data to display
   */
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array = run only once on mount

  /**
   * Statistics Cards Configuration
   * 
   * Defines the 4 main stat cards displayed on dashboard
   * Each card has: title, value, icon, color, and gradient styling
   */
  const stats = [
    {
      title: "Total Cases",
      value: summary.totalCases,
      icon: <Coronavirus sx={{ fontSize: 48 }} />,
      color: "#00E5FF",
      gradient: "linear-gradient(135deg, #00E5FF 0%, #00B8CC 100%)",
      bgGradient: mode === "dark" 
        ? "linear-gradient(135deg, rgba(0, 229, 255, 0.12) 0%, rgba(0, 184, 204, 0.12) 100%)"
        : "linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(0, 184, 204, 0.08) 100%)",
    },
    {
      title: "Total Deaths",
      value: summary.totalDeaths,
      icon: <Warning sx={{ fontSize: 48 }} />,
      color: "#FF6B9D",
      gradient: "linear-gradient(135deg, #FF6B9D 0%, #E91E63 100%)",
      bgGradient: mode === "dark"
        ? "linear-gradient(135deg, rgba(255, 107, 157, 0.12) 0%, rgba(233, 30, 99, 0.12) 100%)"
        : "linear-gradient(135deg, rgba(255, 107, 157, 0.08) 0%, rgba(233, 30, 99, 0.08) 100%)",
    },
    {
      title: "Recovered",
      value: summary.totalRecovered,
      icon: <CheckCircle sx={{ fontSize: 48 }} />,
      color: "#81C784",
      gradient: "linear-gradient(135deg, #81C784 0%, #66BB6A 100%)",
      bgGradient: mode === "dark"
        ? "linear-gradient(135deg, rgba(129, 199, 132, 0.12) 0%, rgba(102, 187, 106, 0.12) 100%)"
        : "linear-gradient(135deg, rgba(129, 199, 132, 0.08) 0%, rgba(102, 187, 106, 0.08) 100%)",
    },
    {
      title: "Active Cases",
      value: summary.activeCases,
      icon: <Assessment sx={{ fontSize: 48 }} />,
      color: "#FFB74D",
      gradient: "linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)",
      bgGradient: mode === "dark"
        ? "linear-gradient(135deg, rgba(255, 183, 77, 0.12) 0%, rgba(255, 167, 38, 0.12) 100%)"
        : "linear-gradient(135deg, rgba(255, 183, 77, 0.08) 0%, rgba(255, 167, 38, 0.08) 100%)",
    },
  ];

  /**
   * Calculate Recovery Rate
   * 
   * Formula: (Total Recovered / Total Cases) * 100
   * Returns percentage with 2 decimal places
   */
  const recoveryRate =
    summary.totalCases > 0
      ? ((summary.totalRecovered / summary.totalCases) * 100).toFixed(2)
      : 0;
  
  /**
   * Calculate Death Rate
   * 
   * Formula: (Total Deaths / Total Cases) * 100
   * Returns percentage with 2 decimal places
   */
  const deathRate =
    summary.totalCases > 0
      ? ((summary.totalDeaths / summary.totalCases) * 100).toFixed(2)
      : 0;

  return (
    <Box 
      sx={{ 
        width: "100%", 
        maxWidth: "100%", 
        minHeight: "calc(100vh - 70px)",
        position: "relative",
      }}
    >
      {/* Decorative Animated Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.15,
          animation: "float 20s ease-in-out infinite",
          display: { xs: "none", lg: "block" },
        }}
      >
        <Box
          component="svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          sx={{
            width: "100%",
            height: "100%",
            animation: "rotate 30s linear infinite",
          }}
        >
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke={mode === "dark" ? "#00E5FF" : "#0066CC"}
            strokeWidth="2"
            opacity="0.3"
          />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + 60 * Math.cos(rad);
            const y = 100 + 60 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={mode === "dark" ? "#00E5FF" : "#0066CC"}
                opacity="0.5"
                style={{
                  animation: `pulse ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            );
          })}
        </Box>
      </Box>
      
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "150px",
          height: "150px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.15,
          animation: "float 25s ease-in-out infinite reverse",
          display: { xs: "none", lg: "block" },
        }}
      >
        <Box
          component="svg"
          width="150"
          height="150"
          viewBox="0 0 200 200"
          sx={{
            width: "100%",
            height: "100%",
            animation: "rotate 25s linear infinite reverse",
          }}
        >
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke={mode === "dark" ? "#FF6B9D" : "#E91E63"}
            strokeWidth="2"
            opacity="0.3"
          />
          {[30, 90, 150, 210, 270, 330].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + 50 * Math.cos(rad);
            const y = 100 + 50 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={mode === "dark" ? "#FF6B9D" : "#E91E63"}
                opacity="0.5"
                style={{
                  animation: `pulse ${1.8 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            );
          })}
        </Box>
      </Box>
      
      {/* Header - Full Width */}
      <Box 
        sx={{ 
          mb: 5, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start", 
          flexWrap: "wrap", 
          gap: 3,
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "auto" } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 1.5,
              background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "gradientShift 3s ease infinite",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Global Overview
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: { xs: "0.875rem", md: "1rem", lg: "1.125rem" },
              fontWeight: 500,
              maxWidth: "600px",
            }}
          >
            Real-time COVID-19 statistics and insights from around the world
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {refreshing && (
            <Chip
              icon={<Refresh sx={{ animation: "spin 1s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } } }} />}
              label="Refreshing..."
              sx={{
                bgcolor: "rgba(0, 217, 255, 0.1)",
                color: "primary.main",
                border: "1px solid",
                borderColor: "primary.main",
              }}
            />
          )}
          <Tooltip title="Capture Screenshot">
            <span>
              <IconButton
                onClick={async () => {
                  try {
                    setCapturing(true);
                    const dashboardContent = document.querySelector('[role="main"]') || document.body;
                    await captureAndDownload(dashboardContent, "covid-dashboard", {
                      scale: 2,
                      useCORS: true,
                      backgroundColor: mode === 'dark' ? '#0D1117' : '#FFFFFF',
                    });
                  } catch (error) {
                    console.error('Screenshot failed:', error);
                  } finally {
                    setCapturing(false);
                  }
                }}
                disabled={capturing || loading}
                sx={{
                  bgcolor: mode === "dark" ? "rgba(255, 107, 157, 0.1)" : "rgba(233, 30, 99, 0.1)",
                  color: "secondary.main",
                  border: `1px solid ${mode === "dark" ? "rgba(255, 107, 157, 0.2)" : "rgba(233, 30, 99, 0.2)"}`,
                  "&:hover": {
                    bgcolor: mode === "dark" ? "rgba(255, 107, 157, 0.2)" : "rgba(233, 30, 99, 0.2)",
                    transform: "scale(1.1)",
                    borderColor: "secondary.main",
                  },
                  "&:disabled": {
                    opacity: 0.6,
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(255, 107, 157, 0.3)",
                  animation: capturing ? "pulse 1s ease-in-out infinite" : "none",
                }}
              >
                <CameraAlt />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <span>
              <IconButton
                onClick={() => fetchData(true)}
                disabled={loading || refreshing}
                sx={{
                  bgcolor: "primary.main",
                  color: "background.default",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "rotate(180deg)",
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0, 217, 255, 0.3)",
                }}
              >
                <Refresh />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {loading && <Loader />}
      {error && (
        <Box>
          <ErrorMessage message={error} error={errorObj} />
          <Button
            variant="contained"
            onClick={() => fetchData()}
            sx={{
              mt: 2,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Retry
          </Button>
        </Box>
      )}

      {!loading && !error && (
        <>
          {/* Stats Cards - Full Width */}
          <Grid container spacing={3} sx={{ mb: 4, position: "relative", zIndex: 1 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={6} xl={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    background: mode === "dark"
                      ? "rgba(22, 27, 34, 0.6)"
                      : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: mode === "dark"
                      ? `1px solid rgba(48, 54, 61, 0.5)`
                      : `1px solid rgba(208, 215, 222, 0.5)`,
                    borderRadius: 4,
                    boxShadow: mode === "dark"
                      ? `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${stat.color}20`
                      : `0 4px 20px rgba(0, 0, 0, 0.08)`,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    animation: `slideInUp 0.6s ease ${index * 0.1}s both`,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: stat.gradient,
                      boxShadow: `0 0 12px ${stat.color}60`,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`,
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                    },
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: mode === "dark"
                        ? `0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px ${stat.color}40`
                        : `0 12px 32px rgba(0, 0, 0, 0.12)`,
                      borderColor: `${stat.color}60`,
                      "&::after": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: stat.gradient,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-50%",
                            left: "-50%",
                            width: "200%",
                            height: "200%",
                            background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                            animation: "shimmer 3s ease-in-out infinite",
                          },
                          "&:hover": {
                            transform: "scale(1.1) rotate(5deg)",
                            boxShadow: `0 8px 24px ${stat.color}60`,
                          },
                          transition: "all 0.3s ease",
                          animation: `float 4s ease-in-out infinite`,
                          animationDelay: `${index * 0.2}s`,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: 1,
                            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))",
                          }}
                        >
                          {stat.icon}
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.secondary",
                        mb: 1,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: stat.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontSize: { xs: "1.75rem", md: "2.25rem" },
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value ? stat.value.toLocaleString() : "0"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Additional Stats - Full Width Layout */}
          <Grid container spacing={3} sx={{ mb: 4, position: "relative", zIndex: 1 }}>
            {/* Recovery Rate */}
            <Grid item xs={12} xl={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: mode === "dark"
                    ? "rgba(22, 27, 34, 0.6)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: mode === "dark"
                    ? "1px solid rgba(48, 54, 61, 0.5)"
                    : "1px solid rgba(208, 215, 222, 0.5)",
                  boxShadow: mode === "dark"
                    ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(129, 199, 132, 0.1)"
                    : "0 4px 20px rgba(0, 0, 0, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: mode === "dark"
                      ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(129, 199, 132, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: "linear-gradient(135deg, #81C784 0%, #66BB6A 100%)",
                    boxShadow: "0 0 12px rgba(129, 199, 132, 0.6)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #4DD0E1 0%, #00ACC1 100%)",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Recovery Rate
                  </Typography>
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #4DD0E1 0%, #00ACC1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 3,
                  }}
                >
                  {recoveryRate}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(recoveryRate)}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: "rgba(77, 208, 225, 0.2)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(135deg, #4DD0E1 0%, #00ACC1 100%)",
                      borderRadius: 6,
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Death Rate */}
            <Grid item xs={12} xl={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: mode === "dark"
                    ? "rgba(22, 27, 34, 0.6)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: mode === "dark"
                    ? "1px solid rgba(48, 54, 61, 0.5)"
                    : "1px solid rgba(208, 215, 222, 0.5)",
                  boxShadow: mode === "dark"
                    ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 107, 157, 0.1)"
                    : "0 4px 20px rgba(0, 0, 0, 0.08)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: mode === "dark"
                      ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 107, 157, 0.2)"
                      : "0 8px 32px rgba(0, 0, 0, 0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: "linear-gradient(135deg, #FF6B9D 0%, #E91E63 100%)",
                    boxShadow: "0 0 12px rgba(255, 107, 157, 0.6)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #FF6B6B 0%, #D32F2F 100%)",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    <Warning sx={{ fontSize: 32 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Death Rate
                  </Typography>
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #FF6B6B 0%, #D32F2F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    mb: 3,
                  }}
                >
                  {deathRate}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(deathRate)}
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: "rgba(255, 107, 107, 0.2)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(135deg, #FF6B6B 0%, #D32F2F 100%)",
                      borderRadius: 6,
                    },
                  }}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Charts Section */}
          {summary.totalCases > 0 && (
            <Grid container spacing={3} sx={{ mb: 4, position: "relative", zIndex: 1 }}>
              <Grid item xs={12} xl={8}>
                <GlobalStatsChart data={summary} type="bar" title="Global Statistics Overview" />
              </Grid>
              <Grid item xs={12} xl={4}>
                <PieChartComponent data={summary} title="Data Distribution" />
              </Grid>
            </Grid>
          )}

          {/* Info Card */}
          <Box sx={{ mt: 4, position: "relative", zIndex: 1 }}>
            <Alert
              severity="info"
              icon={<ShowChart sx={{ fontSize: 28 }} />}
              sx={{
                borderRadius: 3,
                bgcolor: mode === "dark" 
                  ? "rgba(0, 229, 255, 0.1)" 
                  : "rgba(0, 102, 204, 0.1)",
                backdropFilter: mode === "dark" ? "blur(10px)" : "none",
                WebkitBackdropFilter: mode === "dark" ? "blur(10px)" : "none",
                border: mode === "dark"
                  ? "1px solid rgba(0, 229, 255, 0.3)"
                  : "1px solid rgba(0, 102, 204, 0.3)",
                boxShadow: mode === "dark"
                  ? "0 4px 16px rgba(0, 229, 255, 0.2)"
                  : "0 4px 12px rgba(0, 102, 204, 0.15)",
                "& .MuiAlert-icon": {
                  color: "primary.main",
                },
                "& .MuiAlert-message": {
                  width: "100%",
                },
                animation: "fadeIn 0.4s ease-out",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Last Updated: {new Date().toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Data is updated in real-time from reliable sources.
              </Typography>
            </Alert>
          </Box>
        </>
      )}
    </Box>
  );
}

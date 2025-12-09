import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import MuiTable from "../components/MuiTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import TrendLineChart from "../components/TrendLineChart";
import {
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { CalendarToday, Refresh } from "@mui/icons-material";

export default function DayWisePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");
      const res = await axios.get("/api/daywise");
      
      // Check if response has data
      if (res.data && Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
        if (res.data && res.data.length === 0) {
          setError("No data available in database. Please add data first.");
        }
      }
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error("DayWise fetch error:", err);
      // Show more detailed error message
      const errorMessage = err.response?.data?.message 
        || err.response?.statusText 
        || err.message 
        || "Failed to load Day Wise Data. Please check if backend is running and database has data.";
      setError(errorMessage);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "date", headerName: "Date" },
    { field: "confirmed", headerName: "Confirmed" },
    { field: "deaths", headerName: "Deaths" },
    { field: "recovered", headerName: "Recovered" },
    { field: "active", headerName: "Active" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CalendarToday
            sx={{
              fontSize: 40,
              mr: 2,
              color: "#667eea",
            }}
          />
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Day Wise COVID Data
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Daily COVID-19 statistics over time
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh Data">
          <span>
            <IconButton
              onClick={() => fetchData(true)}
              disabled={loading || refreshing}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  transform: "rotate(180deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Refresh />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Data Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        }}
      >
        {loading && <Loader />}
        {error && (
          <Box sx={{ p: 3 }}>
            <ErrorMessage message={error} />
            <Button
              variant="contained"
              onClick={() => fetchData()}
              sx={{
                mt: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                },
              }}
            >
              Retry
            </Button>
          </Box>
        )}
        {!loading && !error && (
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Chip
                label={`${data.length} Days of Data`}
                color="primary"
                sx={{ fontWeight: "bold" }}
              />
              {refreshing && (
                <Chip
                  icon={<Refresh sx={{ animation: "spin 1s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } } }} />}
                  label="Refreshing..."
                  color="info"
                  variant="outlined"
                />
              )}
            </Box>
            
            {/* Chart Section */}
            {data.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <TrendLineChart
                  data={data.slice(0, 30).map((item) => ({
                    name: new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    }),
                    confirmed: item.confirmed || 0,
                    deaths: item.deaths || 0,
                    recovered: item.recovered || 0,
                  }))}
                  title="Daily COVID-19 Trends (Last 30 Days)"
                />
              </Box>
            )}

            <MuiTable rows={data} columns={columns} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import MuiTable from "../components/MuiTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import {
  Typography,
  Box,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { CleaningServices, Refresh } from "@mui/icons-material";

export default function CovidCleanCompletePage() {
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
      const res = await axios.get("/api/clean/all");
      // Flatten nested id structure for table display
      const flattenedData = res.data.map(item => ({
        ...item,
        provinceState: item.id?.provinceState || "-",
        countryRegion: item.id?.countryRegion || "-",
        date: item.id?.date || "-",
      }));
      setData(flattenedData);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setError("Failed to load Clean Complete Data");
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "provinceState", headerName: "Province/State" },
    { field: "countryRegion", headerName: "Country" },
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
          <CleaningServices
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
              Clean Complete COVID Data
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Clean and complete COVID-19 dataset
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh Data">
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
                label={`${data.length} Countries`}
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
            <MuiTable rows={data} columns={columns} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

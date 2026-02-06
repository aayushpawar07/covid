import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import MuiTable from "../components/MuiTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import CountryComparisonChart from "../components/CountryComparisonChart";
import {
  Typography,
  Box,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Button,
  useTheme,
} from "@mui/material";
import { Public, TrendingUp, LocalHospital, Favorite, Refresh } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";

export default function CountryWisePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const theme = useTheme();
  const mode = theme.palette.mode;

  const fetchData = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");
      const res = await axios.get("/api/country/all");
      setData(res.data);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setError("Failed to load Country Wise Data");
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "country", headerName: "Country", editable: false },
    { field: "alert", headerName: "Status", editable: false },
    { field: "confirmed", headerName: "Confirmed", type: "number" },
    { field: "deaths", headerName: "Deaths", type: "number" },
    { field: "recovered", headerName: "Recovered", type: "number" },
    { field: "active", headerName: "Active", type: "number" },
  ];

  const handleEdit = async (updatedData) => {
    try {
      const response = await axios.put(`/api/country/${updatedData.country}`, updatedData);
      setSnackbar({ open: true, message: "Record updated successfully!", severity: "success" });
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to update record", severity: "error" });
      console.error("Update error:", err);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`/api/country/${row.country}`);
      setSnackbar({ open: true, message: "Record deleted successfully!", severity: "success" });
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete record", severity: "error" });
      console.error("Delete error:", err);
    }
  };

  const totalStats = data.reduce(
    (acc, item) => ({
      confirmed: acc.confirmed + (item.confirmed || 0),
      deaths: acc.deaths + (item.deaths || 0),
      recovered: acc.recovered + (item.recovered || 0),
      active: acc.active + (item.active || 0),
    }),
    { confirmed: 0, deaths: 0, recovered: 0, active: 0 }
  );

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Public sx={{ fontSize: 40 }} />
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { xs: "1.75rem", md: "2.5rem" },
              }}
            >
              Country Wise Data
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              COVID-19 statistics by country
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Refresh Data">
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
        </Tooltip>
      </Box>

      {/* Summary Cards */}
      {!loading && !error && data.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, rgba(0, 151, 167, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(0, 151, 167, 0.1) 100%)",
                border: "2px solid",
                borderColor: "rgba(0, 217, 255, 0.4)",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(135deg, #00D9FF 0%, #0097A7 100%)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocalHospital sx={{ mr: 1, fontSize: 24, color: "primary.main" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Total Confirmed
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.main" }}>
                  {totalStats.confirmed.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(211, 47, 47, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)",
                border: "2px solid",
                borderColor: "rgba(255, 107, 107, 0.4)",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(135deg, #FF6B6B 0%, #D32F2F 100%)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Favorite sx={{ mr: 1, fontSize: 24, color: "secondary.main" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Total Deaths
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "secondary.main" }}>
                  {totalStats.deaths.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(77, 208, 225, 0.15) 0%, rgba(0, 172, 193, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(77, 208, 225, 0.1) 0%, rgba(0, 172, 193, 0.1) 100%)",
                border: "2px solid",
                borderColor: "rgba(77, 208, 225, 0.4)",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(135deg, #4DD0E1 0%, #00ACC1 100%)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TrendingUp sx={{ mr: 1, fontSize: 24, color: "#4DD0E1" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Total Recovered
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#4DD0E1" }}>
                  {totalStats.recovered.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                background: mode === "dark"
                  ? "linear-gradient(135deg, rgba(255, 167, 38, 0.15) 0%, rgba(251, 140, 0, 0.15) 100%)"
                  : "linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, rgba(251, 140, 0, 0.1) 100%)",
                border: "2px solid",
                borderColor: "rgba(255, 167, 38, 0.4)",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(135deg, #FFA726 0%, #FB8C00 100%)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Public sx={{ mr: 1, fontSize: 24, color: "#FFA726" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Total Active
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFA726" }}>
                  {totalStats.active.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Data Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: `1px solid ${mode === "dark" ? "rgba(0, 217, 255, 0.2)" : "rgba(0, 0, 0, 0.08)"}`,
          boxShadow: mode === "dark"
            ? "0 8px 32px rgba(0, 217, 255, 0.1)"
            : "0 4px 20px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: mode === "dark"
              ? "0 12px 40px rgba(0, 217, 255, 0.2)"
              : "0 8px 30px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {loading && <Loader />}
        {error && (
          <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <ErrorMessage message={error} />
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
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Chip
                label={`${data.length} Countries`}
                sx={{
                  bgcolor: "primary.main",
                  color: "background.default",
                  fontWeight: 700,
                }}
              />
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
            </Box>
            
            {/* Chart Section */}
            {data.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <CountryComparisonChart data={data} topN={10} />
              </Box>
            )}

            <MuiTable 
              rows={data} 
              columns={columns} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        )}
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            bgcolor: snackbar.severity === "success" 
              ? (mode === "dark" ? "rgba(129, 199, 132, 0.2)" : "rgba(76, 175, 80, 0.2)")
              : (mode === "dark" ? "rgba(255, 82, 82, 0.2)" : "rgba(244, 67, 54, 0.2)"),
            border: `1px solid ${snackbar.severity === "success" ? "#81C784" : "#FF5252"}`,
            color: snackbar.severity === "success" ? "#81C784" : "#FF5252",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import { BarChart as BarChartIcon } from "@mui/icons-material";

export default function CountryComparisonChart({ data, topN = 10 }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Sort by confirmed cases and take top N
    const sorted = [...data]
      .sort((a, b) => (b.confirmed || 0) - (a.confirmed || 0))
      .slice(0, topN)
      .map((item) => ({
        country: item.country || item.countryRegion || "Unknown",
        confirmed: item.confirmed || item.totalCases || 0,
        deaths: item.deaths || item.totalDeaths || 0,
        recovered: item.recovered || item.totalRecovered || 0,
        active: item.active || item.activeCases || 0,
      }));

    return sorted;
  }, [data, topN]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
            border: `1px solid ${mode === "dark" ? "rgba(48, 54, 61, 0.5)" : "rgba(208, 215, 222, 0.5)"}`,
            borderRadius: 2,
            p: 2,
            boxShadow: mode === "dark" ? "0 4px 16px rgba(0, 0, 0, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
            {payload[0].payload.country}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: entry.color,
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              {entry.name}: {entry.value.toLocaleString()}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: mode === "dark" ? "rgba(22, 27, 34, 0.6)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: mode === "dark"
          ? "1px solid rgba(48, 54, 61, 0.5)"
          : "1px solid rgba(208, 215, 222, 0.5)",
        boxShadow: mode === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.08)",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}>
        <BarChartIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Top {topN} Countries Comparison
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            dataKey="country"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: mode === "dark" ? "#fff" : "#000", fontSize: 11 }}
          />
          <YAxis tick={{ fill: mode === "dark" ? "#fff" : "#000", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
            }}
          />
          <Bar dataKey="confirmed" fill="#00E5FF" radius={[4, 4, 0, 0]} name="Confirmed" />
          <Bar dataKey="deaths" fill="#FF6B9D" radius={[4, 4, 0, 0]} name="Deaths" />
          <Bar dataKey="recovered" fill="#81C784" radius={[4, 4, 0, 0]} name="Recovered" />
          <Bar dataKey="active" fill="#FFB74D" radius={[4, 4, 0, 0]} name="Active" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}


import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import { ShowChart } from "@mui/icons-material";

export default function TrendLineChart({ data, title = "Trend Analysis" }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

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

  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: mode === "dark" ? "rgba(22, 27, 34, 0.6)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No data available for chart
        </Typography>
      </Paper>
    );
  }

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
        <ShowChart sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: mode === "dark" ? "#fff" : "#000", fontSize: 12 }}
          />
          <YAxis tick={{ fill: mode === "dark" ? "#fff" : "#000", fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="confirmed"
            stroke="#00E5FF"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Confirmed"
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="#FF6B9D"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Deaths"
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#81C784"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Recovered"
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}


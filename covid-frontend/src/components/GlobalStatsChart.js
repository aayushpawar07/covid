import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import { TrendingUp } from "@mui/icons-material";

export default function GlobalStatsChart({ data, type = "area", title = "Global Statistics" }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const chartData = [
    {
      name: "Cases",
      value: data.totalCases || 0,
      color: "#00E5FF",
    },
    {
      name: "Deaths",
      value: data.totalDeaths || 0,
      color: "#FF6B9D",
    },
    {
      name: "Recovered",
      value: data.totalRecovered || 0,
      color: "#81C784",
    },
    {
      name: "Active",
      value: data.activeCases || 0,
      color: "#FFB74D",
    },
  ].filter(item => item.value > 0); // Only show non-zero values

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
            border: `1px solid ${mode === "dark" ? "rgba(48, 54, 61, 0.5)" : "rgba(208, 215, 222, 0.5)"}`,
            borderRadius: 2,
            p: 1.5,
            boxShadow: mode === "dark" ? "0 4px 16px rgba(0, 0, 0, 0.4)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {payload[0].payload.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: payload[0].payload.color,
              fontWeight: 700,
            }}
          >
            {payload[0].value.toLocaleString()}
          </Typography>
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
        <TrendingUp sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={350}>
        {type === "bar" ? (
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#81C784" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#81C784" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFB74D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFB74D" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00E5FF"
              fillOpacity={1}
              fill="url(#colorCases)"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Paper>
  );
}


import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import { DonutLarge } from "@mui/icons-material";

const COLORS = ["#00E5FF", "#FF6B9D", "#81C784", "#FFB74D"];

export default function PieChartComponent({ data, title = "Distribution" }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const chartData = [
    {
      name: "Confirmed",
      value: data.totalCases || data.confirmed || 0,
      color: "#00E5FF",
    },
    {
      name: "Deaths",
      value: data.totalDeaths || data.deaths || 0,
      color: "#FF6B9D",
    },
    {
      name: "Recovered",
      value: data.totalRecovered || data.recovered || 0,
      color: "#81C784",
    },
    {
      name: "Active",
      value: data.activeCases || data.active || 0,
      color: "#FFB74D",
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(2);
      
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
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
            {data.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: data.payload.color,
              fontWeight: 600,
            }}
          >
            {data.value.toLocaleString()} ({percentage}%)
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: mode === "dark" ? "rgba(22, 27, 34, 0.6)" : "rgba(255, 255, 255, 0.9)",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No data available
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
        <DonutLarge sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}


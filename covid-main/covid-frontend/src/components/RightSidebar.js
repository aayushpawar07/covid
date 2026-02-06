import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Info,
  TrendingUp,
  AccessTime,
  HelpOutline,
  Notifications,
  Speed,
  BarChart,
  Timeline,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export default function RightSidebar() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // Don't show on auth pages or mobile
  if (location.pathname === "/login" || location.pathname === "/signup" || isMobile) {
    return null;
  }

  const quickLinks = [
    { text: "Dashboard", path: "/", icon: <BarChart /> },
    { text: "Country Data", path: "/country-wise", icon: <Timeline /> },
    { text: "Worldometer", path: "/worldometer", icon: <Speed /> },
  ];

  const tips = [
    "Data is updated in real-time",
    "Use search to find specific countries",
    "Click on cards for detailed insights",
    "Refresh data regularly for latest stats",
  ];

  return (
    <Box
      sx={{
        width: 320,
        position: "fixed",
        right: 0,
        top: "70px",
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        overflowX: "hidden",
        p: 3,
        zIndex: (theme) => theme.zIndex.drawer - 1,
        display: { xs: "none", lg: "block" },
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: mode === "dark"
            ? "linear-gradient(180deg, #00E5FF 0%, #00B8CC 100%)"
            : "linear-gradient(180deg, #0066CC 0%, #004C99 100%)",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: mode === "dark" ? "rgba(22, 27, 34, 0.5)" : "rgba(248, 249, 250, 0.5)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Quick Stats Card */}
        <Card
          sx={{
            background: mode === "dark"
              ? "rgba(22, 27, 34, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.6)"
              : "1px solid rgba(208, 215, 222, 0.6)",
            borderRadius: 3,
            boxShadow: mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TrendingUp sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Quick Stats
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                  border: `1px solid ${mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)"}`,
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Last Updated
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main", mt: 0.5 }}>
                  {new Date().toLocaleTimeString()}
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: mode === "dark" ? "rgba(255, 107, 157, 0.1)" : "rgba(233, 30, 99, 0.1)",
                  border: `1px solid ${mode === "dark" ? "rgba(255, 107, 157, 0.2)" : "rgba(233, 30, 99, 0.2)"}`,
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Data Source
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "secondary.main", mt: 0.5 }}>
                  Real-time API
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card
          sx={{
            background: mode === "dark"
              ? "rgba(22, 27, 34, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.6)"
              : "1px solid rgba(208, 215, 222, 0.6)",
            borderRadius: 3,
            boxShadow: mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Speed sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Quick Links
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {quickLinks.map((link, index) => (
                <ListItem
                  key={index}
                  onClick={() => navigate(link.path)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    mb: 0.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Tips & Info */}
        <Card
          sx={{
            background: mode === "dark"
              ? "rgba(22, 27, 34, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.6)"
              : "1px solid rgba(208, 215, 222, 0.6)",
            borderRadius: 3,
            boxShadow: mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Info sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Tips & Info
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {tips.map((tip, index) => (
                <ListItem
                  key={index}
                  sx={{
                    py: 1,
                    px: 0,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Chip
                      label={index + 1}
                      size="small"
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: 700,
                        width: 24,
                        height: 24,
                        fontSize: "0.75rem",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={tip}
                    primaryTypographyProps={{
                      fontSize: "0.8125rem",
                      color: "text.secondary",
                      lineHeight: 1.5,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card
          sx={{
            background: mode === "dark"
              ? "rgba(22, 27, 34, 0.8)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.6)"
              : "1px solid rgba(208, 215, 222, 0.6)",
            borderRadius: 3,
            boxShadow: mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <HelpOutline sx={{ color: "primary.main", fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                Need Help?
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              For assistance or questions about the data, please refer to the documentation or contact support.
            </Typography>
            <Chip
              label="View Docs"
              size="small"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              onClick={() => window.open("https://github.com", "_blank")}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}


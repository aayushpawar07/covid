import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SpaceDashboard,
  Language,
  EmojiFlags,
  BarChart,
  Timeline,
  ViewModule,
  AutoAwesome,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const drawerWidth = 280;

const menuItems = [
  { text: "Dashboard", path: "/", icon: <SpaceDashboard /> },
  { text: "Country Wise", path: "/country-wise", icon: <Language /> },
  { text: "USA Country Wise", path: "/usa-country-wise", icon: <EmojiFlags /> },
  { text: "Worldometer", path: "/worldometer", icon: <BarChart /> },
  { text: "Day Wise", path: "/day-wise", icon: <Timeline /> },
  { text: "Full Grouped", path: "/full-grouped", icon: <ViewModule /> },
  { text: "Clean Complete", path: "/clean-complete", icon: <AutoAwesome /> },
];

export default function Sidebar({ onItemClick }) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const mode = theme.palette.mode;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "calc(100vh - 70px)",
        position: "fixed",
        left: 0,
        top: "70px",
        bgcolor: mode === "dark" 
          ? "rgba(13, 17, 23, 0.98)" 
          : "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRight: mode === "dark"
          ? "1px solid rgba(48, 54, 61, 0.8)"
          : "1px solid rgba(208, 215, 222, 0.8)",
        display: "flex",
        flexDirection: "column",
        pt: 3,
        boxShadow: mode === "dark"
          ? "4px 0 24px rgba(0, 0, 0, 0.4), inset -1px 0 0 rgba(0, 229, 255, 0.05)"
          : "4px 0 16px rgba(0, 0, 0, 0.08)",
        zIndex: (theme) => theme.zIndex.drawer,
        overflowY: "auto",
        overflowX: "hidden",
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
      <List sx={{ px: 2, flex: 1, pt: 1 }}>
        {menuItems.map((item, index) => {
          const isSelected = pathname === item.path;
          return (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={onItemClick}
              selected={isSelected}
              sx={{
                mb: 1.5,
                borderRadius: 3,
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "visible",
                py: 1.25,
                px: 2,
                animation: `slideInLeft 0.5s ease ${index * 0.1}s both`,
                "&::before": isSelected
                  ? {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "60%",
                      width: 4,
                      background: "linear-gradient(180deg, #00E5FF 0%, #FF6B9D 100%)",
                      borderRadius: "0 4px 4px 0",
                      boxShadow: "0 0 12px rgba(0, 229, 255, 0.6)",
                    }
                  : {},
                "&.Mui-selected": {
                  background: mode === "dark"
                    ? "linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(255, 107, 157, 0.15) 100%)"
                    : "linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)",
                  color: "primary.main",
                  fontWeight: 600,
                  boxShadow: mode === "dark"
                    ? "0 4px 20px rgba(0, 229, 255, 0.25), inset 0 0 0 1px rgba(0, 229, 255, 0.1)"
                    : "0 4px 16px rgba(0, 102, 204, 0.15)",
                  transform: "translateX(6px)",
                  "&:hover": {
                    transform: "translateX(8px)",
                    boxShadow: mode === "dark"
                      ? "0 6px 24px rgba(0, 229, 255, 0.35), inset 0 0 0 1px rgba(0, 229, 255, 0.15)"
                      : "0 6px 20px rgba(0, 102, 204, 0.2)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                    transform: "scale(1.1)",
                  },
                },
                "&:hover": {
                  bgcolor: mode === "dark" 
                    ? "rgba(0, 229, 255, 0.1)" 
                    : "rgba(0, 102, 204, 0.08)",
                  transform: "translateX(4px)",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected ? "primary.main" : "text.secondary",
                  minWidth: 48,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& svg": {
                    fontSize: "1.5rem",
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "0.9375rem",
                  color: isSelected ? "primary.main" : "text.primary",
                  letterSpacing: isSelected ? "0.01em" : "0",
                  transition: "all 0.3s ease",
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 3,
          borderTop: mode === "dark"
            ? "1px solid rgba(48, 54, 61, 0.5)"
            : "1px solid rgba(208, 215, 222, 0.5)",
          textAlign: "center",
          background: mode === "dark"
            ? "linear-gradient(135deg, rgba(0, 229, 255, 0.03) 0%, rgba(255, 107, 157, 0.03) 100%)"
            : "linear-gradient(135deg, rgba(0, 102, 204, 0.02) 0%, rgba(233, 30, 99, 0.02) 100%)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          COVID Analytics
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 0.5,
            color: "text.secondary",
            fontSize: "0.7rem",
            opacity: 0.7,
          }}
        >
          v2.0 • Data Intelligence
        </Typography>
      </Box>
    </Box>
  );
}

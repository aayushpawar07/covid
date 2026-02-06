/**
 * Layout Component
 * 
 * Main layout wrapper for the entire application
 * 
 * Features:
 * - Top navigation bar (AppBar) with user menu and theme toggle
 * - Left sidebar navigation (desktop) / Drawer (mobile)
 * - Right sidebar with widgets (desktop only)
 * - Responsive design (mobile/tablet/desktop)
 * - Theme toggle (dark/light mode)
 * - User authentication display and logout
 * - Hides layout on login/signup pages
 */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Logout,
  AccountCircle,
  Menu as MenuIcon,
  Close,
  CameraAlt,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import AnimatedBackground from "./AnimatedBackground";
import { useThemeToggle } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { captureAndDownload } from "../utils/screenshot";

export default function Layout({ children }) {
  // Get theme mode and toggle function from ThemeContext
  const { mode, toggleTheme } = useThemeToggle();
  
  // Get user authentication state and logout function
  const { user, logout } = useAuth();
  
  // Get current route location and navigation function
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get Material-UI theme for styling
  const theme = useTheme();
  
  // Check if screen is mobile/tablet (below md breakpoint)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  // State for user menu anchor (where to show dropdown menu)
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State for mobile drawer (sidebar) open/close
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // State for screenshot capture
  const [capturing, setCapturing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const handleScreenshot = async () => {
    try {
      setCapturing(true);
      
      // Get the main content area (excluding navbar and sidebars)
      const mainContent = document.querySelector('[role="main"]') || 
                         document.querySelector('main') ||
                         document.body;
      
      // Get current page name for filename
      const pageName = location.pathname === '/' ? 'dashboard' : 
                       location.pathname.slice(1).replace(/\//g, '-');
      
      await captureAndDownload(mainContent, `covid-${pageName}`, {
        scale: 2,
        useCORS: true,
        backgroundColor: mode === 'dark' ? '#0D1117' : '#FFFFFF',
      });
      
      setSnackbar({
        open: true,
        message: 'Screenshot captured and downloaded successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
      setSnackbar({
        open: true,
        message: 'Failed to capture screenshot. Please try again.',
        severity: 'error',
      });
    } finally {
      setCapturing(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Animated Background */}
      {!isAuthPage && <AnimatedBackground />}
      
      {/* TOP NAVBAR */}
      {!isAuthPage && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: mode === "dark" 
              ? "rgba(13, 17, 23, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderBottom: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.5)"
              : "1px solid rgba(208, 215, 222, 0.5)",
            boxShadow: mode === "dark"
              ? "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 229, 255, 0.05)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, md: 4 }, minHeight: "70px !important" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {isMobile && (
                <IconButton
                  onClick={() => setMobileDrawerOpen(true)}
                  sx={{
                    color: "primary.main",
                    bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                    "&:hover": {
                      bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                    borderRadius: 2,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  "&:hover": {
                    "& .logo-icon": {
                      transform: "rotate(360deg) scale(1.1)",
                    },
                  },
                }}
                onClick={() => navigate("/")}
              >
                <Box
                  className="logo-icon"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0, 229, 255, 0.4)",
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: 900, fontSize: "1.3rem", zIndex: 1 }}>
                    C
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1rem", md: "1.3rem" },
                      background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      backgroundSize: "200% 200%",
                      animation: "gradientShift 3s ease infinite",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    COVID Analytics
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.65rem",
                      color: "text.secondary",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Data Intelligence Platform
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Screenshot Capture */}
              <Tooltip title="Capture Screenshot" arrow>
                <span>
                  <IconButton
                    onClick={handleScreenshot}
                    disabled={capturing}
                    sx={{
                      color: "primary.main",
                      bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                      border: `1px solid ${mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)"}`,
                      "&:hover": {
                        bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)",
                        transform: "scale(1.1)",
                        borderColor: "primary.main",
                      },
                      "&:disabled": {
                        opacity: 0.6,
                      },
                      transition: "all 0.3s ease",
                      borderRadius: 2,
                      animation: capturing ? "pulse 1s ease-in-out infinite" : "none",
                    }}
                  >
                    <CameraAlt />
                  </IconButton>
                </span>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip title={mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"} arrow>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: "primary.main",
                    bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                    border: `1px solid ${mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)"}`,
                    "&:hover": {
                      bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.2)" : "rgba(0, 102, 204, 0.2)",
                      transform: "rotate(180deg) scale(1.1)",
                      borderColor: "primary.main",
                    },
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: 2,
                  }}
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </Tooltip>

              {/* User Menu */}
              {user && (
                <>
                  <Tooltip title={user.username || "User"} arrow>
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{
                        "&:hover": {
                          bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 102, 204, 0.15)",
                          transform: "scale(1.05)",
                        },
                        transition: "all 0.3s ease",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "primary.main",
                          color: "white",
                          fontSize: "0.9375rem",
                          fontWeight: 700,
                          border: "2px solid",
                          borderColor: mode === "dark" ? "rgba(255, 107, 157, 0.5)" : "rgba(233, 30, 99, 0.5)",
                          boxShadow: "0 4px 12px rgba(0, 229, 255, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "secondary.main",
                            boxShadow: "0 6px 16px rgba(0, 229, 255, 0.4)",
                          },
                        }}
                      >
                        {user.username?.charAt(0).toUpperCase() || "U"}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 240,
                        borderRadius: 3,
                        bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
                        border: mode === "dark"
                          ? "1px solid rgba(48, 54, 61, 0.6)"
                          : "1px solid rgba(208, 215, 222, 0.6)",
                        boxShadow: mode === "dark"
                          ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 255, 0.1)"
                          : "0 12px 48px rgba(0, 0, 0, 0.15)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        "& .MuiMenuItem-root": {
                          borderRadius: 2,
                          mx: 1,
                          my: 0.5,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 102, 204, 0.1)",
                            transform: "translateX(4px)",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <AccountCircle sx={{ color: "primary.main" }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {user.username}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Signed in
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={handleLogout}>
                      <Logout sx={{ mr: 1.5, color: "secondary.main" }} />
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* SIDEBAR - Desktop */}
      {!isAuthPage && !isMobile && <Sidebar />}

      {/* MOBILE DRAWER */}
      {!isAuthPage && isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 300,
              bgcolor: mode === "dark" ? "rgba(13, 17, 23, 0.95)" : "rgba(255, 255, 255, 0.95)",
              borderRight: mode === "dark"
                ? "1px solid rgba(48, 54, 61, 0.6)"
                : "1px solid rgba(208, 215, 222, 0.6)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            },
          }}
        >
          <Box 
            sx={{ 
              p: 2.5, 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              borderBottom: mode === "dark"
                ? "1px solid rgba(48, 54, 61, 0.5)"
                : "1px solid rgba(208, 215, 222, 0.5)",
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Navigation
            </Typography>
            <IconButton 
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  bgcolor: mode === "dark" ? "rgba(255, 107, 157, 0.1)" : "rgba(233, 30, 99, 0.1)",
                  color: "secondary.main",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Sidebar onItemClick={() => setMobileDrawerOpen(false)} />
        </Drawer>
      )}

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: isAuthPage ? "transparent" : "transparent",
          background: isAuthPage 
            ? "transparent"
            : mode === "dark"
            ? "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)"
            : "linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F8F9FA 100%)",
          backgroundAttachment: "fixed",
          p: isAuthPage ? 0 : { xs: 2, sm: 3, md: 4, lg: 5 },
          mt: isAuthPage ? 0 : { xs: "70px", md: "70px" },
          ml: isAuthPage || isMobile ? 0 : "280px",
          minHeight: "calc(100vh - 70px)",
          display: isAuthPage ? "flex" : "block",
          alignItems: isAuthPage ? "center" : "stretch",
          justifyContent: isAuthPage ? "center" : "flex-start",
          position: "relative",
          maxWidth: isAuthPage ? "100%" : { xs: "100%", lg: "calc(100% - 320px)" },
          width: isAuthPage ? "100%" : { xs: "100%", lg: "calc(100% - 600px)" },
          mr: isAuthPage || isMobile ? 0 : { lg: "320px" },
          "&::before": isAuthPage ? {} : {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: mode === "dark"
              ? "radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 107, 157, 0.04) 0%, transparent 50%)"
              : "radial-gradient(circle at 20% 30%, rgba(0, 102, 204, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 30, 99, 0.03) 0%, transparent 50%)",
            pointerEvents: "none",
            zIndex: 0,
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        {children}
      </Box>

      {/* RIGHT SIDEBAR */}
      {!isAuthPage && <RightSidebar />}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            bgcolor: mode === "dark" ? "rgba(22, 27, 34, 0.95)" : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: mode === "dark"
              ? "1px solid rgba(48, 54, 61, 0.6)"
              : "1px solid rgba(208, 215, 222, 0.6)",
            boxShadow: mode === "dark"
              ? "0 12px 48px rgba(0, 0, 0, 0.5)"
              : "0 12px 48px rgba(0, 0, 0, 0.15)",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

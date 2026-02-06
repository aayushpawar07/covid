import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  PersonAddOutlined,
  LockOutlined,
  EmailOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Analytics,
  Security,
  Speed,
  TrendingUp,
} from "@mui/icons-material";
import axios from "../api/axiosConfig";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: mode === "dark"
          ? "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)"
          : "linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #F8F9FA 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
          backgroundImage: mode === "dark"
            ? `radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.15) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 50%, rgba(0, 102, 204, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(233, 30, 99, 0.1) 0%, transparent 50%)`,
          animation: "float 20s ease-in-out infinite",
        }}
      />

      <Grid container sx={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        {/* Left Side - Image/Illustration Panel */}
        {!isMobile && (
          <Grid
            item
            xs={false}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              background: mode === "dark"
                ? "linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, rgba(255, 107, 157, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(0, 102, 204, 0.03) 0%, rgba(233, 30, 99, 0.03) 100%)",
              borderRight: mode === "dark"
                ? "1px solid rgba(48, 54, 61, 0.3)"
                : "1px solid rgba(208, 215, 222, 0.3)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 6,
                gap: 4,
              }}
            >
              {/* Animated Icons */}
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <PersonAddOutlined
                  sx={{
                    fontSize: 80,
                    color: mode === "dark" ? "rgba(0, 229, 255, 0.3)" : "rgba(0, 102, 204, 0.3)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  right: "15%",
                  animation: "float 8s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              >
                <TrendingUp
                  sx={{
                    fontSize: 60,
                    color: mode === "dark" ? "rgba(255, 107, 157, 0.3)" : "rgba(233, 30, 99, 0.3)",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "15%",
                  left: "20%",
                  animation: "float 7s ease-in-out infinite",
                  animationDelay: "2s",
                }}
              >
                <Analytics
                  sx={{
                    fontSize: 70,
                    color: mode === "dark" ? "rgba(0, 229, 255, 0.25)" : "rgba(0, 102, 204, 0.25)",
                  }}
                />
              </Box>

              {/* Main Content */}
              <Box
                sx={{
                  textAlign: "center",
                  zIndex: 2,
                  maxWidth: 500,
                  animation: "fadeIn 1s ease-out",
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 4,
                    boxShadow: "0 20px 60px rgba(0, 229, 255, 0.4)",
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                >
                  <PersonAddOutlined sx={{ fontSize: 64, color: "white" }} />
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: { md: "3rem", lg: "3.5rem" },
                  }}
                >
                  Join Us Today
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 400,
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  Create your account and start exploring comprehensive COVID-19 analytics with real-time insights
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    mt: 4,
                  }}
                >
                  {[
                    { icon: <PersonAddOutlined />, text: "Easy Signup" },
                    { icon: <Security />, text: "Secure" },
                    { icon: <Analytics />, text: "Powerful Analytics" },
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: mode === "dark" ? "rgba(0, 229, 255, 0.1)" : "rgba(0, 102, 204, 0.1)",
                        border: mode === "dark"
                          ? "1px solid rgba(0, 229, 255, 0.2)"
                          : "1px solid rgba(0, 102, 204, 0.2)",
                      }}
                    >
                      <Box sx={{ color: "primary.main" }}>{item.icon}</Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        )}

        {/* Right Side - Form Panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <Container maxWidth="sm" sx={{ width: "100%" }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: mode === "dark"
                  ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 255, 0.1)"
                  : "0 20px 60px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                background: mode === "dark"
                  ? "rgba(22, 27, 34, 0.9)"
                  : "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: mode === "dark"
                  ? "1px solid rgba(48, 54, 61, 0.6)"
                  : "1px solid rgba(208, 215, 222, 0.6)",
                animation: "scaleIn 0.5s ease-out",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  background: mode === "dark"
                    ? "linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(255, 107, 157, 0.15) 100%)"
                    : "linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(255, 107, 157, 0.1) 100%)",
                  padding: 3,
                  textAlign: "center",
                  borderBottom: mode === "dark"
                    ? "1px solid rgba(48, 54, 61, 0.5)"
                    : "1px solid rgba(208, 215, 222, 0.5)",
                }}
              >
                <PersonAddOutlined
                  sx={{
                    fontSize: 56,
                    mb: 1.5,
                    color: "primary.main",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <Typography
                  variant="h4"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Fill in your details to get started
                </Typography>
              </Box>

              <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="Password must be at least 6 characters"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "primary.main" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 2,
                    },
                  },
                }}
              />

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(255, 107, 107, 0.1)" : "rgba(244, 67, 54, 0.1)",
                    border: "1px solid",
                    borderColor: "secondary.main",
                  }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    bgcolor: mode === "dark" ? "rgba(77, 208, 225, 0.1)" : "rgba(76, 175, 80, 0.1)",
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                >
                  {success}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={!loading && <ArrowForward />}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.75,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #00E5FF 0%, #FF6B9D 100%)",
                  fontSize: "16px",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: mode === "dark"
                    ? "0 8px 24px rgba(0, 229, 255, 0.4)"
                    : "0 8px 24px rgba(0, 102, 204, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #FF6B9D 0%, #00E5FF 100%)",
                    boxShadow: mode === "dark"
                      ? "0 12px 32px rgba(0, 229, 255, 0.6)"
                      : "0 12px 32px rgba(0, 102, 204, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "#ccc",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </form>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Grid>
  </Grid>
</Box>
  );
}

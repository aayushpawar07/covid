import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const ThemeToggleContext = createContext();

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}

export default function ThemeContextProvider({ children }) {
  // Load theme preference from localStorage or default to dark
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode || "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: mode === "dark" ? "#00E5FF" : "#0066CC",
            light: mode === "dark" ? "#33EEFF" : "#3385FF",
            dark: mode === "dark" ? "#00B8CC" : "#004C99",
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: mode === "dark" ? "#FF6B9D" : "#E91E63",
            light: mode === "dark" ? "#FF8FB3" : "#F06292",
            dark: mode === "dark" ? "#CC4A7A" : "#C2185B",
            contrastText: "#FFFFFF",
          },
          error: {
            main: mode === "dark" ? "#FF5252" : "#D32F2F",
            light: "#FF8A80",
            dark: "#C62828",
          },
          warning: {
            main: mode === "dark" ? "#FFB74D" : "#F57C00",
            light: "#FFCC80",
            dark: "#E65100",
          },
          info: {
            main: mode === "dark" ? "#64B5F6" : "#1976D2",
            light: "#90CAF9",
            dark: "#1565C0",
          },
          success: {
            main: mode === "dark" ? "#81C784" : "#388E3C",
            light: "#A5D6A7",
            dark: "#2E7D32",
          },
          background: {
            default: mode === "dark" 
              ? "#0D1117" 
              : "#F8F9FA",
            paper: mode === "dark" 
              ? "rgba(22, 27, 34, 0.8)" 
              : "#FFFFFF",
          },
          text: {
            primary: mode === "dark" ? "#F0F6FC" : "#1C2128",
            secondary: mode === "dark" ? "#8B949E" : "#656D76",
            disabled: mode === "dark" ? "#484F58" : "#ADBAC7",
          },
          divider: mode === "dark" ? "rgba(48, 54, 61, 0.8)" : "rgba(208, 215, 222, 0.8)",
          action: {
            active: mode === "dark" ? "#00E5FF" : "#0066CC",
            hover: mode === "dark" ? "rgba(0, 229, 255, 0.08)" : "rgba(0, 102, 204, 0.08)",
            selected: mode === "dark" ? "rgba(0, 229, 255, 0.16)" : "rgba(0, 102, 204, 0.16)",
            disabled: mode === "dark" ? "rgba(72, 79, 88, 0.3)" : "rgba(173, 186, 199, 0.3)",
          },
        },
        typography: {
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
          h1: {
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          },
          h2: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
          },
          h3: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          },
          h4: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          },
          h5: {
            fontWeight: 600,
            lineHeight: 1.5,
          },
          h6: {
            fontWeight: 600,
            lineHeight: 1.5,
          },
          body1: {
            lineHeight: 1.6,
          },
          body2: {
            lineHeight: 1.5,
          },
          button: {
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: "none",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundImage: mode === "dark"
                  ? "linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)"
                  : undefined,
                backgroundAttachment: "fixed",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                background: mode === "dark"
                  ? "rgba(22, 27, 34, 0.6)"
                  : "#FFFFFF",
                backdropFilter: mode === "dark" ? "blur(20px)" : "none",
                WebkitBackdropFilter: mode === "dark" ? "blur(20px)" : "none",
                border: mode === "dark"
                  ? "1px solid rgba(48, 54, 61, 0.5)"
                  : "1px solid rgba(208, 215, 222, 0.5)",
                boxShadow: mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 229, 255, 0.05)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: mode === "dark"
                    ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 255, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.12)",
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 10,
                padding: "10px 24px",
                fontSize: "0.9375rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              },
              contained: {
                boxShadow: mode === "dark"
                  ? "0 4px 16px rgba(0, 229, 255, 0.3)"
                  : "0 4px 12px rgba(0, 102, 204, 0.3)",
                "&:hover": {
                  boxShadow: mode === "dark"
                    ? "0 8px 24px rgba(0, 229, 255, 0.4)"
                    : "0 8px 20px rgba(0, 102, 204, 0.4)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: mode === "dark"
                  ? "linear-gradient(135deg, rgba(22, 27, 34, 0.8) 0%, rgba(30, 35, 42, 0.8) 100%)"
                  : undefined,
                backdropFilter: mode === "dark" ? "blur(20px)" : "none",
                WebkitBackdropFilter: mode === "dark" ? "blur(20px)" : "none",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? "#00E5FF" : "#0066CC",
                  },
                  "&.Mui-focused fieldset": {
                    borderWidth: 2,
                  },
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: mode === "dark"
                  ? "0 4px 16px rgba(0, 0, 0, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

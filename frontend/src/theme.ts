import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { ThemeMode } from "./types/context.types";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      borderRadius: { small: number; medium: number; large: number };
    };
  }
  interface ThemeOptions {
    custom?: {
      borderRadius?: { small?: number; medium?: number; large?: number };
    };
  }
}

export function getTheme(mode: ThemeMode): Theme {
  const isDark = mode === "dark";

  const themeOptions: ThemeOptions = {
    direction: "rtl",
    palette: {
      mode,
      primary: {
        main: isDark ? "#3b82f6" : "#2563eb",
        contrastText: "#ffffff",
      },
      secondary: {
        main: isDark ? "#06b6d4" : "#0891b2",
      },
      background: {
        default: isDark ? "#050507" : "#f8fafc",
        paper: isDark ? "#0d0d12" : "#ffffff",
      },
      text: {
        primary: isDark ? "#ffffff" : "#0f172a",
        secondary: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(15, 23, 42, 0.7)",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)",
    },
    typography: {
      fontFamily: "'Outfit', 'Noto Sans Arabic', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontWeight: 800, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.01em" },
      h4: { fontWeight: 700, letterSpacing: "-0.01em" },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      body1: { lineHeight: 1.8 },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            textTransform: "none",
            fontWeight: 600,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          containedPrimary: {
            background: isDark
              ? "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
              : "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isDark
                ? "0 8px 25px rgba(59, 130, 246, 0.5)"
                : "0 8px 25px rgba(37, 99, 235, 0.4)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.1)",
            borderRadius: 24,
            backgroundImage: "none",
            boxShadow: isDark ? undefined : "0 4px 24px rgba(15, 23, 42, 0.08)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            background: isDark ? "#0d0d12" : "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark ? "rgba(13, 13, 18, 0.8)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.1)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark ? "#0d0d12" : "#ffffff",
            borderLeft: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.1)",
            borderRight: "none",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.3s ease",
            "&:hover": {
              background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.05)",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "#3b82f6" : "#2563eb",
              },
            },
          },
        },
      },
    },
    custom: {
      borderRadius: {
        small: 8,
        medium: 16,
        large: 32,
      },
    },
  };

  return createTheme(themeOptions);
}

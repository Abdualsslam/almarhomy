// src/theme.ts
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { ThemeMode } from "./types/context.types";

// Module augmentation for custom theme properties
declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      borderRadius: {
        small: number;
        medium: number;
        large: number;
      };
      spacing: {
        section: number;
        card: number;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      borderRadius?: {
        small?: number;
        medium?: number;
        large?: number;
      };
      spacing?: {
        section?: number;
        card?: number;
      };
    };
  }
}

/**
 * Creates a Material-UI theme based on the specified mode (light/dark)
 * @param mode - The theme mode ('light' or 'dark')
 * @returns A configured Material-UI Theme object
 */
export function getTheme(mode: ThemeMode): Theme {
  const themeOptions: ThemeOptions = {
    direction: "rtl",
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#818cf8" : "#6366f1", // Indigo
        light: mode === "dark" ? "#a5b4fc" : "#818cf8",
        dark: mode === "dark" ? "#4f46e5" : "#4338ca",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#22d3ee" : "#06b6d4", // Cyan
        light: mode === "dark" ? "#67e8f9" : "#22d3ee",
        dark: mode === "dark" ? "#0891b2" : "#0e7490",
      },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc", // Slate 900 / 50
        paper: mode === "dark" ? "#1e293b" : "#ffffff", // Slate 800 / White
      },
      text: {
        primary: mode === "dark" ? "#f8fafc" : "#0f172a",
        secondary: mode === "dark" ? "#94a3b8" : "#64748b",
      },
      divider:
        mode === "dark" ? "rgba(248, 250, 252, 0.08)" : "rgba(15, 23, 42, 0.08)",
    },
    typography: {
      fontFamily: "'Cairo', 'Inter', 'Segoe UI', sans-serif",
      h1: { fontWeight: 800, letterSpacing: "-0.02em" },
      h2: { fontWeight: 800, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.01em" },
      h4: { fontWeight: 700, letterSpacing: "-0.01em" },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { letterSpacing: "0.01em" },
      body1: { lineHeight: 1.7 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 600,
            padding: "8px 20px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
            },
            "& .MuiButton-startIcon": {
              marginLeft: 8,
              marginRight: -4,
            },
            "& .MuiButton-endIcon": {
              marginRight: 8,
              marginLeft: -4,
            },
          },
          containedPrimary: {
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === "dark" 
              ? "0 4px 20px rgba(0,0,0,0.4)" 
              : "0 4px 20px rgba(0,0,0,0.05)",
            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            backgroundImage: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            color: mode === "dark" ? "#f8fafc" : "#0f172a",
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          },
        },
      },
    },
    custom: {
      borderRadius: {
        small: 6,
        medium: 12,
        large: 24,
      },
      spacing: {
        section: 80,
        card: 24,
      },
    },
  };

  return createTheme(themeOptions);
}

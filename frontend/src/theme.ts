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
        main: "#24458f",
        dark: "#15295f",
        light: "#3f5fa8",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f4c400",
        dark: "#d9a900",
        light: "#fff4bf",
        contrastText: "#111827",
      },
      error: {
        main: "#b5152b",
      },
      background: {
        default: isDark ? "#050505" : "#f7f7f5",
        paper: isDark ? "#111827" : "#ffffff",
      },
      text: {
        primary: isDark ? "#ffffff" : "#111827",
        secondary: isDark ? "rgba(255, 255, 255, 0.7)" : "#6b7280",
      },
      divider: isDark ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb",
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
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          containedPrimary: {
            background: "#24458f",
            color: "#ffffff",
            "&:hover": {
              background: "#15295f",
              transform: "translateY(-1px)",
              boxShadow: "0 10px 24px rgba(36, 69, 143, 0.22)",
            },
          },
          containedSecondary: {
            background: "#f4c400",
            color: "#111827",
            "&:hover": {
              background: "#d9a900",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 22,
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e5e7eb",
            boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 14px 35px rgba(17, 24, 39, 0.08)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            background: isDark ? "#111827" : "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark ? "rgba(5, 5, 5, 0.95)" : "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e5e7eb",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: isDark ? "#050505" : "#ffffff",
            borderLeft: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e5e7eb",
            borderRight: "none",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.25s ease",
            "&:hover": {
              background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(36, 69, 143, 0.06)",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#24458f",
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
          colorPrimary: {
            backgroundColor: isDark ? "rgba(36, 69, 143, 0.2)" : "rgba(36, 69, 143, 0.1)",
            color: isDark ? "#6b8fd4" : "#24458f",
          },
          colorSecondary: {
            backgroundColor: isDark ? "rgba(244, 196, 0, 0.15)" : "rgba(244, 196, 0, 0.12)",
            color: isDark ? "#f4c400" : "#8a6d00",
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
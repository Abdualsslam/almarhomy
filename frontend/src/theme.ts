import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { ThemeMode } from "./types/context.types";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      borderRadius: { small: number; medium: number; large: number };
      colors: {
        cream: string;
        surface: string;
        borderWarm: string;
        green: string;
        green700: string;
        gold: string;
        clay: string;
        ink: string;
        muted: string;
        whatsapp: string;
      };
      shadow: { soft: string; md: string };
    };
  }
  interface ThemeOptions {
    custom?: {
      borderRadius?: { small?: number; medium?: number; large?: number };
      colors?: Record<string, string>;
      shadow?: { soft?: string; md?: string };
    };
  }
}

// "Warm Arabian Hospitality" palette — light, RTL-first.
const COLORS = {
  cream: "#FAF5EE",
  surface: "#FFFFFF",
  borderWarm: "#E9DFD1",
  green: "#2C4A3B",
  green700: "#22392E",
  gold: "#C2A14D",
  clay: "#B85C38",
  ink: "#211C16",
  muted: "#7A7064",
  whatsapp: "#25D366",
};

const SHADOW = {
  soft: "0 6px 22px rgba(33,28,22,.06)",
  md: "0 10px 30px rgba(33,28,22,.10)",
};

// The design is intentionally light-only; mode is ignored.
export function getTheme(_mode: ThemeMode): Theme {
  const themeOptions: ThemeOptions = {
    direction: "rtl",
    palette: {
      mode: "light",
      primary: { main: COLORS.green, dark: COLORS.green700, contrastText: "#FFFFFF" },
      secondary: { main: COLORS.gold, contrastText: COLORS.ink },
      background: { default: COLORS.cream, paper: COLORS.surface },
      text: { primary: COLORS.ink, secondary: COLORS.muted },
      divider: COLORS.borderWarm,
      success: { main: COLORS.whatsapp, contrastText: "#FFFFFF" },
      warning: { main: COLORS.clay },
    },
    typography: {
      fontFamily: "'Tajawal', 'Segoe UI', sans-serif",
      h1: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 700, letterSpacing: 0 },
      h2: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 700, letterSpacing: 0 },
      h3: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 700 },
      h4: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 700 },
      h5: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 600 },
      h6: { fontFamily: "'El Messiri', 'Tajawal', sans-serif", fontWeight: 600 },
      button: { fontWeight: 700 },
      body1: { lineHeight: 1.85 },
      body2: { lineHeight: 1.8 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 700,
            paddingInline: 22,
            paddingBlock: 10,
            boxShadow: "none",
            transition: "all .28s cubic-bezier(.4,0,.2,1)",
          },
          containedPrimary: {
            backgroundColor: COLORS.green,
            "&:hover": {
              backgroundColor: COLORS.green700,
              boxShadow: "0 8px 20px rgba(44,74,59,.22)",
            },
          },
          outlinedPrimary: {
            borderColor: COLORS.green,
            color: COLORS.green,
            "&:hover": { backgroundColor: "rgba(44,74,59,.06)", borderColor: COLORS.green },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.borderWarm}`,
            borderRadius: 16,
            boxShadow: SHADOW.soft,
            backgroundImage: "none",
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiAppBar: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, borderRadius: 999 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { backgroundColor: COLORS.surface, borderRadius: 12 },
        },
      },
    },
    custom: {
      borderRadius: { small: 8, medium: 14, large: 28 },
      colors: COLORS,
      shadow: SHADOW,
    },
  };

  return createTheme(themeOptions);
}

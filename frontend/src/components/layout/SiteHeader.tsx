import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Stack,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import WhatsApp from "@mui/icons-material/WhatsApp";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "@mui/icons-material/Home";
import Category from "@mui/icons-material/Category";
import Storefront from "@mui/icons-material/Storefront";
import { useState, FC, ReactElement } from "react";
import { getWhatsAppUrl } from "../../utils/whatsapp";
import { useThemeMode } from "../../contexts/ThemeContext";

interface NavLinkItem {
  label: string;
  path: string;
  icon: ReactElement;
}

const navLinks: NavLinkItem[] = [
  { label: "الرئيسية", path: "/", icon: <Home /> },
  { label: "المنتجات", path: "/catalog", icon: <Storefront /> },
  { label: "الفئات", path: "/categories", icon: <Category /> },
];

const SiteHeader: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isDark = mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: isDark ? "rgba(5, 5, 5, 0.95)" : "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 0.5, px: { xs: 0, sm: 0 } }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
            >
              <Box
                component="img"
                src="/logo.webp"
                alt="Alrhomi Logo"
                sx={{ width: 44, height: 44, filter: isDark ? "brightness(0) invert(1)" : "none" }}
              />
              <Typography
                variant="h6"
                fontWeight={800}
                letterSpacing="-0.5"
                sx={{ display: { xs: "none", sm: "block" }, color: "var(--brand-blue)" }}
              >
                ALRHOMI
              </Typography>
            </Stack>

            {!isMobile && (
              <Stack direction="row" spacing={0.5}>
                {navLinks.map((link) => (
                  <Button
                    key={link.path}
                    component={NavLink}
                    to={link.path}
                    sx={{
                      color: theme.palette.text.secondary,
                      borderRadius: "12px",
                      px: 2,
                      fontWeight: 500,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        color: "var(--brand-blue)",
                        background: isDark ? "rgba(36,69,143,0.1)" : "rgba(36,69,143,0.05)",
                      },
                      "&.active": {
                        color: "var(--brand-blue)",
                        background: isDark ? "rgba(36,69,143,0.15)" : "rgba(36,69,143,0.08)",
                        fontWeight: 700,
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} alignItems="center">
              {!isMobile && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<WhatsApp />}
                  onClick={() => window.open(getWhatsAppUrl(), "_blank")}
                  sx={{ px: 3, fontWeight: 700, borderRadius: 2 }}
                >
                  واتساب
                </Button>
              )}

              <IconButton
                onClick={toggleTheme}
                sx={{
                  bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(36,69,143,0.05)",
                  color: "var(--brand-blue)",
                }}
              >
                {isDark ? <LightMode /> : <DarkMode />}
              </IconButton>

              <IconButton
                onClick={() => window.open(getWhatsAppUrl(), "_blank")}
                sx={{
                  display: { xs: "inline-flex", sm: "none" },
                  bgcolor: "rgba(37,211,102,0.15)",
                  color: "#25D366",
                }}
              >
                <WhatsApp />
              </IconButton>

              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "var(--brand-blue)" }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 260, bgcolor: theme.palette.background.paper },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" fontWeight={800} sx={{ color: "var(--brand-blue)" }}>
            ALRHOMI
          </Typography>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.path}
              component={NavLink}
              to={link.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ "&.active": { bgcolor: "rgba(36,69,143,0.08)", color: "var(--brand-blue)" } }}
            >
              <ListItemIcon sx={{ color: "var(--brand-blue)" }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SiteHeader;
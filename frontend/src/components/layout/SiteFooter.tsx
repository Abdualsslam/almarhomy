import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link as MuiLink,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { FC, ReactElement } from "react";
import { getWhatsAppUrl } from "../../utils/whatsapp";

const SiteFooter: FC = (): ReactElement => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        pt: 10,
        pb: 4,
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg, #050505 0%, #0d1b3d 50%, #15295f 100%)"
          : "linear-gradient(135deg, #0d1b3d 0%, #15295f 50%, #24458f 100%)",
        color: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              sx={{ mb: 3, color: "var(--brand-yellow)" }}
            >
              ALRHOMI
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 400 }}>
              رائدون في تجهيز أرقى المطاعم والمطابخ الفندقية. نقدم حلولاً متكاملة تدمج بين الجودة العالية والابتكار التقني.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: "var(--brand-yellow)" }}>
              روابط سريعة
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: "الرئيسية", path: "/" },
                { label: "الكتالوج", path: "/catalog" },
                { label: "الفئات", path: "/categories" },
              ].map((link) => (
                <MuiLink
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                    "&:hover": { color: "var(--brand-yellow)" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3, color: "var(--brand-yellow)" }}>
              معلومات الاتصال
            </Typography>
            <Stack spacing={1.5}>
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                جدة، حي الهنداوية - شارع شجرة الزيتون
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
                الهاتف: 012 647 7825
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  href={getWhatsAppUrl()}
                  target="_blank"
                  sx={{
                    bgcolor: "rgba(37,211,102,0.15)",
                    color: "#25D366",
                    "&:hover": { bgcolor: "rgba(37,211,102,0.25)" },
                  }}
                >
                  <WhatsApp />
                </IconButton>
                <MuiLink
                  href={getWhatsAppUrl()}
                  target="_blank"
                  sx={{
                    color: "#25D366",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": { color: "#fff" },
                  }}
                >
                  تواصل عبر واتساب مباشر
                </MuiLink>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.15)" }} />

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "rgba(255,255,255,0.5)" }}
        >
          © {new Date().getFullYear()} شركة الرحومي المحدودة. صُمم بشغف للتميز.
        </Typography>
      </Container>
    </Box>
  );
};

export default SiteFooter;
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function DashboardHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: { xs: 3, sm: 4 },
        pb: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: 900,
          color: "var(--brand-blue)",
        }}
      >
        {title || t('adminDashboard')}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
      >
        {subtitle || t('dashboardSubtitle')}
      </Typography>
    </Box>
  );
}
import { useState, useEffect, FC, ReactElement } from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import Inventory2 from "@mui/icons-material/Inventory2";
import Category from "@mui/icons-material/Category";
import Image from "@mui/icons-material/Image";
import Verified from "@mui/icons-material/Verified";
import apiClient from "../api/client";

interface SiteStats {
  totalProducts: number;
  totalCategories: number;
  productsWithImages: number;
}

interface StatItemProps {
  icon: ReactElement;
  value: number;
  label: string;
  color: string;
}

const StatItem: FC<StatItemProps> = ({ icon, value, label, color }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 30));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 3 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: `${color}15`,
          color: color,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        {icon}
      </Box>
      <Typography variant="h3" fontWeight={800} sx={{ color }}>
        {displayValue}+
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        {label}
      </Typography>
    </Stack>
  );
};

const StatsCounter: FC = (): ReactElement => {
  const [stats, setStats] = useState<SiteStats>({
    totalProducts: 120,
    totalCategories: 14,
    productsWithImages: 100,
  });

useEffect(() => {
    (async () => {
      try {
        const data = await apiClient.get<SiteStats>('/public/site-stats');
        if (data) {
          setStats({
            totalProducts: data.totalProducts || 0,
            totalCategories: data.totalCategories || 0,
            productsWithImages: data.productsWithImages || 0,
          });
        }
      } catch {
        // use defaults
      }
    })();
  }, []);

  return (
    <Box
      className="brand-section-dark"
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          sx={{ mb: 6, color: "#ffffff" }}
        >
          أرقام نثق بها
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatItem
              icon={<Inventory2 sx={{ fontSize: 32 }} />}
              value={stats.totalProducts}
              label="منتج معروض"
              color="#f4c400"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatItem
              icon={<Category sx={{ fontSize: 32 }} />}
              value={stats.totalCategories}
              label="فئة متخصصة"
              color="#ffffff"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatItem
              icon={<Image sx={{ fontSize: 32 }} />}
              value={stats.productsWithImages}
              label="منتج مصور"
              color="#f4c400"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <StatItem
              icon={<Verified sx={{ fontSize: 32 }} />}
              value={98}
              label="رضا العملاء %"
              color="#ffffff"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsCounter;
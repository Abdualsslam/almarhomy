import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  alpha,
  Stack,
} from "@mui/material";
import ProductIcon from "@mui/icons-material/Inventory";
import ProductsWithImagesIcon from "@mui/icons-material/PhotoLibrary";
import ImageNotSupported from "@mui/icons-material/ImageNotSupported";
import ImageIcon from "@mui/icons-material/Image";
import WatermarkIcon from "@mui/icons-material/WaterDrop";
import HourglassIcon from "@mui/icons-material/HourglassTop";
import PersonIcon from "@mui/icons-material/Person";

const STAT_VARIANTS = [
  {
    key: "totalProducts",
    label: "إجمالي المنتجات",
    icon: <ProductIcon />,
    color: "#24458f",
  },
  {
    key: "productsWithImages",
    label: "منتجات مع صور",
    icon: <ProductsWithImagesIcon />,
    color: "#10b981",
  },
  {
    key: "productsWithoutImages",
    label: "بدون صور",
    icon: <ImageNotSupported />,
    color: "#b5152b",
  },
  {
    key: "totalImages",
    label: "إجمالي الصور",
    icon: <ImageIcon />,
    color: "#24458f",
  },
  {
    key: "watermarkedCount",
    label: "صور مُعلَّمة",
    icon: <WatermarkIcon />,
    color: "#f4c400",
  },
  {
    key: "pendingJobs",
    label: "مهام معلقة",
    icon: <HourglassIcon />,
    color: "#f59e0b",
  },
  {
    key: "activeUsers",
    label: "المستخدمون النشطون",
    icon: <PersonIcon />,
    color: "#6b7280",
  },
] as const;

interface StatsData {
  totalProducts?: number;
  productsWithImages?: number;
  productsWithoutImages?: number;
  totalImages?: number;
  watermarkedCount?: number;
  pendingJobs?: number;
  activeUsers?: number;
}

interface Props {
  stats: StatsData;
}

export default function StatsOverview({ stats }: Props) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {STAT_VARIANTS.map((variant) => {
        const value = stats?.[variant.key] ?? 0;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={variant.key}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: `1px solid ${alpha(variant.color, 0.15)}`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 32px ${alpha(variant.color, 0.16)}`,
                  borderColor: alpha(variant.color, 0.35),
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(variant.color, 0.1),
                      color: variant.color,
                    }}
                  >
                    {variant.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ fontSize: "0.8rem" }}>
                      {variant.label}
                    </Typography>
                    <Typography variant="h5" fontWeight={800}>
                      {value.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
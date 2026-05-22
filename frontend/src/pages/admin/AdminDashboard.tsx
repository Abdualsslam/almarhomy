import { useEffect, useState } from "react";
import { Grid, Box, Card, CardContent, Typography, Button, Alert, alpha, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Add as AddIcon,
  CloudUpload,
  ImageNotSupported,
  LinkOff,
} from "@mui/icons-material";
import { fetchStats, fetchUsers } from "../../api/admin";
import { User } from "../../types/models.types";
import DashboardSkeleton from "./components/DashboardSkeleton";
import DashboardHeader from "./components/DashboardHeader";
import StatsOverview from "./components/StatsOverview";
import ImagesDistributionCard from "./components/ImagesDistributionCard";
import RecentUsersCard from "./components/RecentUsersCard";

interface StatsData {
  totalProducts: number;
  productsWithImages: number;
  productsWithoutImages: number;
  totalImages: number;
  watermarkedCount: number;
  pendingJobs: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [stats, setStats] = useState<StatsData>({
    totalProducts: 0,
    productsWithImages: 0,
    productsWithoutImages: 0,
    totalImages: 0,
    watermarkedCount: 0,
    pendingJobs: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const statsResponse = await fetchStats({ signal });
        if (!isMounted) return;

        if (statsResponse) {
          setStats({
            totalProducts: statsResponse.totalProducts ?? 0,
            productsWithImages: statsResponse.productsWithImages ?? 0,
            productsWithoutImages: statsResponse.productsWithoutImages ?? 0,
            totalImages: statsResponse.totalImages ?? 0,
            watermarkedCount: statsResponse.watermarkedCount ?? 0,
            pendingJobs: statsResponse.pendingJobs ?? 0,
            activeUsers: statsResponse.activeUsers ?? 0,
          });
        }

        const usersResponse = await fetchUsers({ signal });
        if (!isMounted) return;

        if (usersResponse && Array.isArray(usersResponse)) {
          const sorted = usersResponse
            .sort((a: User, b: User) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
          setRecentUsers(sorted);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setStats({
          totalProducts: 0, productsWithImages: 0, productsWithoutImages: 0,
          totalImages: 0, watermarkedCount: 0, pendingJobs: 0, activeUsers: 0,
        });
        setRecentUsers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => { isMounted = false; controller.abort(); };
  }, []);

  if (loading) return <DashboardSkeleton />;

  const processed = (stats.totalImages ?? 0) - (stats.watermarkedCount ?? 0) - (stats.pendingJobs ?? 0);
  const chartData = [
    { name: "معالجة", value: Math.max(0, processed) },
    { name: "مُعلَّمة", value: stats.watermarkedCount ?? 0 },
    { name: "بانتظار", value: stats.pendingJobs ?? 0 },
  ];

  const formatDate = (d: string | Date): string =>
    new Date(d).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" });

  const quickLinks = [
    { label: "إضافة منتج", icon: <AddIcon />, path: "/admin/products", color: "#24458f" },
    { label: "رفع صور", icon: <CloudUpload />, path: "/admin/images", color: "#f4c400" },
    { label: "منتجات بدون صور", icon: <ImageNotSupported />, path: "/admin/products?hasImages=without", color: "#b5152b" },
    { label: "صور غير مرتبطة", icon: <LinkOff />, path: "/admin/images?assigned=false", color: "#6b7280" },
  ];

  return (
    <Box sx={{ width: "100%", pb: 4 }}>
      <DashboardHeader />

      {stats.productsWithoutImages > 0 && (
        <Alert
          severity="warning"
          sx={{ mb: 3, borderRadius: 3, fontWeight: 600 }}
          action={
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => navigate("/admin/products?hasImages=without")}
            >
              مراجعتها الآن
            </Button>
          }
        >
          يوجد {stats.productsWithoutImages} منتج بدون صور — مراجعتها الآن
        </Alert>
      )}

      {stats.pendingJobs > 0 && (
        <Alert
          severity="info"
          sx={{ mb: 3, borderRadius: 3, fontWeight: 600 }}
        >
          يوجد {stats.pendingJobs} مهام معالجة صور قيد الانتظار
        </Alert>
      )}

      <StatsOverview stats={stats} />

      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        إجراءات سريعة
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickLinks.map((link) => (
          <Grid size={{ xs: 6, sm: 3 }} key={link.path}>
            <Card
              elevation={0}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: link.color,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${alpha(link.color, 0.18)}`,
                },
              }}
              onClick={() => navigate(link.path)}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 }, textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                    bgcolor: alpha(link.color, 0.1),
                    color: link.color,
                  }}
                >
                  {link.icon}
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {link.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <ImagesDistributionCard data={chartData} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <RecentUsersCard users={recentUsers} formatDate={formatDate} />
        </Grid>
      </Grid>
    </Box>
  );
}
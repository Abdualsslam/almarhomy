import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Search from "@mui/icons-material/Search";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Verified from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, FC, ReactElement } from "react";
import { motion } from "framer-motion";
import { fetchCategories } from "../api/admin";
import { searchProducts } from "../api/products";
import CategoryShowcase from "../components/CategoryShowcase";
import ProductCard from "../components/ProductCard";
import StatsCounter from "../components/StatsCounter";
import WhatsAppCTA from "../components/WhatsAppCTA";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import { getWhatsAppUrl } from "../utils/whatsapp";

interface Category {
  _id: string;
  name: string;
  [key: string]: any;
}

interface ProductItem {
  _id: string;
  productName?: string;
  productCode?: string;
  category?: string;
  model?: string;
  description?: string;
  originalUrl?: string | null;
  watermarkedUrl?: string | null;
  tags?: string[];
}

const HomePage: FC = (): ReactElement => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [heroSearch, setHeroSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetchCategories({ page: 1, limit: 6 }),
          searchProducts({ page: 1, limit: 8 }),
        ]);
        setCategories(catRes.items || []);
        setProducts(prodRes.data?.items || []);
      } catch (err) {
        console.error("Failed to fetch home data", err);
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);

  const handleHeroSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && heroSearch.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Alrhomi Catalog | تجهيزات المطاعم والمطابخ والفنادق"
        description="تصفح المنتجات، شاهد التفاصيل والصور، وأرسل استفسارك مباشرة عبر واتساب."
        keywords="تجهيزات مطاعم, مطابخ فندقية, معدات مطاعم, كتالوج الرحومي"
        type="website"
      />

      {/* Hero Section */}
      <Box
        className="brand-section-dark"
        sx={{
          minHeight: { xs: "85vh", md: "90vh" },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Stack spacing={4} sx={{ maxWidth: 800, textAlign: "right" }}>
              <Typography
                variant={isMdUp ? "h2" : "h3"}
                fontWeight={900}
                sx={{ color: "#ffffff", lineHeight: 1.15 }}
              >
                تجهيزات المطاعم والمطابخ والفنادق في كتالوج واحد
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontWeight: 400 }}
              >
                تصفح المنتجات، شاهد التفاصيل والصور، وأرسل استفسارك مباشرة عبر واتساب.
              </Typography>

              <TextField
                fullWidth
                placeholder="ابحث باسم المنتج أو الكود..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                onKeyDown={handleHeroSearch}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: "rgba(255,255,255,0.5)" }} />,
                  sx: {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  },
                }}
                sx={{ mt: 2 }}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate("/catalog")}
                  sx={{ px: 5, py: 1.5, fontSize: "1.1rem", fontWeight: 700, borderRadius: 3 }}
                >
                  تصفح الكتالوج
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<WhatsApp />}
                  onClick={() => window.open(getWhatsAppUrl(), "_blank")}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: 3,
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "#fff",
                    "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  تواصل عبر واتساب
                </Button>
              </Stack>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Trust Bar */}
      <Box sx={{ bgcolor: "var(--bg-section)", py: 4, borderBottom: "1px solid var(--border-soft)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ textAlign: "center" }}>
            {[
              { icon: <LocalShipping sx={{ fontSize: 32 }} />, label: "منتجات مصنفة" },
              { icon: <Search sx={{ fontSize: 32 }} />, label: "صور واضحة" },
              { icon: <WhatsApp sx={{ fontSize: 32 }} />, label: "استفسار مباشر" },
              { icon: <Verified sx={{ fontSize: 32 }} />, label: "تجهيز للمطاعم والفنادق" },
            ].map((item, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Stack alignItems="center" spacing={1} sx={{ color: "var(--brand-blue)" }}>
                  {item.icon}
                  <Typography variant="body1" fontWeight={600} color="text.primary">
                    {item.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Categories */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
              تصفح حسب <Box component="span" sx={{ color: "var(--brand-blue)" }}>الفئات</Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              مجموعة مختارة من أرقى المعدات والأدوات الاحترافية المصنفة بدقة لتسهيل وصولك لما تحتاجه.
            </Typography>
          </Box>
          <CategoryShowcase
            categories={categories}
            loading={loadingCategories}
            limit={6}
            showMore
            onMoreClick={() => navigate("/categories")}
          />
        </Container>
      </Box>

      {/* Latest Products */}
      <Box sx={{ bgcolor: "var(--bg-section)", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
              أحدث <Box component="span" sx={{ color: "var(--brand-yellow)" }}>الإضافات</Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              كن أول من يكتشف أحدث قطعنا الحصرية المضافة حديثًا للكتالوج.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate("/catalog")}
              sx={{ px: 6, py: 1.5, fontWeight: 700, borderRadius: 3 }}
            >
              اكتشف كل المنتجات
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <StatsCounter />

      {/* How to Order */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} align="center" sx={{ mb: 6 }}>
            كيف <Box component="span" sx={{ color: "var(--brand-yellow)" }}>تطلب؟</Box>
          </Typography>
          <Grid container spacing={4}>
            {[
              { step: "1", title: "ابحث", desc: "ابحث عن المنتج بالاسم أو الكود" },
              { step: "2", title: "افتح التفاصيل", desc: "شاهد الصور والمواصفات" },
              { step: "3", title: "تواصل عبر واتساب", desc: "أرسل استفسارك مباشرة" },
            ].map((item) => (
              <Grid size={{ xs: 12, md: 4 }} key={item.step}>
                <Stack alignItems="center" spacing={2} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "var(--brand-blue)",
                      color: "var(--brand-yellow)",
                      fontSize: "2rem",
                      fontWeight: 900,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <WhatsAppCTA
        title="هل تحتاج استشارة؟"
        subtitle="تحدث مع فريقنا مباشرة عبر واتساب وسنساعدك في اختيار الأنسب."
      />
    </PageTransition>
  );
};

export default HomePage;
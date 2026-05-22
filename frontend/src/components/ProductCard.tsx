import React from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { WhatsApp, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { buildProductWhatsAppMessage, getWhatsAppUrl } from "../utils/whatsapp";

interface ProductCardProps {
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

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  productName,
  productCode,
  category,
  model,
  description,
  originalUrl,
  watermarkedUrl,
  tags,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const imageSrc = watermarkedUrl || originalUrl;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = buildProductWhatsAppMessage({
      productName,
      productCode,
      category,
      model,
      url: `${window.location.origin}/product/${_id}`,
    });
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <Box
      className="brand-card"
      onClick={() => navigate(`/product/${_id}`)}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 18px 45px ${theme.palette.mode === "dark" ? "rgba(36,69,143,0.25)" : "rgba(36,69,143,0.16)"}`,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "75%",
          overflow: "hidden",
          bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "#f3f4f6",
        }}
      >
        {imageSrc ? (
          <Box
            component="img"
            src={imageSrc}
            alt={productName || "منتج"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              ".brand-card:hover &": {
                transform: "scale(1.05)",
              },
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
              bgcolor: theme.palette.mode === "dark" ? "rgba(36,69,143,0.1)" : "rgba(36,69,143,0.04)",
            }}
          >
            <Visibility sx={{ fontSize: 40, color: "var(--brand-blue)", opacity: 0.4 }} />
            <Typography variant="caption" color="text.secondary">
              لا توجد صورة
            </Typography>
          </Box>
        )}
        {category && (
          <Chip
            label={category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "var(--brand-yellow)",
              color: "#111827",
              fontWeight: 700,
              fontSize: "0.75rem",
              boxShadow: "0 2px 8px rgba(244, 196, 0, 0.3)",
            }}
          />
        )}
      </Box>

      <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          noWrap
          sx={{ color: "text.primary" }}
        >
          {productName || "منتج"}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {productCode && (
            <Typography variant="caption" sx={{ color: "var(--brand-blue)", fontWeight: 600 }}>
              #{productCode}
            </Typography>
          )}
          {model && (
            <Typography variant="caption" color="text.secondary">
              {model}
            </Typography>
          )}
        </Stack>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              flexGrow: 1,
            }}
          >
            {description}
          </Typography>
        )}

        {tags && tags.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {tags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
            ))}
            {tags.length > 3 && (
              <Chip label={`+${tags.length - 3}`} size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
            )}
          </Stack>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: "auto", pt: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility sx={{ fontSize: 16 }} />}
            onClick={() => navigate(`/product/${_id}`)}
            sx={{ flex: 1, fontSize: "0.8rem" }}
          >
            عرض التفاصيل
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<WhatsApp sx={{ fontSize: 16 }} />}
            onClick={handleWhatsApp}
            sx={{
              flex: 1,
              fontSize: "0.8rem",
              borderColor: "var(--whatsapp)",
              color: "var(--whatsapp)",
              "&:hover": {
                borderColor: "#1da851",
                bgcolor: "rgba(37, 211, 102, 0.06)",
              },
            }}
          >
            استفسر واتساب
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCard;
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Skeleton,
  Avatar,
  alpha,
  useTheme,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Inventory2 as InventoryIcon, Image as ImageIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { ProductItem } from "../../hooks/useProductManagement";

interface Props {
  products: ProductItem[];
  loading: boolean;
  rowsPerPage: number;
  onEdit: (product: ProductItem) => void;
  onDelete: (product: ProductItem) => void;
}

const ProductTable: React.FC<Props> = ({ products, loading, rowsPerPage, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getProductImage = (product: ProductItem): string | undefined => {
    if ((product as Record<string, unknown>).thumbnailUrl) return (product as Record<string, unknown>).thumbnailUrl as string;
    if ((product as Record<string, unknown>).watermarkedUrl) return (product as Record<string, unknown>).watermarkedUrl as string;
    if ((product as Record<string, unknown>).originalUrl) return (product as Record<string, unknown>).originalUrl as string;
    const imgs = product.images as Array<{ watermarkedUrl?: string; originalUrl?: string }> | undefined;
    if (imgs && imgs.length > 0) {
      return imgs[0].watermarkedUrl || imgs[0].originalUrl;
    }
    return undefined;
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{t('admin.products.table.product')}</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{t('admin.products.table.code')}</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{t('admin.products.table.category')}</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{t('admin.products.table.model')}</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: "0.85rem", textAlign: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <ImageIcon sx={{ fontSize: 18 }} />
                {t('admin.products.table.image_count')}
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{t('admin.products.table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from({ length: rowsPerPage }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }).map((__, idx) => (
                  <TableCell key={idx}>
                    <Skeleton variant="text" height={24} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                <InventoryIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                <Typography variant="h6">لا توجد منتجات</Typography>
                <Typography variant="body2" color="text.secondary">
                  ابدأ بإضافة منتج جديد لإدارته لاحقاً
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const imageUrl = getProductImage(product);
              const imageCount = product.imageCount ?? 0;

              return (
                <TableRow
                  key={product._id}
                  hover
                  sx={{
                    transition: "background-color 0.15s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        variant="rounded"
                        src={imageUrl}
                        alt={product.productName}
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: imageUrl ? "transparent" : alpha(theme.palette.primary.main, 0.08),
                        }}
                      >
                        {!imageUrl && (
                          <InventoryIcon sx={{ fontSize: 22, color: "var(--brand-blue)", opacity: 0.5 }} />
                        )}
                      </Avatar>
                      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {product.productName || "—"}
                        </Typography>
                        {Array.isArray(product.tags) && product.tags.length > 0 && (
                          <Box sx={{ mt: 0.25, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {product.tags.slice(0, 2).map((tag: string) => (
                              <Chip key={tag} label={tag} size="small" sx={{ fontSize: "0.65rem", height: 18 }} />
                            ))}
                            {product.tags.length > 2 && (
                              <Chip label={`+${product.tags.length - 2}`} size="small" variant="outlined" sx={{ fontSize: "0.65rem", height: 18 }} />
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "var(--brand-blue)" }}>
                      {product.productCode}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2">{product.category || "—"}</Typography>
                      {product.subcategory && (
                        <Typography variant="caption" color="text.secondary">
                          فرعي: {product.subcategory}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{product.model || "—"}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={<ImageIcon sx={{ fontSize: 16 }} />}
                      label={imageCount}
                      size="small"
                      color={imageCount > 0 ? "primary" : "error"}
                      variant={imageCount > 0 ? "outlined" : "filled"}
                      sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="تعديل">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(product)}
                        sx={{
                          color: "var(--brand-blue)",
                          "&:hover": { bgcolor: alpha("#24458f", 0.08) },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="حذف">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(product)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProductTable;
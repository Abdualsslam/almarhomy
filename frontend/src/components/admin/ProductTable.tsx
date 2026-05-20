import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Skeleton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Inventory2 as InventoryIcon } from "@mui/icons-material";
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
  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('admin.products.table.product')}</TableCell>
            <TableCell>{t('admin.products.table.code')}</TableCell>
            <TableCell>{t('admin.products.table.category')}</TableCell>
            <TableCell>{t('admin.products.table.model')}</TableCell>
            <TableCell>{t('admin.products.table.image_count')}</TableCell>
            <TableCell align="right">{t('admin.products.table.actions')}</TableCell>
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
            products.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>{product.productName}</Typography>
                    {product.tags && product.tags.length > 0 && (
                      <Box sx={{ mt: 0.5, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {product.tags.slice(0, 3).map((tag: string) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                        {product.tags.length > 3 && (
                          <Chip label={`+${product.tags.length - 3}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{product.productCode}</TableCell>
                <TableCell>
                  <Typography variant="body2">{product.category || "-"}</Typography>
                  {product.subcategory && (
                    <Typography variant="caption" color="text.secondary">
                      فرعي: {product.subcategory}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.imageCount ?? 0}</TableCell>
                <TableCell align="right">
                  <Tooltip title="تعديل">
                    <IconButton size="small" onClick={() => onEdit(product)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="حذف">
                    <IconButton size="small" color="error" onClick={() => onDelete(product)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ProductTable;

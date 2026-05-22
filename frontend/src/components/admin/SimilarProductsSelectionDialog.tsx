import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  CircularProgress,
  TablePagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { ProductItem, LibraryState } from "../../hooks/useProductManagement";

interface SimilarProductsSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  productsLibrary: LibraryState<ProductItem>;
  productsLibraryQuery: Omit<{
    page: number;
    rowsPerPage: number;
    search: string;
  }, "assigned">;
  setProductsLibraryQuery: React.Dispatch<
    React.SetStateAction<Omit<{ page: number; rowsPerPage: number; search: string }, "assigned">>
  >;
  selectedSimilarProductIdSet: Set<string>;
  onToggleProduct: (product: ProductItem) => void;
  currentProductId?: string;
}

const SimilarProductsSelectionDialog: React.FC<SimilarProductsSelectionDialogProps> = ({
  open,
  onClose,
  productsLibrary,
  productsLibraryQuery,
  setProductsLibraryQuery,
  selectedSimilarProductIdSet,
  onToggleProduct,
  currentProductId,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsLibraryQuery((prev) => ({ ...prev, search: e.target.value, page: 0 }));
  };

  const handlePageChange = (_: React.MouseEvent | null, newPage: number) => {
    setProductsLibraryQuery((prev) => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductsLibraryQuery((prev) => ({
      ...prev,
      rowsPerPage: parseInt(e.target.value, 10),
      page: 0,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      PaperProps={{
        sx: { direction: "rtl", height: fullScreen ? "100%" : "80vh" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          اختيار المنتجات المشابهة
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="البحث بالاسم أو الكود..."
          value={productsLibraryQuery.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          size="small"
          sx={{ mb: 2 }}
        />

        {productsLibrary.loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : productsLibrary.items.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">لا توجد منتجات</Typography>
          </Box>
        ) : (
          <Grid container spacing={1.5}>
            {productsLibrary.items.map((product) => {
              const isSelected = selectedSimilarProductIdSet.has(product._id);
              const isCurrent = product._id === currentProductId;

              return (
                <Grid size={{ xs: 6, sm: 4 }} key={product._id}>
                  <Card
                    onClick={() => {
                      if (isCurrent) return;
                      onToggleProduct(product);
                    }}
                    sx={{
                      cursor: isCurrent ? "not-allowed" : "pointer",
                      opacity: isCurrent ? 0.4 : 1,
                      border: isSelected
                        ? `3px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      "&:hover": isCurrent
                        ? {}
                        : {
                            borderColor: theme.palette.primary.main,
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 12px ${theme.palette.primary.main}22`,
                          },
                      position: "relative",
                    }}
                  >
                    {(product as any).originalUrl || (product as any).imageIds?.length > 0 ? (
                      <CardMedia
                        component="img"
                        height="100"
                        image={(product as any).originalUrl || "/placeholder.png"}
                        alt={product.productName}
                        sx={{ objectFit: "cover", height: 100 }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 100,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: theme.palette.action.hover,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          بدون صورة
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        noWrap
                        sx={{ display: "block", lineHeight: 1.2 }}
                      >
                        {product.productName || "—"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap>
                        {product.productCode}
                      </Typography>
                      {product.category && (
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{ mt: 0.5, fontSize: "0.65rem", height: 20 }}
                        />
                      )}
                    </CardContent>
                    {isSelected && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 4,
                          left: 4,
                          zIndex: 2,
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ color: theme.palette.secondary.main, fontSize: 24 }}
                        />
                      </Box>
                    )}
                    {isCurrent && (
                      <Chip
                        label="المنتج الحالي"
                        size="small"
                        color="warning"
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          fontSize: "0.6rem",
                          height: 20,
                        }}
                      />
                    )}
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        <TablePagination
          component="div"
          count={productsLibrary.total}
          page={productsLibraryQuery.page}
          onPageChange={handlePageChange}
          rowsPerPage={productsLibraryQuery.rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[6, 12, 24]}
          labelRowsPerPage="منتجات لكل صفحة"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
          sx={{ borderTop: `1px solid ${theme.palette.divider}`, mt: 1 }}
        />
      </DialogContent>

      <DialogActions
        sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          {selectedSimilarProductIdSet.size} منتج مشابه محدد
        </Typography>
        <Button onClick={onClose}>إلغاء</Button>
        <Button variant="contained" onClick={onClose}>
          تأكيد الاختيار
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimilarProductsSelectionDialog;
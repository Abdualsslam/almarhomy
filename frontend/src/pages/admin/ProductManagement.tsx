import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  TablePagination,
  Alert,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useProductManagement, ProductItem } from "../../hooks/useProductManagement";
import ProductTable from "../../components/admin/ProductTable";
import ProductFilters from "../../components/admin/ProductFilters";
import ProductFormDialog from "../../components/admin/ProductFormDialog";
import DeleteProductDialog from "../../components/admin/DeleteProductDialog";

import PageTransition from "../../components/PageTransition";

export default function ProductManagement() {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    products, loading, page, setPage, rowsPerPage, setRowsPerPage, totalCount,
    search, setSearch, filters, setFilters, open, setOpen, editingProduct, form, setForm,
    tagInput, setTagInput, selectedImages, selectedImagesLoading,
    saving, error, setError,
    categories, parentCategories, subcategoryOptions, deleteDialog, setDeleteDialog,
    selectedSimilarProducts, selectedSimilarProductsLoading,
    handleOpen, handleSave, handleFormChange
  } = useProductManagement();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleFilterChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [key]: e.target.value }));
    setPage(0);
  };

  const handleDeleteClick = (product: ProductItem) => {
    setDeleteDialog({ open: true, id: product._id, name: product.productName || "", loading: false });
  };

  // Helper functions for variants (needed because they are complex state)
  const handleAddVariant = () => {
    setForm(prev => ({ ...prev, variants: [...prev.variants, { name: "", values: [""] }] }));
  };
  const handleRemoveVariant = (idx: number) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== idx) }));
  };
  const handleVariantNameChange = (idx: number, val: string) => {
    setForm(prev => {
        const next = [...prev.variants];
        next[idx].name = val;
        return { ...prev, variants: next };
    });
  };
  const handleVariantValueChange = (vIdx: number, valIdx: number, val: string) => {
    setForm(prev => {
        const next = [...prev.variants];
        next[vIdx].values[valIdx] = val;
        return { ...prev, variants: next };
    });
  };
  const handleAddVariantValue = (vIdx: number) => {
    setForm(prev => {
        const next = [...prev.variants];
        next[vIdx].values.push("");
        return { ...prev, variants: next };
    });
  };
  const handleRemoveVariantValue = (vIdx: number, valIdx: number) => {
    setForm(prev => {
        const next = [...prev.variants];
        next[vIdx].values = next[vIdx].values.filter((_, i) => i !== valIdx);
        return { ...prev, variants: next };
    });
  };

  // Tags
  const handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
        setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
        setTagInput("");
    }
  };
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
    }
  };

  return (
    <PageTransition>
      <Box sx={{ mb: 6 }}>
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={3}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              {t('admin.products.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              {t('admin.products.subtitle')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
            className="hover-lift"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.8,
              fontSize: "1rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {t('admin.products.new_product')}
          </Button>
        </Stack>
      </Box>

      <ProductFilters 
        search={search} 
        onSearchChange={handleSearchChange} 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        categories={categories} 
      />

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

      <Card 
        elevation={0}
        className={theme.palette.mode === 'dark' ? 'glass' : 'glass-light'}
        sx={{ borderRadius: 5, overflow: "hidden", border: `1px solid ${theme.palette.divider}` }}
      >
        <ProductTable 
          products={products} 
          loading={loading} 
          rowsPerPage={rowsPerPage} 
          onEdit={handleOpen} 
          onDelete={handleDeleteClick} 
        />
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 20, 50]}
          labelRowsPerPage="منتجات لكل صفحة"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} من ${count}`}
          sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
        />
      </Card>

      <ProductFormDialog
        open={open}
        onClose={() => setOpen(false)}
        editingProduct={editingProduct}
        form={form}
        onFormChange={handleFormChange}
        categories={categories}
        parentCategories={parentCategories}
        subcategoryOptions={subcategoryOptions}
        onAddVariant={handleAddVariant}
        onRemoveVariant={handleRemoveVariant}
        onVariantNameChange={handleVariantNameChange}
        onVariantValueChange={handleVariantValueChange}
        onAddVariantValue={handleAddVariantValue}
        onRemoveVariantValue={handleRemoveVariantValue}
        tagInput={tagInput}
        onTagInputChange={(e) => setTagInput(e.target.value)}
        onTagKeyDown={handleTagKeyDown}
        onDeleteTag={(tag) => setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}
        selectedImages={selectedImages}
        selectedImagesLoading={selectedImagesLoading}
        onOpenImageDialog={() => { /* Need to implement ImageSelectionDialog */ }}
        onRemoveSelectedImage={() => { /* Implement */ }}
        selectedSimilarProducts={selectedSimilarProducts}
        selectedSimilarProductsLoading={selectedSimilarProductsLoading}
        onOpenSimilarProductsDialog={() => { /* Implement */ }}
        onRemoveSelectedSimilarProduct={() => { /* Implement */ }}
        saving={saving}
        error={error}
        onSave={handleSave}
      />

      <DeleteProductDialog 
        state={deleteDialog} 
        onClose={() => setDeleteDialog(prev => ({ ...prev, open: false }))}
        onConfirm={async () => {
            // Delete logic...
        }}
      />
    </PageTransition>
  );
}
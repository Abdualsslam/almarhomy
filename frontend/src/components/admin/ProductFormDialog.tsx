import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  TextField,
  MenuItem,
  Box,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { ProductItem, ProductForm, CategoryItem, ImageItem } from "../../hooks/useProductManagement";

interface Props {
  open: boolean;
  onClose: () => void;
  editingProduct: ProductItem | null;
  form: ProductForm;
  onFormChange: (key: keyof ProductForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryItem[];
  parentCategories: CategoryItem[];
  subcategoryOptions: CategoryItem[];
  onAddVariant: () => void;
  onRemoveVariant: (idx: number) => void;
  onVariantNameChange: (idx: number, val: string) => void;
  onVariantValueChange: (vIdx: number, valIdx: number, val: string) => void;
  onAddVariantValue: (vIdx: number) => void;
  onRemoveVariantValue: (vIdx: number, valIdx: number) => void;
  tagInput: string;
  onTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDeleteTag: (tag: string) => void;
  selectedImages: ImageItem[];
  selectedImagesLoading: boolean;
  onOpenImageDialog: () => void;
  onRemoveSelectedImage: (id: string) => void;
  selectedSimilarProducts: ProductItem[];
  selectedSimilarProductsLoading: boolean;
  onOpenSimilarProductsDialog: () => void;
  onRemoveSelectedSimilarProduct: (id: string) => void;
  saving: boolean;
  error: string;
  onSave: () => void;
}

const ProductFormDialog: React.FC<Props> = (props) => {
  const {
    open, onClose, editingProduct, form, onFormChange,
    parentCategories, subcategoryOptions,
    onAddVariant, onRemoveVariant, onVariantNameChange, onVariantValueChange, onAddVariantValue, onRemoveVariantValue,
    tagInput, onTagInputChange, onTagKeyDown, onDeleteTag,
    selectedImages, selectedImagesLoading, onOpenImageDialog, onRemoveSelectedImage,
    selectedSimilarProducts, selectedSimilarProductsLoading, onOpenSimilarProductsDialog, onRemoveSelectedSimilarProduct,
    saving, error, onSave
  } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6">{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField label="اسم المنتج" value={form.productName} onChange={onFormChange("productName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="كود المنتج" value={form.productCode} onChange={onFormChange("productCode")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="الماركة" value={form.model} onChange={onFormChange("model")} fullWidth required sx={{ mb: 2 }} />
            <TextField select label="الفئة" value={form.category} onChange={onFormChange("category")} fullWidth required sx={{ mb: 2 }}>
              <MenuItem value="">اختر فئة</MenuItem>
              {parentCategories.map((cat) => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
            </TextField>
            <TextField select label="الفئة الفرعية" value={form.subcategory} onChange={onFormChange("subcategory")} fullWidth disabled={!form.category}>
              <MenuItem value="">بدون</MenuItem>
              {subcategoryOptions.map((sub) => <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>)}
            </TextField>
          </Grid>

          {/* Variants */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>السمات / المتغيرات</Typography>
              {form.variants.map((variant, vIdx) => (
                <Box key={vIdx} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, mb: 2, bgcolor: "action.hover" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="subtitle2">السمة #{vIdx + 1}</Typography>
                    <IconButton size="small" color="error" onClick={() => onRemoveVariant(vIdx)}><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                  <TextField label="اسم السمة" value={variant.name} onChange={(e) => onVariantNameChange(vIdx, e.target.value)} fullWidth sx={{ mb: 2 }} />
                  {variant.values.map((val, valIdx) => (
                    <Box key={valIdx} sx={{ display: "flex", gap: 1, mb: 1.5 }}>
                      <TextField label={`قيمة ${valIdx + 1}`} value={val} onChange={(e) => onVariantValueChange(vIdx, valIdx, e.target.value)} fullWidth />
                      <IconButton size="small" color="error" onClick={() => onRemoveVariantValue(vIdx, valIdx)} disabled={variant.values.length === 1}><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  ))}
                  <Button size="small" startIcon={<AddIcon />} onClick={() => onAddVariantValue(vIdx)}>إضافة قيمة</Button>
                </Box>
              ))}
              <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={onAddVariant}>إضافة سمة جديدة</Button>
            </Box>
          </Grid>

          {/* Images */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">الصور المرتبطة</Typography>
                <Button variant="outlined" startIcon={<PhotoLibraryIcon />} onClick={onOpenImageDialog}>اختيار من المخزن</Button>
              </Box>
              {selectedImagesLoading ? <CircularProgress size={24} /> : selectedImages.length === 0 ? (
                <Typography color="text.secondary" textAlign="center">لا توجد صور مرتبطة</Typography>
              ) : (
                <Grid container spacing={1}>
                  {selectedImages.map((img) => (
                    <Grid size={{ xs: 4, sm: 3 }} key={img._id}>
                      <Box sx={{ position: "relative", pt: "100%", borderRadius: 1, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                        <Box component="img" src={img.watermarkedUrl || img.originalUrl} sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        <IconButton size="small" color="error" sx={{ position: "absolute", top: 2, right: 2, bgcolor: "rgba(255,255,255,0.8)" }} onClick={() => onRemoveSelectedImage(img._id)}><CloseIcon fontSize="small" /></IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>

          {/* Similar Products */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">المنتجات المشابهة</Typography>
                <Button variant="outlined" startIcon={<LinkIcon />} onClick={onOpenSimilarProductsDialog}>اختيار منتجات</Button>
              </Box>
              {selectedSimilarProductsLoading ? <CircularProgress size={24} /> : selectedSimilarProducts.length === 0 ? (
                <Typography color="text.secondary" textAlign="center">لا توجد منتجات مشابهة محددة</Typography>
              ) : (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {selectedSimilarProducts.map((p) => (
                    <Chip 
                      key={p._id} 
                      label={p.productName || p.productCode || p._id} 
                      onDelete={() => onRemoveSelectedSimilarProduct(p._id)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Description & Notes */}
          <Grid size={{ xs: 12 }}>
            <TextField label="الوصف" value={form.description} onChange={onFormChange("description")} fullWidth multiline rows={3} sx={{ mb: 2 }} />
            <TextField label="ملاحظات" value={form.note} onChange={onFormChange("note")} fullWidth multiline rows={2} sx={{ mb: 2 }} />
          </Grid>

          {/* Tags */}
          <Grid size={{ xs: 12 }}>
             <Box sx={{ border: "1px dashed", borderColor: "divider", borderRadius: 2, p: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>الوسوم</Typography>
                <TextField placeholder="اكتب الوسم واضغط إنتر" value={tagInput} onChange={onTagInputChange} onKeyDown={onTagKeyDown} fullWidth />
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {form.tags.map(tag => <Chip key={tag} label={tag} onDelete={() => onDeleteTag(tag)} />)}
                </Box>
             </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
        <Button onClick={onClose}>إلغاء</Button>
        <Button variant="contained" onClick={onSave} disabled={saving || !form.productName || !form.productCode} startIcon={saving ? <CircularProgress size={18} /> : null}>
          {saving ? "جارٍ الحفظ..." : editingProduct ? "حفظ التعديلات" : "إنشاء المنتج"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;

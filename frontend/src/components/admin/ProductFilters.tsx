import React from "react";
import { Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { CategoryItem } from "../../hooks/useProductManagement";

interface Props {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: { category: string; model: string; hasImages: string };
  onFilterChange: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryItem[];
}

const ProductFilters: React.FC<Props> = ({ search, onSearchChange, filters, onFilterChange, categories }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          placeholder={t('admin.products.filters.search_placeholder')}
          value={search}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <TextField
          select
          fullWidth
          label={t('admin.products.filters.category')}
          value={filters.category}
          onChange={onFilterChange("category")}
        >
          <MenuItem value="">{t('admin.products.filters.all_categories')}</MenuItem>
          {categories.filter(c => !c.parent).map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <TextField
          fullWidth
          label={t('admin.products.filters.model')}
          value={filters.model}
          onChange={onFilterChange("model")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <TextField
          select
          fullWidth
          label={t('admin.products.filters.images')}
          value={filters.hasImages}
          onChange={onFilterChange("hasImages")}
        >
          <MenuItem value="">{t('admin.products.filters.all')}</MenuItem>
          <MenuItem value="with">{t('admin.products.filters.with_images')}</MenuItem>
          <MenuItem value="without">{t('admin.products.filters.without_images')}</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ProductFilters;

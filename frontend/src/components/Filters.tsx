// src/components/Filters.tsx
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  Divider,
  SxProps,
  Theme,
} from "@mui/material";
import { useMemo, FC, ReactElement } from "react";
import { ClearAll } from "@mui/icons-material";
import { Category } from "../types/models.types";

interface FilterValues {
  category?: string;
  q?: string;
  [key: string]: string | undefined;
}

interface FiltersProps {
  categories?: Category[];
  values: FilterValues;
  onChange?: (payload: Partial<FilterValues>) => void;
  onReset?: () => void;
  sx?: SxProps<Theme>;
}

interface FieldLabels {
  [key: string]: string;
}

const fieldLabels: FieldLabels = {
  category: "الفئة",
};

const Filters: FC<FiltersProps> = ({
  categories = [],
  values,
  onChange,
  onReset,
  sx,
}): ReactElement => {

  const activeFilters = useMemo(() => {
    if (!values) return [];
    return Object.entries(values).filter(
      ([key, value]) =>
        value &&
        !["q"].includes(key) &&
        (Array.isArray(value) ? value.some(Boolean) : value !== "")
    );
  }, [values]);

  const handleChange = (payload: Partial<FilterValues>): void => {
    onChange?.(payload);
  };

  return (
    <Paper
      elevation={0}
      className="glass-light"
      sx={{
        p: 4,
        borderRadius: 5,
        position: "sticky",
        top: 100,
        border: "1px solid",
        borderColor: "divider",
        ...sx,
      }}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>
            التصفية
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            اكتشف المنتجات حسب الفئات
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, color: "primary.main" }}>
            الفئات الرئيسية
          </Typography>
          <Stack spacing={1.5}>
            <Chip
              label="جميع المنتجات"
              onClick={() => handleChange({ category: "" })}
              variant={!values?.category ? "filled" : "outlined"}
              color={!values?.category ? "primary" : "default"}
              sx={{
                borderRadius: 2,
                py: 2.5,
                fontSize: "0.95rem",
                fontWeight: !values?.category ? 700 : 500,
                justifyContent: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateX(-4px)",
                  bgcolor: !values?.category ? "primary.dark" : "action.hover",
                },
              }}
            />
            {categories.map((category) => {
              const isChild = !!category.parent;
              const isActive = values?.category === category._id;
              const parentName =
                category.parent && typeof category.parent === "object"
                  ? category.parent.name
                  : null;
              
              if (isChild && parentName) return null; // Hide subcategories for now or handle differently

              return (
                <Chip
                  key={category._id}
                  label={category.name}
                  onClick={() => handleChange({ category: category._id })}
                  variant={isActive ? "filled" : "outlined"}
                  color={isActive ? "primary" : "default"}
                  sx={{
                    borderRadius: 2,
                    py: 2.5,
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 700 : 500,
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(-4px)",
                      bgcolor: isActive ? "primary.dark" : "action.hover",
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Box>

        {!!activeFilters.length && (
          <>
            <Divider />
            <Stack spacing={2}>
              <Typography variant="subtitle1">
                الفلاتر النشطة
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {activeFilters.map(([field, value]) => {
                  const label = fieldLabels[field] || field;
                  return (
                    <Chip
                      key={field}
                      label={`${label}: ${value}`}
                      onDelete={() =>
                        handleChange({
                          [field]: typeof value === "string" ? "" : undefined,
                        })
                      }
                      sx={{
                        borderRadius: 3,
                      }}
                    />
                  );
                })}
              </Stack>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<ClearAll />}
                onClick={onReset}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                }}
              >
                مسح جميع الفلاتر
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default Filters;

import {
  Box,
  Typography,
  Chip,
  Button,
  Stack,
  Divider,
  useTheme,
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
}

const Filters: FC<FiltersProps> = ({
  categories = [],
  values,
  onChange,
  onReset,
}): ReactElement => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const activeFilters = useMemo(() => {
    if (!values) return [];
    return Object.entries(values).filter(
      ([key, value]) =>
        value &&
        !["q", "sortBy", "sortOrder"].includes(key) &&
        (Array.isArray(value) ? value.some(Boolean) : value !== "")
    );
  }, [values]);

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>
          التصفية
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
          اكتشف المنتجات حسب الفئات
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700, color: theme.palette.secondary.main, textTransform: "uppercase", letterSpacing: 1 }}>
          الفئات الرئيسية
        </Typography>
        <Stack spacing={1}>
          <Box
            onClick={() => onChange?.({ category: "" })}
            sx={{
              p: 1.5,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background: !values?.category ? `${theme.palette.primary.main}15` : "transparent",
              border: "1px solid",
              borderColor: !values?.category ? `${theme.palette.primary.main}66` : "transparent",
              color: !values?.category ? theme.palette.primary.main : theme.palette.text.secondary,
              "&:hover": {
                background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)",
                color: theme.palette.text.primary
              }
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: !values?.category ? 700 : 500 }}>
              جميع المنتجات
            </Typography>
          </Box>
          {categories.map((category) => (
            <Box
              key={category._id}
              onClick={() => onChange?.({ category: category._id })}
              sx={{
                p: 1.5,
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: values?.category === category._id ? `${theme.palette.primary.main}15` : "transparent",
                border: "1px solid",
                borderColor: values?.category === category._id ? `${theme.palette.primary.main}66` : "transparent",
                color: values?.category === category._id ? theme.palette.primary.main : theme.palette.text.secondary,
                "&:hover": {
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)",
                  color: theme.palette.text.primary
                }
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: values?.category === category._id ? 700 : 500 }}>
                {category.name}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {!!activeFilters.length && (
        <>
          <Divider sx={{ borderColor: theme.palette.divider }} />
          <Stack spacing={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              الفلاتر النشطة
            </Typography>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {activeFilters.map(([field, value]) => (
                <Chip
                  key={field}
                  label={value}
                  onDelete={() => onChange?.({ [field]: "" })}
                  sx={{
                    borderRadius: "8px",
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                    "& .MuiChip-deleteIcon": { color: theme.palette.text.secondary }
                  }}
                />
              ))}
            </Stack>
            <Button
              variant="text"
              color="error"
              fullWidth
              startIcon={<ClearAll />}
              onClick={onReset}
              sx={{ borderRadius: "12px", py: 1 }}
            >
              مسح الكل
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Filters;

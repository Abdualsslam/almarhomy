// src/components/SearchBar.tsx
import { TextField, Box, InputAdornment, IconButton, SxProps, Theme, TextFieldProps, alpha, useTheme } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { useState, useEffect, useRef, FC, ReactElement } from "react";
import debounce from "lodash.debounce";

interface SearchBarProps {
  value?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

type SearchBarComponentProps = SearchBarProps & Omit<TextFieldProps, 'onChange' | 'value' | 'placeholder'>;

const SearchBar: FC<SearchBarComponentProps> = ({
  value = "",
  onSearch,
  placeholder,
  sx,
  ...textFieldProps
}): ReactElement => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>(value);
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  useEffect(() => {
    // انشئ الدالة المؤجلة (debounced)
    debounceRef.current = debounce((v: string) => {
      onSearch(v);
    }, 300);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [onSearch]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSearch = (v: string): void => {
    setInputValue(v);
    debounceRef.current?.(v);
  };

  const clearSearch = (): void => {
    setInputValue("");
    onSearch("");
  };

  return (
    <Box sx={sx}>
      <TextField
        fullWidth
        placeholder={placeholder || "ابحث هنا..."}
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="primary" fontSize="large" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                onClick={clearSearch}
                size="small"
                aria-label="مسح البحث"
                sx={{ "&:hover": { bgcolor: "action.hover" } }}
              >
                <Close fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 4,
            height: 64,
            fontSize: "1.1rem",
            bgcolor: "background.paper",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover": {
              bgcolor: "background.paper",
              "& fieldset": {
                borderColor: "primary.main",
                opacity: 0.5,
              },
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
              "& fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
          },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

export default SearchBar;

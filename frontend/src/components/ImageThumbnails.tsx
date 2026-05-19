import React from "react";
import { Box, Stack, alpha } from "@mui/material";
import { ProductImage } from "../types/models.types";

interface Props {
  images: ProductImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const ImageThumbnails: React.FC<Props> = ({ images, selectedIndex, onSelect }) => {
  if (images.length <= 1) return null;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        mt: 2,
        overflowX: "auto",
        pb: 1,
        "&::-webkit-scrollbar": {
          height: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          borderRadius: 3,
        },
      }}
    >
      {images.map((image, index) => (
        <Box
          key={image._id}
          onClick={() => onSelect(index)}
          sx={{
            minWidth: { xs: 60, sm: 80 },
            height: { xs: 60, sm: 80 },
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
            border: "2px solid",
            borderColor: selectedIndex === index ? "primary.main" : "transparent",
            transition: "all 0.2s ease",
            opacity: selectedIndex === index ? 1 : 0.6,
            "&:hover": {
              opacity: 1,
              borderColor: selectedIndex === index ? "primary.main" : "divider",
            },
            bgcolor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0.5,
          }}
        >
          <Box
            component="img"
            src={image.watermarkedUrl || image.originalUrl}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default ImageThumbnails;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Breadcrumbs,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
  Link as LinkIcon,
} from "@mui/icons-material";
import { ImageItem, LibraryState, QueryState } from "../../hooks/useProductManagement";
import { RealFolder } from "../../types/api.types";

interface ImageSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  imageLibrary: LibraryState<ImageItem>;
  imageLibraryQuery: QueryState;
  setImageLibraryQuery: React.Dispatch<React.SetStateAction<QueryState>>;
  folders: RealFolder[];
  breadcrumbs: { id: string | null; name: string }[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  selectedImageIdSet: Set<string>;
  onToggleImage: (image: ImageItem) => void;
  editingProductId?: string;
}

const ImageSelectionDialog: React.FC<ImageSelectionDialogProps> = ({
  open,
  onClose,
  imageLibrary,
  imageLibraryQuery,
  setImageLibraryQuery,
  folders,
  breadcrumbs,
  currentFolderId,
  setCurrentFolderId,
  selectedImageIdSet,
  onToggleImage,
  editingProductId,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageLibraryQuery((prev) => ({ ...prev, search: e.target.value, page: 0 }));
  };

  const handleAssignedFilterChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const assignedValues: Array<string | undefined> = [undefined, "unassigned", "assigned"];
    setImageLibraryQuery((prev) => ({
      ...prev,
      assigned: assignedValues[newValue] || "all",
      page: 0,
    }));
  };

  const handleNavigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId);
    setImageLibraryQuery((prev) => ({ ...prev, search: "", page: 0 }));
  };

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
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
          اختيار الصور من المكتبة
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          placeholder="البحث في الصور..."
          value={imageLibraryQuery.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
          size="small"
        />

        <Tabs value={tabValue} onChange={handleAssignedFilterChange} variant="fullWidth">
          <Tab label="الكل" />
          <Tab label="غير مرتبطة" />
          <Tab label="مرتبطة" />
        </Tabs>

        {!imageLibraryQuery.search && folders.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Breadcrumbs separator="/">
              {breadcrumbs.map((crumb) => (
                <Chip
                  key={crumb.id ?? "root"}
                  label={crumb.name}
                  size="small"
                  onClick={() => handleNavigateToFolder(crumb.id)}
                  variant={currentFolderId === crumb.id ? "filled" : "outlined"}
                  color={currentFolderId === crumb.id ? "primary" : "default"}
                  clickable
                />
              ))}
            </Breadcrumbs>
          </Box>
        )}

        {!imageLibraryQuery.search && folders.length > 0 && (
          <Box sx={{ mb: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {folders.map((folder) => (
              <Chip
                key={folder._id}
                icon={<FolderIcon />}
                label={folder.name}
                onClick={() => handleNavigateToFolder(folder._id)}
                variant="outlined"
                clickable
              />
            ))}
          </Box>
        )}

        {imageLibrary.loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : imageLibrary.items.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">لا توجد صور</Typography>
          </Box>
        ) : (
          <Grid container spacing={1.5}>
            {imageLibrary.items.map((img) => {
              const isSelected = selectedImageIdSet.has(img._id);
              const imgProductId = img.productId as string | null | undefined;
              const isLinkedToOther =
                imgProductId && imgProductId !== editingProductId && !isSelected;

              return (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={img._id}>
                  <Box
                    onClick={() => {
                      if (isLinkedToOther) return;
                      onToggleImage(img);
                    }}
                    sx={{
                      position: "relative",
                      pt: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      border: isSelected
                        ? `3px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                      cursor: isLinkedToOther ? "not-allowed" : "pointer",
                      opacity: isLinkedToOther ? 0.5 : 1,
                      transition: "all 0.2s ease",
                      "&:hover": isLinkedToOther
                        ? {}
                        : {
                            borderColor: theme.palette.primary.main,
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 12px ${theme.palette.primary.main}22`,
                          },
                    }}
                  >
                    <Box
                      component="img"
                      src={img.watermarkedUrl || img.originalUrl}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
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
                          sx={{ color: theme.palette.secondary.main, fontSize: 28 }}
                        />
                      </Box>
                    )}
                    {isLinkedToOther && (
                      <Chip
                        icon={<LinkIcon />}
                        label="مرتبطة"
                        size="small"
                        color="warning"
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          right: 4,
                          zIndex: 2,
                          fontSize: "0.65rem",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>

      <DialogActions
        sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          {selectedImageIdSet.size} صورة مختارة
        </Typography>
        <Button onClick={onClose}>إلغاء</Button>
        <Button variant="contained" onClick={handleConfirm}>
          تأكيد الاختيار
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageSelectionDialog;
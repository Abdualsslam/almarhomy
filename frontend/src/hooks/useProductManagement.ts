import { useState, useCallback, useEffect, useMemo, ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
  fetchImages,
  getFolderContents,
} from "../api/admin";
import { RealFolder } from "../types/api.types";
import { Category } from "../types/models.types";

export interface FormVariant {
  name: string;
  values: string[];
}

export interface ProductForm {
  productName: string;
  productCode: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  note: string;
  tags: string[];
  variants: FormVariant[];
}

export interface ImageItem {
  _id: string;
  originalUrl?: string;
  watermarkedUrl?: string;
  productName?: string;
  productCode?: string;
  productId?: string;
  [key: string]: unknown;
}

export interface ProductItem {
  _id: string;
  productName?: string;
  productCode?: string;
  model?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  note?: string;
  tags?: string[];
  variants?: FormVariant[];
  imageIds?: string[];
  similarProductIds?: string[];
  imageCount?: number;
  [key: string]: unknown;
}

export interface CategoryItem extends Category {
  parent?: { _id: string; name: string } | null;
}

export interface DeleteDialogState {
  open: boolean;
  id: string | null;
  name: string;
  loading: boolean;
}

export interface LibraryState<T> {
  items: T[];
  loading: boolean;
  total: number;
}

export interface QueryState {
  page: number;
  rowsPerPage: number;
  search: string;
  assigned?: string;
}

const getDefaultForm = (): ProductForm => ({
  productName: "",
  productCode: "",
  model: "",
  category: "",
  subcategory: "",
  description: "",
  note: "",
  tags: [],
  variants: [],
});

export const useProductManagement = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [withoutImagesCount, setWithoutImagesCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    model: "",
    hasImages: searchParams.get("hasImages") || "",
  });
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [form, setForm] = useState<ProductForm>(getDefaultForm);
  const [tagInput, setTagInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [selectedImagesLoading, setSelectedImagesLoading] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // Image Library state
  const [imageLibrary, setImageLibrary] = useState<LibraryState<ImageItem>>({
    items: [],
    loading: false,
    total: 0,
  });
  const [imageLibraryQuery, setImageLibraryQuery] = useState<QueryState>({
    page: 0,
    rowsPerPage: 6,
    search: "",
    assigned: "all",
  });

  // Folder navigation state
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<RealFolder[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: "الملفات" },
  ]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    id: null,
    name: "",
    loading: false,
  });

  // Similar products state
  const [selectedSimilarProducts, setSelectedSimilarProducts] = useState<ProductItem[]>([]);
  const [selectedSimilarProductsLoading, setSelectedSimilarProductsLoading] = useState(false);
  const [similarProductsDialogOpen, setSimilarProductsDialogOpen] = useState(false);
  const [productsLibrary, setProductsLibrary] = useState<LibraryState<ProductItem>>({
    items: [],
    loading: false,
    total: 0,
  });
  const [productsLibraryQuery, setProductsLibraryQuery] = useState<Omit<QueryState, "assigned">>({
    page: 0,
    rowsPerPage: 6,
    search: "",
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = (await fetchProducts({
        page: page + 1,
        limit: rowsPerPage,
        q: search,
        category: filters.category || undefined,
        model: filters.model || undefined,
        hasImages:
          filters.hasImages === ""
            ? undefined
            : filters.hasImages === "with"
              ? "true"
              : "false",
      })) as any;

      const items = Array.isArray(res.items) ? res.items : [];
      const totalItems = res.totalItems || res.total || 0;

      if (items.length === 0 && totalItems > 0 && page > 0) {
        setPage((prev) => Math.max(prev - 1, 0));
        return;
      }

      setProducts(items as ProductItem[]);
      setTotalCount(totalItems);
      setWithoutImagesCount(res.withoutImagesCount || 0);
    } catch (err: unknown) {
      console.error(err);
      setError("فشل في تحميل المنتجات. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }, [filters, page, rowsPerPage, search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const loadImageLibrary = useCallback(async () => {
    if (!imageDialogOpen) return;
    setImageLibrary((prev) => ({ ...prev, loading: true }));
    try {
      if (imageLibraryQuery.search) {
        const res = await fetchImages({
          page: imageLibraryQuery.page + 1,
          limit: imageLibraryQuery.rowsPerPage,
          search: imageLibraryQuery.search,
          assigned:
            imageLibraryQuery.assigned === "all"
              ? undefined
              : imageLibraryQuery.assigned === "assigned"
                ? true
                : false,
        });
        setImageLibrary({
          items: (res.items || []) as unknown as ImageItem[],
          loading: false,
          total: res.totalItems || res.total || 0,
        });
        setFolders([]);
        return;
      }
      const folderId = currentFolderId || "root";
      const res = await getFolderContents(folderId);
      setFolders(res.folders);
      setImageLibrary({
        items: (res.images || []) as unknown as ImageItem[],
        loading: false,
        total: res.images?.length || 0,
      });
      setBreadcrumbs(res.breadcrumbs);
    } catch (err) {
      console.error("Failed to load images", err);
      setImageLibrary((prev) => ({ ...prev, loading: false }));
    }
  }, [imageDialogOpen, imageLibraryQuery, currentFolderId]);

  useEffect(() => {
    loadImageLibrary();
  }, [loadImageLibrary]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCategories({ page: 1, limit: 1000 });
        setCategories((res.items || []) as CategoryItem[]);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    })();
  }, []);

  const parentCategories = useMemo(
    () => categories.filter((cat) => !cat.parent),
    [categories]
  );

  const subcategoryOptions = useMemo(
    () =>
      categories.filter(
        (cat) => cat.parent && cat.parent._id === form.category
      ),
    [categories, form.category]
  );

  const selectedImageIdSet = useMemo(
    () => new Set(selectedImages.map((image) => image._id)),
    [selectedImages]
  );

  const selectedSimilarProductIdSet = useMemo(
    () => new Set(selectedSimilarProducts.map((product) => product._id)),
    [selectedSimilarProducts]
  );

  const fetchSelectedImagesMeta = useCallback(async (ids: string[]) => {
    if (!ids || ids.length === 0) {
      setSelectedImages([]);
      return;
    }
    setSelectedImagesLoading(true);
    try {
      const res = await fetchImages({
        ids: ids.join(","),
        limit: ids.length,
        page: 1,
      });
      const items = Array.isArray(res.items) ? res.items : [];
      const map = new Map(items.map((item: any) => [item._id, item as ImageItem]));
      setSelectedImages(ids.map((id) => map.get(id) || ({ _id: id } as ImageItem)));
    } catch (err) {
      console.error("Failed to load selected images", err);
      setSelectedImages(ids.map((id) => ({ _id: id } as ImageItem)));
    } finally {
      setSelectedImagesLoading(false);
    }
  }, []);

  const loadProductsLibrary = useCallback(async () => {
    if (!similarProductsDialogOpen) return;
    setProductsLibrary((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetchProducts({
        page: productsLibraryQuery.page + 1,
        limit: productsLibraryQuery.rowsPerPage,
        q: productsLibraryQuery.search || undefined,
      });
      setProductsLibrary((prev) => ({
        ...prev,
        items: (res.items as unknown) as ProductItem[],
        total: res.totalItems || res.total || 0,
      }));
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setProductsLibrary((prev) => ({ ...prev, loading: false }));
    }
  }, [similarProductsDialogOpen, productsLibraryQuery]);

  useEffect(() => {
    loadProductsLibrary();
  }, [loadProductsLibrary]);

  const fetchSelectedSimilarProductsMeta = useCallback(async (ids: string[]) => {
    if (!ids || ids.length === 0) {
      setSelectedSimilarProducts([]);
      return;
    }
    setSelectedSimilarProductsLoading(true);
    try {
        const res = await fetchProducts({
          ids: ids.join(','),
          page: 1,
          limit: Math.min(ids.length, 100),
        });
        const items = Array.isArray(res.items) ? res.items : [];
        const map = new Map(items.map((item: any) => [item._id, item as ProductItem]));
        setSelectedSimilarProducts(ids.map(id => map.get(id) || ({ _id: id, productName: "منتج غير موجود" } as ProductItem)));
    } catch (err) {
      console.error("Failed to load similar products", err);
    } finally {
      setSelectedSimilarProductsLoading(false);
    }
  }, []);

  const handleFormChange = (key: keyof ProductForm) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setForm((prev) => {
      if (key === "category") return { ...prev, category: value, subcategory: "" };
      return { ...prev, [key]: value };
    });
  };

  const handleOpen = (product: ProductItem | null = null) => {
    setEditingProduct(product);
    if (!product) {
        setForm(getDefaultForm());
        setSelectedImages([]);
        setSelectedSimilarProducts([]);
    } else {
        const categoryId = categories.find(cat => !cat.parent && cat.name === product.category)?._id || "";
        const subcategoryId = categories.find(cat => cat.parent && cat.name === product.subcategory)?._id || "";
        setForm({
            productName: product.productName || "",
            productCode: product.productCode || "",
            model: product.model || "",
            category: categoryId,
            subcategory: subcategoryId,
            description: product.description || "",
            note: product.note || "",
            tags: Array.isArray(product.tags) ? product.tags.filter(Boolean) : [],
            variants: Array.isArray(product.variants) ? product.variants : [],
        });
        fetchSelectedImagesMeta(product.imageIds || []);
        fetchSelectedSimilarProductsMeta(product.similarProductIds || []);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const payload = {
        ...form,
        imageIds: selectedImages.map(img => img._id),
        similarProductIds: selectedSimilarProducts.map(p => p._id),
    };
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, payload);
      } else {
        await createProduct(payload);
      }
      setOpen(false);
      loadProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "فشل في حفظ المنتج");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenImageDialog = () => {
    setImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setImageDialogOpen(false);
  };

  const handleToggleSelectedImage = (image: ImageItem) => {
    setSelectedImages((prev) => {
      const exists = prev.some((item) => item._id === image._id);
      if (exists) return prev.filter((item) => item._id !== image._id);
      return [...prev, image];
    });
  };

  const handleRemoveSelectedImage = (id: string) => {
    setSelectedImages((prev) => prev.filter((image) => image._id !== id));
  };

  const handleOpenSimilarProductsDialog = () => {
    setSimilarProductsDialogOpen(true);
  };

  const handleCloseSimilarProductsDialog = () => {
    setSimilarProductsDialogOpen(false);
  };

  const handleToggleSelectedSimilarProduct = (product: ProductItem) => {
    if (editingProduct && product._id === editingProduct._id) return;
    setSelectedSimilarProducts((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) return prev.filter((item) => item._id !== product._id);
      return [...prev, product];
    });
  };

  const handleRemoveSelectedSimilarProduct = (id: string) => {
    setSelectedSimilarProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    setError("");
    try {
      await deleteProduct(deleteDialog.id, { detachImages: true });
      setDeleteDialog({ open: false, id: null, name: "", loading: false });
      await loadProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "فشل حذف المنتج");
      setDeleteDialog((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    products, loading, page, setPage, rowsPerPage, setRowsPerPage, totalCount, withoutImagesCount,
    search, setSearch, filters, setFilters, open, setOpen, editingProduct, form, setForm,
    tagInput, setTagInput, selectedImages, setSelectedImages, selectedImagesLoading,
    imageDialogOpen, setImageDialogOpen, imageLibrary, imageLibraryQuery, setImageLibraryQuery,
    currentFolderId, setCurrentFolderId, folders, breadcrumbs, saving, error, setError,
    categories, parentCategories, subcategoryOptions, deleteDialog, setDeleteDialog,
    selectedSimilarProducts, setSelectedSimilarProducts, selectedSimilarProductsLoading,
    similarProductsDialogOpen, setSimilarProductsDialogOpen, productsLibrary,
    productsLibraryQuery, setProductsLibraryQuery, loadProducts, handleOpen, handleSave,
    handleFormChange, selectedImageIdSet, selectedSimilarProductIdSet,
    handleOpenImageDialog, handleCloseImageDialog, handleToggleSelectedImage,
    handleRemoveSelectedImage, handleOpenSimilarProductsDialog, handleCloseSimilarProductsDialog,
    handleToggleSelectedSimilarProduct, handleRemoveSelectedSimilarProduct, handleConfirmDelete,
  };
};

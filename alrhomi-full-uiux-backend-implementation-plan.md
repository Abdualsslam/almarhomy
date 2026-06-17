# ملف التنفيذ الكامل — إعادة بناء هوية وواجهة وتجربة مستخدم مشروع المرحومي Alrhomi Catalog

## 0) الهدف العام

هذا الملف هو خطة تنفيذ عملية لكودكس لتطوير مشروع **Alrhomi Catalog** بناءً على نقطتين أساسيتين:

1. اعتماد هوية الشعار كما هي: **أزرق ملكي + أصفر ذهبي + أبيض + أسود** مع استخدام أحمر الشعار كتفصيل محدود.
2. عدم إخفاء أو حذف أي ميزة ناقصة إذا كانت تمثل وظيفة مطلوبة. المطلوب هو:
   - إذا كانت العملية موجودة في الباك إند: نربطها في الواجهة.
   - إذا كانت موجودة جزئيًا: نكمل الباك إند ثم نربط الواجهة.
   - إذا لم تكن موجودة: نضيفها في الباك إند ثم نربطها.

الهدف النهائي هو تحويل المشروع من واجهة تقنية عامة إلى **كتالوج تجاري احترافي لمعدات المطاعم والمطابخ والفنادق** مع لوحة إدارة عملية وموثوقة.

---

## 1) مبادئ تنفيذ إلزامية

### 1.1 ممنوع إخفاء النقص

لا تقم بإخفاء الأزرار غير الفعالة، ولا حذف الملفات الفارغة، ولا ترك تعليقات مثل:

```tsx
// TODO
// Implement
// Need to implement
```

بدل ذلك:

- أكمل الدوال.
- أنشئ الـ Dialog المطلوب.
- اربط API موجود.
- أضف API ناقص إذا لم يكن موجودًا.
- اعرض رسالة خطأ واضحة إذا فشلت العملية.

### 1.2 لا تغيّر منطق المشروع التجاري بدون داعٍ

المشروع ليس SaaS ولا تطبيقًا تقنيًا عامًا. هو كتالوج منتجات B2B/B2C، لذلك الأولوية لـ:

- وضوح المنتج.
- وضوح الصور.
- البحث والتصفية.
- زر واتساب مباشر.
- الثقة التجارية.
- لوحة إدارة تجعل المدير يعرف النواقص بسرعة.

### 1.3 لا تستخدم ألوان خارج الهوية إلا للضرورة

الألوان الرئيسية يجب أن تكون من الشعار:

- الأزرق الملكي.
- الأصفر الذهبي.
- الأبيض.
- الأسود.
- الأحمر فقط للتنبيه أو التفاصيل الصغيرة.

لا تستخدم cyan/teal كهوية رئيسية، ولا تجعل الواجهة شبيهة بتطبيق تقني عام.

---

## 2) الهوية البصرية المعتمدة من الشعار

### 2.1 لوحة الألوان

استخدم هذه القيم كبداية، ويمكن تعديلها قليلًا بعد اختبار التباين:

```css
:root {
  --brand-blue: #24458f;
  --brand-blue-dark: #15295f;
  --brand-blue-deep: #0d1b3d;

  --brand-yellow: #f4c400;
  --brand-yellow-dark: #d9a900;
  --brand-yellow-soft: #fff4bf;

  --brand-red: #b5152b;

  --brand-black: #050505;
  --brand-charcoal: #111827;
  --brand-white: #ffffff;

  --bg-page: #f7f7f5;
  --bg-section: #f3f4f6;
  --surface: #ffffff;
  --surface-soft: #fafafa;

  --text-main: #111827;
  --text-muted: #6b7280;
  --text-inverse: #ffffff;

  --border-soft: #e5e7eb;
  --border-strong: #cbd5e1;

  --whatsapp: #25d366;
  --danger: #b5152b;
}
```

### 2.2 نسبة استخدام الألوان

التوزيع الأفضل:

```text
60% أبيض / رمادي فاتح
25% أزرق الشعار
10% أصفر الشعار
5% أسود / أحمر محدود
```

### 2.3 استخدام الألوان

- الأزرق: الهيدر، الفوتر، عناوين الأقسام، حدود نشطة، تفاصيل المنتج المهمة.
- الأصفر: أزرار القرار، CTA، شارات الفئات، تمييز الكود أو العروض.
- الأسود: Hero، الفوتر، المساحات الفخمة، الخلفيات الصناعية.
- الأحمر: تنبيه، خطأ، شارة “مميز” فقط عند الحاجة.
- الأبيض: صفحات الكتالوج وكروت المنتجات ولوحة الإدارة.

### 2.4 الاتجاه التصميمي

الاتجاه المعتمد:

```text
Industrial Premium Catalog / Digital Showroom
```

أي أن شكل الموقع يجب أن يوحي بأنه:

- معرض معدات احترافي.
- شركة تجارية موثوقة.
- منتجات واضحة وقابلة للاستفسار.
- كتالوج لا يشتت العميل.

---

## 3) فحص العمليات الحالية وقرار التنفيذ

| العملية | حالة الباك إند | قرار التنفيذ |
|---|---|---|
| اختيار صور من مكتبة الوسائط للمنتج | موجود | ربط الواجهة فقط |
| إزالة صورة من المنتج | موجود عبر `PUT /products/:id` مع `imageIds` | ربط الواجهة فقط |
| اختيار منتجات مشابهة | موجود جزئيًا | إضافة فلتر `ids` في الباك إند ثم الربط |
| حذف المنتج | موجود لكن يمنع الحذف عند وجود صور | إضافة `detachImages=true` ثم الربط |
| حذف صورة من المكتبة | موجود | إضافة تنظيف مرجع الصورة من المنتج قبل حذف الوثيقة |
| `StatsCounter.tsx` فارغ | يحتاج بيانات | إضافة/استخدام إحصائيات عامة أو إكماله كمكوّن عام |
| `HomePageEnhanced.tsx` فارغ | ملف ناقص | إكماله أو جعله الصفحة الرئيسية الجديدة |
| أزرار غير فعالة في ProductManagement | الواجهة ناقصة | إكمال الـ handlers والحوارات |

---

## 4) المرحلة الأولى — تعديلات الباك إند

### 4.1 إضافة فلتر `ids` لقائمة المنتجات

#### الملفات

```text
backend/src/products/dto/product-query.dto.ts
backend/src/products/products.service.ts
frontend/src/types/api.types.ts
frontend/src/api/admin.ts
```

#### الهدف

نحتاج هذا الفلتر لاختيار المنتجات المشابهة بطريقة صحيحة بدل جلب 1000 منتج والبحث محليًا.

#### تعديل `ProductQueryDto`

أضف:

```ts
@ApiPropertyOptional({
  description: 'قائمة معرّفات منتجات مفصولة بفواصل',
  example: 'id1,id2,id3',
})
@IsOptional()
@IsString()
ids?: string;
```

#### تعديل `ProductsService.findAll()`

داخل تفكيك `queryDto` أضف `ids`:

```ts
const {
  page = 1,
  limit = 24,
  q,
  category,
  model,
  productCode,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  ids,
} = queryDto;
```

بعد إنشاء `baseFilter` أضف:

```ts
if (ids) {
  const idList = ids
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const objectIds = idList.map((id) => {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('أحد معرّفات المنتجات غير صالح');
    }
    return new Types.ObjectId(id);
  });

  baseFilter._id = { $in: objectIds };
}
```

#### ملاحظات مهمة

- لا تجعل `ids` يتعارض مع البحث. إذا أرسلنا `ids` و`q` معًا، يجب أن يرجع المنتجات التي تحقق الشرطين.
- هذا endpoint محمي أصلًا تحت `/products` ويستخدم JWT.

---

### 4.2 تعديل حذف المنتج ليقبل فصل الصور بدل منع الحذف

#### الملفات

```text
backend/src/products/products.controller.ts
backend/src/products/products.service.ts
frontend/src/api/admin.ts
frontend/src/pages/admin/ProductManagement.tsx
frontend/src/components/admin/DeleteProductDialog.tsx
```

#### الوضع الحالي

الباك إند يمنع حذف المنتج إذا كان لديه صور مرتبطة:

```ts
if (imageCount > 0) {
  throw new BadRequestException({
    error: 'لا يمكن حذف المنتج لأنه يحتوي على صور مرتبطة',
    imageCount,
  });
}
```

#### القرار الجديد

لا نحذف الصور من S3 ولا نحذفها من مكتبة الوسائط عند حذف المنتج. نفصلها فقط:

```http
DELETE /products/:id?detachImages=true
```

#### تعديل `ProductsController`

استورد `Query` إذا كان موجودًا فهو موجود حاليًا في الملف، ثم عدّل الدالة:

```ts
@Delete(':id')
async remove(
  @Param('id') id: string,
  @Query('detachImages') detachImages?: string,
) {
  return this.productsService.remove(id, detachImages === 'true');
}
```

#### تعديل `ProductsService.remove()`

استبدل الدالة الحالية بهذه الفكرة:

```ts
async remove(id: string, detachImages = false) {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException('معرّف غير صالح');
  }

  const product = await this.productModel.findById(id).exec();
  if (!product) {
    throw new NotFoundException('المنتج غير موجود');
  }

  const productObjectId = new Types.ObjectId(id);
  const imageCount = await this.imageModel
    .countDocuments({ product: productObjectId })
    .exec();

  if (imageCount > 0 && !detachImages) {
    throw new BadRequestException({
      error: 'لا يمكن حذف المنتج لأنه يحتوي على صور مرتبطة',
      imageCount,
      actionRequired: 'أرسل detachImages=true لفصل الصور قبل حذف المنتج',
    });
  }

  if (detachImages) {
    await this.imageModel
      .updateMany({ product: productObjectId }, { $set: { product: null } })
      .exec();
  }

  await this.productModel
    .updateMany(
      { similarProducts: productObjectId },
      { $pull: { similarProducts: productObjectId } },
    )
    .exec();

  await this.productModel.findByIdAndDelete(productObjectId).exec();

  return {
    message: detachImages
      ? 'تم حذف المنتج وفصل صوره من مكتبة الوسائط'
      : 'تم حذف المنتج',
  };
}
```

#### لماذا هذا أفضل؟

- لا نخفي زر الحذف.
- لا نفقد الصور.
- تبقى الصور في مكتبة الوسائط غير مرتبطة.
- لا تبقى المنتجات الأخرى تشير إلى منتج محذوف في `similarProducts`.

---

### 4.3 تنظيف مرجع الصورة من المنتج عند حذف الصورة

#### الملفات

```text
backend/src/admin/admin-images/admin-images.service.ts
```

#### الوضع الحالي

`AdminImagesService.remove()` يحذف الصورة من S3 ثم يحذف وثيقة الصورة من MongoDB، لكنه لا يزيل معرّف الصورة من حقل `Product.images` إن كان موجودًا.

#### المطلوب

قبل `await img.deleteOne()` أضف:

```ts
if (img.product) {
  await this.productModel
    .updateOne(
      { _id: img.product },
      { $pull: { images: img._id } },
    )
    .exec();
}
```

#### السبب

حتى لا تبقى مراجع صور محذوفة داخل المنتج.

---

### 4.4 إحصائيات عامة للصفحة الرئيسية و `StatsCounter`

#### القرار

لا نترك `StatsCounter.tsx` فارغًا. أمامنا خياران:

1. إما تحويله إلى مكوّن يستقبل بيانات static من الصفحة.
2. أو الأفضل إضافة endpoint عام بسيط:

```http
GET /public/site-stats
```

#### المقترح الأفضل

إنشاء endpoint عام يعرض بيانات غير حساسة:

```json
{
  "totalProducts": 120,
  "totalCategories": 14,
  "productsWithImages": 100
}
```

#### ملفات مقترحة

```text
backend/src/public/public-stats.controller.ts
backend/src/public/public-stats.service.ts
backend/src/public/public.module.ts
```

أو إضافته داخل module مناسب إن كان هناك تنظيم قائم للـ public controllers.

#### لا تعرض بيانات حساسة

لا تعرض:

- عدد المستخدمين الإداريين.
- jobs الداخلية.
- بيانات S3.
- إحصائيات إدارة تفصيلية.

---

## 5) المرحلة الثانية — إكمال عمليات لوحة إدارة المنتجات

### 5.1 تعديل API في الواجهة

#### الملف

```text
frontend/src/api/admin.ts
```

#### `fetchProducts`

أضف دعم:

```ts
ids?: string;
sortBy?: string;
sortOrder?: 'asc' | 'desc';
```

داخل `fetchProducts`:

```ts
if (ids) queryParams.ids = ids;
if (sortBy) queryParams.sortBy = sortBy;
if (sortOrder) queryParams.sortOrder = sortOrder;
```

#### `deleteProduct`

غيّرها إلى:

```ts
export const deleteProduct = async (
  id: string,
  options: { detachImages?: boolean } = {},
): Promise<void> => {
  return apiClient.delete<void>(`/products/${id}`, {
    params: options.detachImages ? { detachImages: true } : undefined,
  });
};
```

---

### 5.2 تعديل الأنواع

#### الملف

```text
frontend/src/types/api.types.ts
```

أضف في `ProductQueryParams`:

```ts
ids?: string;
sortBy?: string;
sortOrder?: 'asc' | 'desc';
```

وتأكد أن `FetchImagesParams` يدعم:

```ts
ids?: string;
assigned?: boolean;
```

---

### 5.3 إكمال `useProductManagement`

#### الملف

```text
frontend/src/hooks/useProductManagement.ts
```

#### المطلوب

أضف هذه handlers وأرجعها من hook:

```ts
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
```

#### تحسين جلب المنتجات المشابهة المختارة

استبدل منطق جلب 1000 منتج:

```ts
const res = await fetchProducts({ page: 1, limit: 1000 });
```

بالآتي:

```ts
const res = await fetchProducts({
  ids: ids.join(','),
  page: 1,
  limit: Math.min(ids.length, 100),
});
```

#### حذف المنتج

أضف handler:

```ts
const handleConfirmDelete = async () => {
  if (!deleteDialog.id) return;

  setDeleteDialog((prev) => ({ ...prev, loading: true }));
  setError('');

  try {
    await deleteProduct(deleteDialog.id, { detachImages: true });
    setDeleteDialog({ open: false, id: null, name: '', loading: false });
    await loadProducts();
  } catch (err: any) {
    setError(err.response?.data?.message || err.response?.data?.error || 'فشل حذف المنتج');
    setDeleteDialog((prev) => ({ ...prev, loading: false }));
  }
};
```

وأرجعه من hook.

---

### 5.4 إنشاء Dialog اختيار الصور

#### ملف جديد

```text
frontend/src/components/admin/ImageSelectionDialog.tsx
```

#### وظائفه

- فتح مكتبة الصور.
- البحث في الصور.
- فلترة الصور:
  - الكل.
  - غير مرتبطة.
  - مرتبطة.
- عرض المجلدات إذا كانت موجودة.
- دعم breadcrumbs.
- اختيار أكثر من صورة.
- تمييز الصور المختارة.
- زر تأكيد يغلق الـ Dialog فقط لأن الاختيار محفوظ في state.

#### Props مقترحة

```ts
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
}
```

#### UX مطلوب

- في سطح المكتب: Dialog عريض `maxWidth="lg"`.
- في الجوال: FullScreen Dialog أو Bottom Sheet.
- الصورة المختارة يظهر عليها:
  - إطار أزرق.
  - علامة صح صفراء.
- الصور المرتبطة بمنتج آخر يجب ألا تُختار إلا إذا الباك إند يسمح. حاليًا الباك إند يمنع ربط صورة مرتبطة بمنتج آخر، لذلك:
  - اعرضها مع شارة “مرتبطة”.
  - عطّل اختيارها إذا لم تكن من صور المنتج الحالي.

---

### 5.5 إنشاء Dialog اختيار المنتجات المشابهة

#### ملف جديد

```text
frontend/src/components/admin/SimilarProductsSelectionDialog.tsx
```

#### وظائفه

- البحث بالاسم أو الكود.
- عرض المنتجات كبطاقات صغيرة.
- إظهار صورة المنتج إن وجدت.
- إظهار اسم المنتج والكود والفئة.
- اختيار متعدد.
- منع اختيار المنتج الحالي كمنتج مشابه لنفسه.

#### Props مقترحة

```ts
interface SimilarProductsSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  productsLibrary: LibraryState<ProductItem>;
  productsLibraryQuery: Omit<QueryState, 'assigned'>;
  setProductsLibraryQuery: React.Dispatch<React.SetStateAction<Omit<QueryState, 'assigned'>>>;
  selectedSimilarProductIdSet: Set<string>;
  onToggleProduct: (product: ProductItem) => void;
  currentProductId?: string;
}
```

---

### 5.6 تعديل `ProductManagement.tsx`

#### الملف

```text
frontend/src/pages/admin/ProductManagement.tsx
```

استبدل الـ placeholders:

```tsx
onOpenImageDialog={() => { /* Need to implement ImageSelectionDialog */ }}
onRemoveSelectedImage={() => { /* Implement */ }}
onOpenSimilarProductsDialog={() => { /* Implement */ }}
onRemoveSelectedSimilarProduct={() => { /* Implement */ }}
onConfirm={async () => {
  // Delete logic...
}}
```

بـ handlers حقيقية من hook:

```tsx
onOpenImageDialog={handleOpenImageDialog}
onRemoveSelectedImage={handleRemoveSelectedImage}
onOpenSimilarProductsDialog={handleOpenSimilarProductsDialog}
onRemoveSelectedSimilarProduct={handleRemoveSelectedSimilarProduct}
...
onConfirm={handleConfirmDelete}
```

ثم أضف:

```tsx
<ImageSelectionDialog ... />
<SimilarProductsSelectionDialog ... />
```

---

## 6) المرحلة الثالثة — إعادة بناء الثيم والهوية

### 6.1 تعديل `theme.ts`

#### الملف

```text
frontend/src/theme.ts
```

#### المطلوب

استبدل الأزرق/السيان الحالي بألوان الشعار:

```ts
primary: {
  main: '#24458f',
  dark: '#15295f',
  light: '#3f5fa8',
  contrastText: '#ffffff',
},
secondary: {
  main: '#f4c400',
  dark: '#d9a900',
  light: '#fff4bf',
  contrastText: '#111827',
},
error: {
  main: '#b5152b',
},
background: {
  default: isDark ? '#050505' : '#f7f7f5',
  paper: isDark ? '#111827' : '#ffffff',
},
```

#### مهم

- لا تستخدم gradient أزرق/سيان في `MuiButton.containedPrimary`.
- استخدم زر أصفر أو أزرق واضح حسب المكان.
- قلل `backdropFilter` في الكروت. الكتالوج يحتاج كروت واضحة لا زجاجية.

#### زر رئيسي مقترح

```ts
containedPrimary: {
  background: '#24458f',
  color: '#ffffff',
  '&:hover': {
    background: '#15295f',
    transform: 'translateY(-1px)',
    boxShadow: '0 10px 24px rgba(36, 69, 143, 0.22)',
  },
},
containedSecondary: {
  background: '#f4c400',
  color: '#111827',
  '&:hover': {
    background: '#d9a900',
  },
},
```

---

### 6.2 تعديل `index.css`

#### الملف

```text
frontend/src/index.css
```

#### المطلوب

- استبدال tokens القديمة.
- لا تجعل `body` في الوضع الافتراضي بخلفية داكنة دائمًا.
- اجعل الخلفية العامة فاتحة للكتالوج.
- استخدم الداكن في أقسام محددة فقط.

#### CSS مقترح

```css
:root {
  --brand-blue: #24458f;
  --brand-blue-dark: #15295f;
  --brand-yellow: #f4c400;
  --brand-yellow-soft: #fff4bf;
  --brand-red: #b5152b;
  --brand-black: #050505;
  --bg-page: #f7f7f5;
  --surface: #ffffff;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-soft: #e5e7eb;
  --whatsapp: #25d366;
  --transition-smooth: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  background: var(--bg-page);
  color: var(--text-main);
}

.brand-section-dark {
  background:
    radial-gradient(circle at 20% 20%, rgba(244, 196, 0, 0.16), transparent 28%),
    linear-gradient(135deg, #050505 0%, #0d1b3d 52%, #15295f 100%);
  color: #ffffff;
}

.brand-card {
  background: var(--surface);
  border: 1px solid var(--border-soft);
  border-radius: 22px;
  box-shadow: 0 14px 35px rgba(17, 24, 39, 0.08);
}

.brand-card:hover {
  border-color: rgba(36, 69, 143, 0.32);
  box-shadow: 0 18px 45px rgba(36, 69, 143, 0.16);
}
```

---

## 7) المرحلة الرابعة — إعادة تصميم الواجهة العامة

### 7.1 الصفحة الرئيسية

#### الملفات

```text
frontend/src/pages/HomePage.tsx
frontend/src/pages/HomePageEnhanced.tsx
frontend/src/components/StatsCounter.tsx
frontend/src/components/CategoryShowcase.tsx
frontend/src/components/WhatsAppCTA.tsx
frontend/src/components/layout/SiteHeader.tsx
frontend/src/components/layout/SiteFooter.tsx
```

#### القرار

لا تترك `HomePageEnhanced.tsx` فارغًا.

أفضل حل:

- اجعل `HomePageEnhanced.tsx` هي الصفحة الجديدة الكاملة.
- عدّل routing في `App.tsx` لاستخدامها بدل `HomePage`.
- أو انقل التصميم الجديد إلى `HomePage.tsx` واجعل `HomePageEnhanced.tsx` يعيد تصديرها:

```ts
export { default } from './HomePage';
```

لكن الأفضل تنفيذ صفحة واحدة واضحة بدون ازدواجية.

#### Hero الجديد

المطلوب:

- خلفية داكنة صناعية بأزرق الشعار ولمسات صفراء.
- شعار أو شكل هندسي مستوحى من جانبي الشعار الأصفرين.
- عنوان واضح:

```text
تجهيزات المطاعم والمطابخ والفنادق في كتالوج واحد
```

- وصف:

```text
تصفح المنتجات، شاهد التفاصيل والصور، وأرسل استفسارك مباشرة عبر واتساب.
```

- بحث مباشر داخل Hero:
  - placeholder: `ابحث باسم المنتج أو الكود...`
  - عند Enter ينتقل إلى `/catalog?q=value`.

- CTAs:
  - زر أصفر: `تصفح الكتالوج`.
  - زر outlined: `تواصل عبر واتساب`.

#### أقسام الصفحة

رتب الصفحة هكذا:

1. Hero + Search.
2. شريط ثقة:
   - منتجات مصنفة.
   - صور واضحة.
   - استفسار مباشر.
   - تجهيز للمطاعم والفنادق.
3. الفئات الرئيسية.
4. أحدث المنتجات أو منتجات مختارة.
5. كيف تطلب؟
   - ابحث.
   - افتح التفاصيل.
   - تواصل عبر واتساب.
6. CTA نهائي.

---

### 7.2 كروت المنتجات الجديدة

#### ملف جديد مقترح

```text
frontend/src/components/ProductCard.tsx
```

أو تطوير `ImageCard.tsx` إذا كان يُستخدم فقط للمنتجات.

#### محتوى البطاقة

- صورة المنتج.
- شارة الفئة باللون الأصفر.
- اسم المنتج.
- كود المنتج.
- الموديل إن وجد.
- وصف قصير أو tags.
- زر:
  - `عرض التفاصيل`.
  - `استفسر واتساب`.

#### شكل البطاقة

- خلفية بيضاء.
- صورة داخل مساحة ثابتة النسبة `4/3` أو `1/1`.
- حدود ناعمة.
- Hover بسيط.
- لا تستخدم glass قوي.

#### حالات مهمة

إذا لا توجد صورة:

- لا تكسر البطاقة.
- اعرض placeholder به شعار/أيقونة منتج وألوان الهوية.
- لا تخفي المنتج.

---

### 7.3 صفحة الكتالوج

#### الملفات

```text
frontend/src/pages/CatalogPage.tsx
frontend/src/components/Filters.tsx
frontend/src/components/SearchBar.tsx
frontend/src/components/ProductCard.tsx
```

#### المطلوب

- Header داخلي:
  - عنوان: `كتالوج المنتجات`.
  - وصف قصير.
  - شريط بحث كبير.
- في سطح المكتب:
  - فلاتر جانبية sticky.
  - شبكة منتجات.
- في الجوال:
  - زر `الفلاتر` يفتح Bottom Sheet أو Drawer.
  - لا تزاحم المنتجات.

#### الفلاتر

- البحث.
- الفئة.
- الموديل.
- كود المنتج.
- الترتيب:
  - الأحدث.
  - الاسم.
  - الموديل.

#### Empty State

إذا لا توجد نتائج:

- اعرض رسالة واضحة.
- زر `مسح الفلاتر`.
- زر `تواصل واتساب وسنساعدك`.

---

### 7.4 صفحة تفاصيل المنتج

#### الملف

```text
frontend/src/pages/ProductDetail.tsx
```

#### المطلوب

رتب الصفحة إلى:

1. Breadcrumb.
2. معرض صور في اليمين أو الأعلى للجوال.
3. معلومات المنتج:
   - الاسم.
   - الكود.
   - الفئة.
   - الموديل.
   - الوصف.
   - tags.
4. CTA واضح:
   - `استفسر عبر واتساب`.
5. منتجات مشابهة.

#### Sticky WhatsApp على الجوال

في الجوال أضف شريط ثابت أسفل الشاشة:

```text
[استفسر عبر واتساب] [اتصال/عرض الكتالوج]
```

#### رسالة واتساب

يجب أن تشمل:

```text
مرحبًا، أريد الاستفسار عن المنتج:
الاسم: ...
الكود: ...
الفئة: ...
الرابط: ...
```

عدّل `frontend/src/utils/whatsapp.ts` ليقبل product object ويركب الرسالة بشكل موحد.

---

### 7.5 الهيدر والفوتر

#### الملفات

```text
frontend/src/components/layout/SiteHeader.tsx
frontend/src/components/layout/SiteFooter.tsx
```

#### الهيدر

- شعار واضح.
- روابط:
  - الرئيسية.
  - الكتالوج.
  - الفئات.
  - تواصل معنا.
- زر أصفر أو أخضر واتساب.
- في الجوال: Drawer نظيف.

#### الفوتر

- خلفية أزرق داكن أو أسود.
- شعار.
- روابط سريعة.
- واتساب.
- معلومات التواصل.
- سطر حقوق.

---

## 8) المرحلة الخامسة — إعادة تصميم لوحة الإدارة

### 8.1 Dashboard كـ Operations Center

#### الملفات

```text
frontend/src/pages/admin/AdminDashboard.tsx
frontend/src/pages/admin/components/StatsOverview.tsx
frontend/src/pages/admin/components/ImagesDistributionCard.tsx
frontend/src/pages/admin/components/DashboardHeader.tsx
```

#### المطلوب

بدل أن تكون لوحة الإدارة مجرد أرقام، اجعلها مركز عمليات:

- إجمالي المنتجات.
- المنتجات بدون صور.
- الصور غير المرتبطة.
- الصور غير المعلمة Watermark.
- مهام الصور المعلقة.
- آخر منتجات مضافة.
- روابط سريعة:
  - إضافة منتج.
  - رفع صور.
  - المنتجات بدون صور.
  - الصور غير المرتبطة.

#### تنبيهات ذكية

إذا `productsWithoutImages > 0`:

```text
يوجد 15 منتج بدون صور — راجعها الآن
```

إذا `pendingJobs > 0`:

```text
يوجد 5 مهام معالجة صور قيد الانتظار
```

---

### 8.2 إدارة المنتجات

#### الملفات

```text
frontend/src/pages/admin/ProductManagement.tsx
frontend/src/components/admin/ProductTable.tsx
frontend/src/components/admin/ProductFormDialog.tsx
frontend/src/components/admin/DeleteProductDialog.tsx
frontend/src/components/admin/ImageSelectionDialog.tsx
frontend/src/components/admin/SimilarProductsSelectionDialog.tsx
```

#### المطلوب UX

- أعلى الصفحة:
  - عنوان.
  - زر إضافة منتج.
  - مؤشر للمنتجات بدون صور.
- الفلاتر:
  - بحث.
  - فئة.
  - موديل.
  - مع/بدون صور.
- الجدول:
  - صورة مصغرة.
  - اسم المنتج.
  - الكود.
  - الفئة.
  - عدد الصور.
  - أزرار تعديل/حذف.
- Dialog المنتج:
  - يقسم إلى tabs أو sections:
    1. البيانات الأساسية.
    2. الصور.
    3. المتغيرات/tags.
    4. المنتجات المشابهة.

#### حذف المنتج

في Dialog الحذف اشرح بوضوح:

```text
سيتم حذف المنتج فقط، وستبقى الصور في مكتبة الوسائط كصور غير مرتبطة.
```

ثم نفذ:

```ts
await deleteProduct(productId, { detachImages: true });
```

---

### 8.3 إدارة الصور

#### الملفات

```text
frontend/src/pages/admin/ImageManagement.tsx
frontend/src/components/ImageGrid.tsx
frontend/src/components/ImageCard.tsx
```

#### المطلوب

- اعرض حالة الصورة:
  - مرتبطة / غير مرتبطة.
  - عليها watermark / لا.
  - حالة المعالجة.
- عند حذف الصورة:
  - أكد للمستخدم أن الحذف سيزيل الملف من التخزين.
  - الباك إند ينظف مرجعها من المنتج.
- لا تترك prop مثل `withDownload` بدون تنفيذ.
  - إما نفذ زر download إذا كانت مطلوبة.
  - أو اجعل prop مستخدمة فعليًا.

---

## 9) المرحلة السادسة — الترجمة i18n

### الملف

```text
frontend/src/i18n/locales/ar.json
```

### المطلوب

أضف namespaces واضحة:

```json
{
  "common": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "edit": "تعديل",
    "search": "بحث",
    "loading": "جاري التحميل...",
    "noResults": "لا توجد نتائج"
  },
  "public": {
    "home": {},
    "catalog": {},
    "product": {}
  },
  "admin": {
    "dashboard": {},
    "products": {},
    "categories": {},
    "images": {},
    "users": {}
  }
}
```

### مفاتيح يجب التأكد من وجودها

أضف أي مفاتيح مستخدمة حاليًا وغير موجودة، مثل:

```text
categoriesManagement
categoriesManagementDesc
newCategory
adminDashboard
dashboardSubtitle
adminRole
repRole
saveCategoryFailed
deleteCategoryFailed
admin.products.title
admin.products.subtitle
admin.products.new_product
```

### قاعدة تنفيذ

لا تترك أي مفتاح يظهر للمستخدم كما هو. بعد التنفيذ شغّل التطبيق وتأكد من عدم ظهور مفاتيح مثل `admin.products.title` كنص في الواجهة.

---

## 10) المرحلة السابعة — تحسينات البيانات وتجربة واتساب

### 10.1 توحيد بناء رسالة واتساب

#### الملف

```text
frontend/src/utils/whatsapp.ts
```

#### المطلوب

أنشئ دالة:

```ts
export function buildProductWhatsAppMessage(product: {
  productName?: string;
  productCode?: string;
  category?: string;
  model?: string;
  url?: string;
}) {
  return [
    'مرحبًا، أريد الاستفسار عن المنتج:',
    product.productName ? `الاسم: ${product.productName}` : null,
    product.productCode ? `الكود: ${product.productCode}` : null,
    product.category ? `الفئة: ${product.category}` : null,
    product.model ? `الموديل: ${product.model}` : null,
    product.url ? `الرابط: ${product.url}` : null,
  ].filter(Boolean).join('\n');
}
```

واستخدمها في:

```text
ProductDetail.tsx
ProductCard.tsx
WhatsAppCTA.tsx
```

---

## 11) ملفات يجب تعديلها أو إضافتها

### Backend

```text
backend/src/products/dto/product-query.dto.ts
backend/src/products/products.controller.ts
backend/src/products/products.service.ts
backend/src/admin/admin-images/admin-images.service.ts
backend/src/public/public-stats.controller.ts       # إذا اعتمدنا site-stats
backend/src/public/public-stats.service.ts          # إذا اعتمدنا site-stats
backend/src/app.module.ts                           # تسجيل public module إذا أضيف
```

### Frontend API/types

```text
frontend/src/api/admin.ts
frontend/src/api/products.ts
frontend/src/types/api.types.ts
frontend/src/types/models.types.ts
```

### Frontend Admin

```text
frontend/src/hooks/useProductManagement.ts
frontend/src/pages/admin/ProductManagement.tsx
frontend/src/components/admin/ProductFormDialog.tsx
frontend/src/components/admin/DeleteProductDialog.tsx
frontend/src/components/admin/ImageSelectionDialog.tsx
frontend/src/components/admin/SimilarProductsSelectionDialog.tsx
frontend/src/components/admin/ProductTable.tsx
frontend/src/components/admin/ProductFilters.tsx
```

### Frontend Public UI

```text
frontend/src/theme.ts
frontend/src/index.css
frontend/src/pages/HomePage.tsx
frontend/src/pages/HomePageEnhanced.tsx
frontend/src/pages/CatalogPage.tsx
frontend/src/pages/ProductDetail.tsx
frontend/src/components/ProductCard.tsx
frontend/src/components/StatsCounter.tsx
frontend/src/components/CategoryShowcase.tsx
frontend/src/components/WhatsAppCTA.tsx
frontend/src/components/layout/SiteHeader.tsx
frontend/src/components/layout/SiteFooter.tsx
frontend/src/utils/whatsapp.ts
frontend/src/i18n/locales/ar.json
```

---

## 12) ترتيب التنفيذ المقترح لكودكس

نفذ بالترتيب التالي لتقليل الأخطاء:

### الخطوة 1

Backend:

- أضف `ids` إلى products query.
- أضف `detachImages` لحذف المنتج.
- نظف مراجع الصور عند حذف صورة.
- شغل اختبارات أو build.

### الخطوة 2

Frontend admin operations:

- عدّل `fetchProducts` و`deleteProduct`.
- أكمل `useProductManagement`.
- أنشئ `ImageSelectionDialog`.
- أنشئ `SimilarProductsSelectionDialog`.
- اربط ProductManagement.
- اختبر:
  - اختيار صور.
  - إزالة صورة من المنتج.
  - اختيار منتجات مشابهة.
  - حذف منتج له صور مع فصل الصور.

### الخطوة 3

Brand/theme:

- عدّل `theme.ts`.
- عدّل `index.css`.
- أزل الاعتماد على السيان/gradient التقني.
- تأكد أن الوضع العربي RTL لم يتأثر.

### الخطوة 4

Public catalog UI:

- Home.
- Catalog.
- ProductCard.
- ProductDetail.
- Sticky WhatsApp للجوال.

### الخطوة 5

Admin UI polish:

- Dashboard operations center.
- Product table.
- Image management.
- Delete dialogs.

### الخطوة 6

I18n + QA:

- أكمل مفاتيح الترجمة.
- شغل build.
- اختبر يدويًا.

---

## 13) معايير القبول النهائية

### Backend

- `GET /products?ids=id1,id2` يرجع المنتجات المطلوبة فقط.
- `DELETE /products/:id` ما زال يمنع الحذف إذا توجد صور ولم يتم إرسال `detachImages=true`.
- `DELETE /products/:id?detachImages=true` يحذف المنتج ويفصل الصور ولا يحذف ملفات الصور.
- عند حذف صورة من `/admin/images/:id` يتم إزالة `_id` من `Product.images`.
- لا توجد مراجع broken في `similarProducts` بعد حذف منتج.

### Frontend Admin

- زر “اختيار من المخزن” يفتح dialog ويختار صورًا فعلية.
- زر إزالة صورة من المنتج يعمل ويؤثر عند الحفظ.
- زر “اختيار منتجات” يفتح dialog ويختار منتجات مشابهة.
- حذف المنتج يعمل حتى لو لديه صور، مع فصل الصور.
- لا توجد أزرار تضغط عليها ولا يحدث شيء.
- لا توجد تعليقات TODO في العمليات الأساسية.

### Frontend Public

- ألوان الواجهة متطابقة مع هوية الشعار.
- الصفحة الرئيسية لا تعتمد على صورة Hero مفقودة.
- الكتالوج واضح وسهل البحث والتصفية.
- بطاقة المنتج تعرض المنتج وليس مجرد صورة.
- صفحة التفاصيل فيها CTA واتساب واضح.
- شريط واتساب sticky يعمل على الجوال.

### I18n

- لا تظهر مفاتيح ترجمة للمستخدم.
- النصوص العربية واضحة ومهنية.

### Build

يجب أن تعمل الأوامر:

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

ولو هناك اختبارات:

```bash
npm test
```

---

## 14) أمر/Prompt مختصر لكودكس

انسخ هذا النص لكودكس:

```text
نفّذ خطة إعادة بناء UI/UX وربط العمليات لمشروع Alrhomi Catalog حسب الملف التالي بالكامل.

المبادئ الإلزامية:
- لا تخفِ أي زر ناقص ولا تحذف أي ملف فارغ إذا كان يمثل ميزة ناقصة؛ أكمل التنفيذ بدل الإخفاء.
- اعتمد هوية الشعار: أزرق ملكي #24458f، أصفر ذهبي #f4c400، أبيض، أسود، وأحمر #b5152b للتنبيه فقط.
- حوّل الواجهة من SaaS/glass/cyan إلى Industrial Premium Catalog مناسب لمعدات المطاعم والمطابخ والفنادق.

ابدأ بالباك إند:
1) أضف ids إلى ProductQueryDto وProductsService.findAll.
2) عدّل DELETE /products/:id ليقبل detachImages=true ويفصل الصور بدل حذفها.
3) عند حذف صورة من admin/images نظف مرجعها من Product.images.

ثم الواجهة:
1) عدّل api/admin.ts وtypes لدعم ids وdeleteProduct({ detachImages }).
2) أكمل useProductManagement بكل handlers الناقصة.
3) أنشئ ImageSelectionDialog وSimilarProductsSelectionDialog.
4) اربط ProductManagement بدل placeholders.
5) عدّل theme.ts وindex.css لهوية الشعار.
6) أعد تصميم Home/Catalog/ProductDetail/ProductCard/StatsCounter/SiteHeader/SiteFooter.
7) أكمل i18n ولا تترك مفاتيح ناقصة.

بعد التنفيذ شغّل build للباك إند والفرونت واصلح أي أخطاء TypeScript أو lint.
```

---

## 15) ملاحظات نهائية مهمة

- هذا التنفيذ لا يغيّر قاعدة البيانات بشكل خطير.
- حذف المنتج مع `detachImages=true` لا يحذف الصور من التخزين، وهذا هو السلوك الأكثر أمانًا.
- اختيار المنتجات المشابهة يحتاج فلتر `ids` حتى لا يصبح الأداء سيئًا مع زيادة المنتجات.
- التصميم الجديد يجب أن يخدم البيع والاستفسار وليس الاستعراض البصري فقط.
- الشعار هو مرجع الهوية الأول، لذلك الأزرق والأصفر يجب أن يكونا أساس الواجهة لكن بطريقة متوازنة وغير مزعجة.

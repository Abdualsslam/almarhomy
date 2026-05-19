# ✅ مهام المرحلة 4: تحسينات تجربة المستخدم

## 4.1 إضافة Error Boundary
- [ ] إنشاء `frontend/src/components/ErrorBoundary.tsx`
- [ ] تصميم واجهة خطأ جميلة (أيقونة + رسالة + زر إعادة محاولة)
- [ ] تغليف `<App />` بـ `<ErrorBoundary>` في `index.tsx`
- [ ] إضافة error boundary منفصل حول `<AdminApp />`
- [ ] اختبار Error Boundary عبر throw error مقصود
- [ ] إضافة logging للأخطاء (اختياري: Sentry)

## 4.2 إضافة صفحة 404
- [ ] إنشاء `frontend/src/pages/NotFoundPage.tsx`
- [ ] تصميم صفحة 404 بأسلوب متسق مع الموقع
- [ ] إضافة زر "العودة للرئيسية"
- [ ] إضافة شريط بحث في صفحة 404
- [ ] تحديث route `*` في `App.tsx` لعرض `NotFoundPage` بدل redirect
- [ ] اختبار URL غير موجود

## 4.3 ترتيب المنتجات (Sorting)
### Backend:
- [ ] إضافة `sortBy` في `ProductQueryDto` (createdAt, productName)
- [ ] إضافة `sortOrder` في `ProductQueryDto` (asc, desc)
- [ ] تعديل `findAllPublic()` لدعم الترتيب الديناميكي
- [ ] تحديث Swagger documentation
- [ ] اختبار الترتيب عبر Swagger

### Frontend:
- [ ] إضافة dropdown للترتيب في `CatalogPage.tsx`
- [ ] إضافة `sortBy` و `sortOrder` في URL query params
- [ ] تمرير معاملات الترتيب لـ `searchProducts()`
- [ ] تحديث `ProductQueryParams` type
- [ ] اختبار الترتيب في جميع الاتجاهات

## 4.4 معرض صور محسّن
- [ ] إنشاء `frontend/src/components/ImageLightbox.tsx`
- [ ] إنشاء `frontend/src/components/ImageThumbnails.tsx`
- [ ] إضافة شريط صور مصغرة في `ProductDetail.tsx`
- [ ] إضافة عرض Lightbox عند النقر على الصورة
- [ ] إضافة أسهم التنقل بين الصور
- [ ] إضافة دعم keyboard navigation (← →)
- [ ] إضافة دعم swipe على الهواتف
- [ ] إضافة zoom عند الضغط المطوّل
- [ ] اختبار على الهاتف والحاسوب

## 4.5 زر نسخ كود المنتج
- [ ] إضافة زر نسخ `productCode` في `ProductDetail.tsx`
- [ ] إضافة toast/snackbar بعد النسخ ("تم نسخ الكود!")
- [ ] إضافة زر نسخ في جدول `ProductManagement.tsx`
- [ ] استخدام `navigator.clipboard.writeText()`
- [ ] إضافة fallback للمتصفحات القديمة
- [ ] اختبار النسخ

## 4.6 تحسين Empty States في الصفحة الرئيسية
- [ ] إضافة حالة فارغة لقسم الفئات في `HomePage.tsx`
- [ ] إضافة حالة فارغة لقسم المنتجات في `HomePage.tsx`
- [ ] إضافة حالة خطأ مع زر إعادة المحاولة
- [ ] تصميم الحالات بأيقونات مناسبة

## 4.7 تحسين Loading State العام
- [ ] إضافة splash screen / loading indicator أثناء التحميل الأولي
- [ ] (اختياري) تثبيت NProgress لشريط تحميل أعلى الصفحة
- [ ] تحسين skeleton loading في `CategoriesPage`
- [ ] تحسين skeleton loading في `ProductDetail`
- [ ] اختبار تجربة التحميل

## 4.8 تحسين Responsive Design
- [ ] مراجعة `HomePage` على شاشة 320px
- [ ] مراجعة `CatalogPage` على شاشة 320px
- [ ] مراجعة `ProductDetail` على شاشة 320px
- [ ] مراجعة `AdminDashboard` على شاشة التابلت
- [ ] مراجعة `ProductManagement` على شاشة التابلت
- [ ] إصلاح أي مشاكل overflow أو truncation
- [ ] اختبار touch targets (44px minimum)

---

## ملخص التقدم

| المهمة | الحالة | ملاحظات |
|--------|--------|---------|
| 4.1 Error Boundary | [ ] لم يبدأ | |
| 4.2 صفحة 404 | [ ] لم يبدأ | |
| 4.3 ترتيب المنتجات | [ ] لم يبدأ | |
| 4.4 معرض صور | [ ] لم يبدأ | |
| 4.5 نسخ كود المنتج | [ ] لم يبدأ | |
| 4.6 Empty States | [ ] لم يبدأ | |
| 4.7 Loading State | [ ] لم يبدأ | |
| 4.8 Responsive | [ ] لم يبدأ | |

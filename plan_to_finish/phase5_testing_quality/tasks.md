# ✅ مهام المرحلة 5: الاختبارات وجودة الكود

## 5.1 اختبارات وحدة للباك إند
### CategoriesService
- [ ] اختبار `findAll()` - إرجاع فئات مع itemsCount
- [ ] اختبار `create()` - إنشاء فئة جديدة بنجاح
- [ ] اختبار `create()` - رفض فئة مكررة (ConflictException)
- [ ] اختبار `remove()` - منع حذف فئة مرتبطة بمنتجات عبر category
- [ ] اختبار `remove()` - منع حذف فئة مرتبطة بمنتجات عبر subcategory
- [ ] اختبار `remove()` - منع حذف فئة لها فئات فرعية
- [ ] اختبار `remove()` - حذف فئة غير مرتبطة بنجاح

### ProductsService
- [ ] اختبار `findAll()` - بدون فلاتر
- [ ] اختبار `findAll()` - مع فلتر `hasImages=true`
- [ ] اختبار `findAll()` - مع فلتر `hasImages=false`
- [ ] اختبار `findAll()` - مع بحث `q`
- [ ] اختبار `findAll()` - إرجاع `withoutImagesCount` صحيح
- [ ] اختبار `create()` - بيانات صحيحة
- [ ] اختبار `remove()` - منع حذف منتج مرتبط بصور

### HealthService
- [ ] اختبار `getReadiness()` - كل الخدمات تعمل → ready
- [ ] اختبار `getReadiness()` - MongoDB معطل → not_ready
- [ ] اختبار `getReadiness()` - Redis معطل → not_ready
- [ ] اختبار `checkMongo()` - اتصال ناجح
- [ ] اختبار `checkRedis()` - اتصال ناجح

### FoldersService
- [ ] اختبار `create()` - إنشاء مجلد بنجاح
- [ ] اختبار `rename()` - إعادة تسمية بنجاح
- [ ] اختبار `delete()` - حذف مجلد بنجاح
- [ ] اختبار `getContents()` - إرجاع محتويات المجلد

### AuthService
- [ ] اختبار تسجيل دخول ناجح
- [ ] اختبار كلمة مرور خاطئة
- [ ] اختبار مستخدم غير موجود

## 5.2 اختبارات E2E
- [ ] اختبار `POST /auth/login` - نجاح
- [ ] اختبار `POST /auth/login` - فشل
- [ ] اختبار `GET /categories` - عام
- [ ] اختبار `POST /admin/categories` - بدون auth → 401
- [ ] اختبار `POST /admin/categories` - مع admin → 201
- [ ] اختبار `GET /products` - مع auth
- [ ] اختبار `GET /public/products` - بدون auth
- [ ] اختبار `POST /folders` - بدون auth → 401
- [ ] اختبار `POST /folders` - بدون admin → 403
- [ ] اختبار `GET /health/live` → 200
- [ ] اختبار `GET /health/ready` → 200 أو 503

## 5.3 اختبارات الفرونت إند
- [ ] اختبار `CatalogPage` - عرض المنتجات
- [ ] اختبار `CatalogPage` - مزامنة الفلاتر مع URL
- [ ] اختبار `Filters` component - تغيير الفئة
- [ ] اختبار `SearchBar` - إدخال نص البحث
- [ ] اختبار `SEO` component - عرض meta tags صحيحة
- [ ] اختبار `AuthContext` - تسجيل الدخول/الخروج
- [ ] اختبار routing - المسارات المحمية

## 5.4 تقسيم ProductManagement.tsx
- [ ] تحليل المكونات داخل الملف (154 KB)
- [ ] استخراج `ProductTable.tsx`
- [ ] استخراج `ProductFilters.tsx`
- [ ] استخراج `ProductForm.tsx`
- [ ] استخراج `ProductImageManager.tsx`
- [ ] استخراج `ProductActions.tsx`
- [ ] استخراج `useProductManagement.ts` hook
- [ ] استخراج `useProductFilters.ts` hook
- [ ] التأكد من عمل جميع الوظائف بعد التقسيم
- [ ] اختبار كل مكون بشكل مستقل

## 5.5 مراجعة توافق الأنواع
- [ ] مقارنة `Product` type مع response فعلي من `/products`
- [ ] مقارنة `Product` type مع response فعلي من `/public/products`
- [ ] مقارنة `Category` type مع response فعلي
- [ ] إصلاح `PaginatedResponse.totalItems` → required بدل optional
- [ ] إنشاء type محدد لـ `ProductListResponse` يشمل `withoutImagesCount`
- [ ] تشغيل `npm run type-check` بدون أخطاء

## 5.6 إصلاح ESLint Warnings
- [ ] تشغيل `npm run lint` في `backend/`
- [ ] إصلاح جميع warnings في الباك إند
- [ ] تشغيل eslint في `frontend/`
- [ ] إصلاح جميع warnings في الفرونت إند
- [ ] التأكد من أن lint يمر بدون أخطاء

## 5.7 تحسين i18n
- [ ] مراجعة ملفات الترجمة الحالية
- [ ] استخراج نصوص `HomePage.tsx` لملفات الترجمة
- [ ] استخراج نصوص `CatalogPage.tsx` لملفات الترجمة
- [ ] استخراج نصوص `ProductDetail.tsx` لملفات الترجمة
- [ ] استخراج نصوص حالات الخطأ والفارغة
- [ ] (اختياري) إضافة ملف ترجمة إنجليزي
- [ ] اختبار تبديل اللغة

---

## ملخص التقدم

| المهمة | الحالة | ملاحظات |
|--------|--------|---------|
| 5.1 Unit Tests Backend | [ ] لم يبدأ | |
| 5.2 E2E Tests | [ ] لم يبدأ | |
| 5.3 Frontend Tests | [ ] لم يبدأ | |
| 5.4 تقسيم ProductManagement | [ ] لم يبدأ | |
| 5.5 توافق الأنواع | [ ] لم يبدأ | |
| 5.6 ESLint | [ ] لم يبدأ | |
| 5.7 i18n | [ ] لم يبدأ | |

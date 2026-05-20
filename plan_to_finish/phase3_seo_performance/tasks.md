# ✅ مهام المرحلة 3: تحسينات SEO والأداء

## 3.1 إصلاح sitemap.xml
- [ ] تحديث الدومين من `yourdomain.com` إلى الدومين الفعلي
- [ ] إضافة صفحة `/categories` في sitemap
- [ ] إنشاء endpoint في الباك إند لتوليد sitemap ديناميكي
- [ ] تضمين جميع صفحات المنتجات `/product/:id` ديناميكياً
- [ ] تحديث `lastmod` تلقائياً بناءً على `updatedAt`
- [ ] إضافة route في NestJS: `GET /sitemap.xml`
- [ ] اختبار sitemap مع Google Search Console validator

## 3.2 إصلاح robots.txt
- [ ] استبدال `%PUBLIC_URL%` بالرابط الفعلي للموقع
- [ ] مراجعة Disallow rules الحالية
- [ ] التأكد من عدم حظر مسارات مهمة
- [ ] اختبار robots.txt مع أداة اختبار Google
- [ ] إضافة رابط sitemap الصحيح

## 3.3 Lazy Loading للصفحات
- [ ] تحويل `CatalogPage` إلى lazy load
- [ ] تحويل `CategoriesPage` إلى lazy load
- [ ] تحويل `ProductDetail` إلى lazy load
- [ ] تحويل `LoginPage` إلى lazy load
- [ ] تحويل `AdminApp` (وكل صفحات الأدمن) إلى lazy load
- [ ] إضافة `Suspense` مع loading spinner في `App.tsx`
- [ ] اختبار التنقل بين الصفحات
- [ ] قياس حجم Bundle قبل وبعد

## 3.4 تحسين أداء الصور
- [ ] إضافة `loading="lazy"` لصور المنتجات في `ImageGrid`
- [ ] إضافة `loading="lazy"` لصور الفئات في `CategoryShowcase`
- [ ] إضافة placeholder/skeleton أثناء تحميل الصور
- [ ] إضافة `srcSet` للأحجام المختلفة (إذا كان S3 يدعم resizing)
- [ ] إضافة `width` و `height` attributes لمنع layout shift
- [ ] اختبار Largest Contentful Paint (LCP)

## 3.5 إضافة Compression
- [ ] تثبيت `compression` في الباك إند: `npm install compression`
- [ ] تثبيت `@types/compression` كـ devDependency
- [ ] إضافة `app.use(compression())` في `main.ts`
- [ ] التأكد من عدم تعارض مع Nginx gzip
- [ ] اختبار حجم الاستجابات قبل وبعد

## 3.6 تحسين Meta Tags
- [ ] إضافة `og:image:width` و `og:image:height` في `SEO.tsx`
- [ ] إضافة product-specific Open Graph tags في `ProductDetail.tsx`
- [ ] تحسين structured data بإضافة `offers` و `brand`
- [ ] مراجعة canonical URLs
- [ ] اختبار Meta Tags مع Facebook Sharing Debugger
- [ ] اختبار مع Twitter Card Validator

---

## ملخص التقدم

| المهمة | الحالة | ملاحظات |
|--------|--------|---------|
| 3.1 sitemap.xml | [ ] لم يبدأ | |
| 3.2 robots.txt | [ ] لم يبدأ | |
| 3.3 Lazy Loading | [ ] لم يبدأ | |
| 3.4 أداء الصور | [ ] لم يبدأ | |
| 3.5 Compression | [ ] لم يبدأ | |
| 3.6 Meta Tags | [ ] لم يبدأ | |

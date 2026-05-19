# ✅ مهام المرحلة 2: تحسينات الأمان

## 2.1 تقييد CORS
- [ ] إضافة `FRONTEND_URL` في `.env.example`
- [ ] إضافة `ALLOWED_ORIGINS` في `.env.example` (اختياري، للدومينات المتعددة)
- [ ] تعديل CORS في `backend/src/main.ts` لتقييد المصادر
- [ ] السماح بـ localhost فقط في بيئة التطوير
- [ ] اختبار CORS مع دومين مسموح
- [ ] اختبار CORS مع دومين غير مسموح (يجب أن يُرفض)
- [ ] إضافة `FRONTEND_URL` في `docker-compose.unified.prod.yml`

## 2.2 Rate Limiting لمسارات المصادقة
- [ ] تثبيت `@nestjs/throttler` في الباك إند
- [ ] إضافة `ThrottlerModule` في `app.module.ts`
- [ ] تطبيق rate limiting عام (30 طلب/دقيقة)
- [ ] تطبيق rate limiting مشدد على `/auth/login` (5 محاولات/دقيقة)
- [ ] تطبيق rate limiting على `/auth/register` إن وُجد
- [ ] إضافة رسالة خطأ واضحة عند تجاوز الحد
- [ ] اختبار Rate Limiting محلياً

## 2.3 إضافة Helmet Middleware
- [ ] تثبيت `helmet` في الباك إند
- [ ] إضافة `app.use(helmet())` في `main.ts`
- [ ] تكوين Content-Security-Policy المناسب
- [ ] التأكد من عدم تعارض مع Swagger UI
- [ ] اختبار Security Headers

## 2.4 تحسين إدارة JWT
- [ ] مراجعة آلية JWT الحالية في `auth.service.ts`
- [ ] إضافة endpoint `/auth/refresh` لتجديد التوكن
- [ ] تخزين refresh token في httpOnly cookie
- [ ] تحديث `frontend/src/api/client.ts` لدعم التجديد التلقائي
- [ ] إضافة interceptor لاعتراض 401 وتجديد التوكن
- [ ] اختبار تدفق التجديد كاملاً
- [ ] اختبار انتهاء صلاحية refresh token

## 2.5 مراجعة File Upload Validation
- [ ] مراجعة MIME types المسموحة في upload endpoint
- [ ] التأكد من وجود `client_max_body_size` مناسب (حالياً 50MB في Nginx)
- [ ] التأكد من حد أقصى لحجم الملف في الباك إند
- [ ] التأكد من تعقيم أسماء الملفات (sanitize filenames)
- [ ] التأكد من عدم قبول ملفات خطيرة (.exe, .sh, etc.)
- [ ] اختبار رفع ملف بنوع غير مسموح

## 2.6 إضافة FRONTEND_URL
- [ ] إضافة في `.env.example`
- [ ] إضافة في `.env.unified.example`
- [ ] إضافة في `docker-compose.unified.prod.yml`
- [ ] استخدامه في CORS configuration
- [ ] توثيق المتغير في `docs/environment.md`

---

## ملخص التقدم

| المهمة | الحالة | ملاحظات |
|--------|--------|---------|
| 2.1 CORS | [ ] لم يبدأ | |
| 2.2 Rate Limiting | [ ] لم يبدأ | |
| 2.3 Helmet | [ ] لم يبدأ | |
| 2.4 JWT Refresh | [ ] لم يبدأ | |
| 2.5 Upload Validation | [ ] لم يبدأ | |
| 2.6 FRONTEND_URL | [ ] لم يبدأ | |

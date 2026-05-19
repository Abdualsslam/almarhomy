# 🔐 المرحلة 2: تحسينات الأمان

## الهدف
تأمين التطبيق وحماية البيانات والمستخدمين من الثغرات الأمنية الشائعة.

## الأولوية: حرج 🔴
## الجهد المقدر: 1-2 يوم

---

## المهمة 2.1: تقييد CORS

### المشكلة
في `backend/src/main.ts` سطر 16، يتم استخدام `origin: true` مما يسمح لأي domain بالوصول.

### خطوات التنفيذ
1. تعريف متغير بيئة `ALLOWED_ORIGINS` يحتوي على الدومينات المسموحة
2. تعديل إعدادات CORS لاستخدام القائمة المحددة
3. السماح بـ `localhost:3000` فقط في بيئة التطوير

### الكود المقترح
```typescript
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL].filter(Boolean)
  : [true];

app.enableCors({
  origin: allowedOrigins.length === 1 && allowedOrigins[0] === true 
    ? true 
    : allowedOrigins,
  credentials: true,
  // ... باقي الإعدادات
});
```

---

## المهمة 2.2: Rate Limiting لمسارات المصادقة

### المشكلة
لا يوجد حماية خاصة ضد هجمات brute force على `/auth/login`.

### خطوات التنفيذ
1. تثبيت `@nestjs/throttler`
2. تطبيق rate limiting عام
3. تطبيق rate limiting مشدد على مسارات المصادقة (5 محاولات / دقيقة)

### الكود المقترح
```typescript
// في auth.controller.ts
@Throttle({ default: { limit: 5, ttl: 60000 } })
@Post('login')
async login(@Body() loginDto: LoginDto) { ... }
```

---

## المهمة 2.3: إضافة Helmet Middleware

### المشكلة
Security headers موجودة فقط في Nginx. عند الوصول المباشر للـ API لا توجد حماية.

### خطوات التنفيذ
1. تثبيت `helmet`
2. إضافته في `main.ts`
3. تكوين headers المناسبة

---

## المهمة 2.4: تحسين إدارة JWT

### المشكلة
لا يوجد Refresh Token rotation - عند انتهاء التوكن يتم تسجيل الخروج مباشرة.

### خطوات التنفيذ
1. مراجعة آلية JWT الحالية
2. إضافة endpoint لتجديد التوكن (`/auth/refresh`)
3. تحديث الفرونت لاستخدام refresh token
4. إضافة interceptor لتجديد التوكن تلقائياً

---

## المهمة 2.5: مراجعة File Upload Validation

### خطوات التنفيذ
1. مراجعة أنواع الملفات المسموحة (MIME types)
2. التأكد من وجود حد أقصى لحجم الملف
3. التأكد من تعقيم أسماء الملفات
4. فحص الملفات ضد المحتوى الخبيث

---

## المهمة 2.6: إضافة FRONTEND_URL لمتغيرات البيئة

### خطوات التنفيذ
1. إضافة `FRONTEND_URL` في `.env.example`
2. إضافته في `docker-compose.unified.prod.yml`
3. استخدامه في CORS وأي مكان يحتاج رابط الفرونت

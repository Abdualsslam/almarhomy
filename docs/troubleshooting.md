# Troubleshooting FAQ

هذا الملف مرجع سريع لأكثر المشاكل تكرارا مع حلول مباشرة.

## 1) API لا تعمل بعد النشر

**الأعراض**
- `api` تظهر `Exited` في `docker compose ps`
- endpoint الصحة لا يستجيب

**افحص**
```bash
docker compose -f docker-compose.unified.prod.yml ps
docker compose -f docker-compose.unified.prod.yml logs --tail=200 api
```

**الأسباب الشائعة**
- `MONGODB_URI` خاطئة أو غير قابلة للوصول
- `JWT_SECRET` مفقود
- خطأ runtime بعد build

**الحل**
- صحح `.env` ثم:
```bash
docker compose -f docker-compose.unified.prod.yml up -d --build api
```

---

## 2) الواجهة تعمل لكن البيانات لا تظهر

**الأعراض**
- الصفحة تفتح، لكن الطلبات تفشل (Network / CORS / 404)

**افحص**
- قيمة `REACT_APP_API_BASE_URL`
- Network tab في المتصفح

**الحل**
- اضبط `REACT_APP_API_BASE_URL` على API الصحيحة
- أعد بناء frontend:
```bash
docker compose -f docker-compose.unified.prod.yml up -d --build frontend
```

---

## 3) تسجيل الدخول يفشل دائمًا (401/403)

**الأعراض**
- لا يمكن الدخول للوحة الإدارة
- يتم طرد المستخدم مباشرة

**افحص**
- لوجات `api`
- توافق `JWT_SECRET` مع البيئة
- وجود المستخدم وصلاحيته في قاعدة البيانات

**الحل**
- تأكد من `JWT_SECRET`
- أنشئ/راجع مستخدم admin
- امسح `localStorage` في المتصفح ثم أعد المحاولة

---

## 4) رفع الصور يفشل

**الأعراض**
- فشل في `/images/upload`
- رسالة مرتبطة بـ S3 أو file handling

**افحص**
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET`
- لوجات `api`

**الحل**
- صحح إعدادات S3 في `.env`
- تأكد أن bucket تسمح `PutObject` و`GetObject`

---

## 5) الصور تُرفع ولكن العلامة المائية لا تظهر

**الأعراض**
- `originalUrl` موجودة لكن `watermarkedUrl` فارغة
- الحالة تبقى `queued` أو `failed`

**افحص**
```bash
docker compose -f docker-compose.unified.prod.yml logs --tail=200 api
docker compose -f docker-compose.unified.prod.yml logs --tail=200 redis
```

**الأسباب الشائعة**
- Redis غير متاح
- queue worker فشل أثناء المعالجة
- ملف الشعار غير موجود داخل الحاوية (`assets/logo.png`)

**الحل**
- تأكد أن Redis شغالة وصحية
- أعد تشغيل `api` و`redis`
- تحقق من وجود ملف الشعار في build

---

## 6) Queue متوقفة أو لا تعالج الوظائف

**الأعراض**
- jobs تتراكم في `waiting`

**افحص**
- اتصال `REDIS_URL`
- لوجات queue من خدمة `api`

**الحل**
- صحح `REDIS_URL`
- أعد تشغيل الخدمة:
```bash
docker compose -f docker-compose.unified.prod.yml restart redis api
```

---

## 7) Health check يفشل

**الأعراض**
- الحاوية `unhealthy`

**افحص**
```bash
curl -f http://localhost:5000/health/live
docker compose -f docker-compose.unified.prod.yml ps
```

**الحل**
- راجع سبب فشل `api` في اللوجات
- تحقق من استهلاك الموارد (`docker stats --no-stream`)
- إذا كانت المشكلة بعد إصدار جديد: نفذ rollback

---

## 8) أخطاء 502/504 من الدومين

**الأعراض**
- الموقع عبر الدومين لا يعمل رغم أن الحاويات تعمل

**افحص**
- reverse proxy (Traefik / Coolify)
- DNS وسجلات الدومين
- الشبكات المشتركة (`platform-network`)

**الحل**
- تأكد من الربط الصحيح بين الخدمة والبروكسي
- راجع إعدادات الدومين في لوحة Coolify

---

## 9) كيف أعمل rollback بسرعة؟

```bash
git log --oneline -n 10
git checkout <STABLE_COMMIT_SHA>
docker compose -f docker-compose.unified.prod.yml build --no-cache
docker compose -f docker-compose.unified.prod.yml up -d
curl -f http://localhost:5000/health/live
```

بعد الاستقرار، وثّق السبب وخطة الإصلاح قبل إعادة التحديث.

---

## 10) تحقق سريع خلال 3 دقائق (Quick Triage)

```bash
docker compose -f docker-compose.unified.prod.yml ps
docker compose -f docker-compose.unified.prod.yml logs --tail=100 api
docker compose -f docker-compose.unified.prod.yml logs --tail=100 frontend
curl -f http://localhost:5000/health/live
docker stats --no-stream
```

إذا فشل أي بند:
- أصلح `.env` أو الخدمة المعطلة
- أعد تشغيل الخدمة المتأثرة
- إذا استمر الفشل بعد الإصلاح السريع، فعّل rollback

## روابط المتابعة

- Grafana: `https://grafana.smartagency-ye.com/login`
- Uptime: `https://uptim.smartagency-ye.com/dashboard`
- Coolify: `https://coolify.smartagency-ye.com/`

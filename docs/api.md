# API Guide

## Swagger Endpoint

- Local: `http://localhost:5000/api-docs`
- Production: `https://<API_DOMAIN>/api-docs`

> يتم توليد التوثيق تلقائيا من Nest decorators عبر `@nestjs/swagger`.

## Authentication Method

- النوع: `Bearer JWT`
- الهيدر: `Authorization: Bearer <access_token>`
- التوكن يصدر من:
  - `POST /auth/register`
  - `POST /auth/login`

مستويات الوصول:
- User/Admin routes: محمية بـ `JwtAuthGuard`
- Admin-only routes: محمية أيضا بـ `RolesGuard` مع `role=admin`
- Public routes: endpoints الموسومة `@Public()` أو endpoints تحت المسارات العامة

## أهم Flows

1. **Auth Flow**
   - Register/Login -> استلام JWT -> استدعاء endpoints المحمية.

2. **Public Catalog Flow (بدون JWT)**
   - `GET /categories`
   - `GET /public/products`
   - `GET /public/products/:id`
   - `GET /public/images`
   - `GET /public/images/:id`

3. **Admin Catalog Management Flow (JWT + admin role)**
   - إدارة الفئات: `/admin/categories/*`
   - إدارة المنتجات: `/products/*`
   - إدارة الصور: `/images/*` و `/admin/images/*`
   - إدارة المستخدمين والإحصائيات: `/admin/users/*`, `/admin/stats/*`

4. **Image Processing Flow (Async)**
   - `POST /images/upload` يرفع الصورة ويعيد `jobId` (queued)
   - متابعة الحالة عبر:
     - `GET /jobs/:jobId/status` (محمي)
     - `GET /job-status/:jobId` (عام)
   - عند اكتمال المعالجة يتم تحديث روابط الصورة المائية.

## ملاحظات غير ظاهرة تلقائيا في Swagger

- معالجة الصور غير متزامنة (queue): نجاح upload لا يعني اكتمال watermark فورا.
- يوجد مساران لحالة الـ job: واحد محمي وواحد public للاستخدام الخارجي.
- جزء من الفلاتر يعتمد على query params اختيارية (`page`, `limit`, `q`, `category`, `model`, ...).
- لرفع الصور يجب إرسال `multipart/form-data` مع الحقل `file` (حد الحجم 10MB).
- Health endpoints مفيدة للتشغيل والمراقبة:
  - `GET /health/live`
  - `GET /health/ready`

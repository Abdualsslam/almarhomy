# Runbook (Operations)

هذا الملف هو مرجع التشغيل والصيانة عند أي حادثة أو توقف خدمة.

## روابط المراقبة والتشغيل

- Grafana: `https://grafana.smartagency-ye.com/login`
- Uptime: `https://uptim.smartagency-ye.com/dashboard`
- Coolify: `https://coolify.smartagency-ye.com/`

## قبل أي إجراء

- تأكد أنك داخل جذر المشروع.
- تأكد أن ملف `.env` محدث وصحيح.
- استخدم ملف التشغيل الصحيح: `docker-compose.unified.prod.yml`

## Deploy

تنفيذ نشر يدوي قياسي:

```bash
git pull
docker compose -f docker-compose.unified.prod.yml build
docker compose -f docker-compose.unified.prod.yml up -d
docker compose -f docker-compose.unified.prod.yml ps
```

تحقق سريع بعد النشر:

```bash
curl -f http://localhost:5000/health/live
```

إذا كان الـ API خلف reverse proxy فقط، افحص عبر الدومين:

```bash
curl -f https://<API_DOMAIN>/health/live
```

## Restart

إعادة تشغيل كل الخدمات:

```bash
docker compose -f docker-compose.unified.prod.yml restart
```

إعادة تشغيل خدمة محددة:

```bash
docker compose -f docker-compose.unified.prod.yml restart api
docker compose -f docker-compose.unified.prod.yml restart frontend
docker compose -f docker-compose.unified.prod.yml restart redis
```

## Logs

عرض لوجات كل الخدمات (follow):

```bash
docker compose -f docker-compose.unified.prod.yml logs -f
```

لوجات خدمة محددة:

```bash
docker compose -f docker-compose.unified.prod.yml logs -f api
docker compose -f docker-compose.unified.prod.yml logs -f frontend
docker compose -f docker-compose.unified.prod.yml logs -f redis
```

آخر 200 سطر فقط:

```bash
docker compose -f docker-compose.unified.prod.yml logs --tail=200 api
```

## Health Checks

التحقق من حالة الحاويات:

```bash
docker compose -f docker-compose.unified.prod.yml ps
```

التحقق من صحة API:

```bash
curl -f http://localhost:5000/health/live
```

التحقق من الصفحة الرئيسية للواجهة:

```bash
curl -f http://localhost/
```

التحقق من Swagger:

```bash
curl -I http://localhost:5000/api-docs
```

## Rollback

### طريقة سريعة (Commit سابق)

1. اعرف آخر الإصدارات:
```bash
git log --oneline -n 10
```

2. ارجع إلى commit مستقر:
```bash
git checkout <STABLE_COMMIT_SHA>
```

3. أعد البناء والتشغيل:
```bash
docker compose -f docker-compose.unified.prod.yml build --no-cache
docker compose -f docker-compose.unified.prod.yml up -d
```

4. تحقق من الصحة:
```bash
docker compose -f docker-compose.unified.prod.yml ps
curl -f http://localhost:5000/health/live
```

### بعد الطوارئ

- ثبّت rollback في branch/Tag رسمي.
- وثّق سبب الرجوع وما الذي كسر الإصدار.

## أشهر الأعطال المعروفة

- `api` لا يبدأ بسبب خطأ `MONGODB_URI` أو صلاحيات MongoDB.
- `api` يعمل لكن العمليات البطيئة/المائية متوقفة بسبب Redis أو queue.
- رفع الصور يفشل بسبب إعدادات S3 (`AWS_*`, `S3_BUCKET`).
- `frontend` لا يتصل بالـ API بسبب قيمة خاطئة لـ `REACT_APP_API_BASE_URL`.
- 502/504 من الـ proxy بسبب تعطل `api` أو عدم انضمام الشبكة الخارجية.
- فشل الصحة لأن `health/live` غير متاح أو التطبيق لم يكتمل إقلاعه.

## إذا سقطت الخدمة: ماذا أفحص أولًا؟

افحص بالترتيب التالي:

1. **الحالة العامة**: `docker compose -f docker-compose.unified.prod.yml ps`
2. **لوجات API**: `docker compose -f docker-compose.unified.prod.yml logs --tail=200 api`
3. **Health endpoint**: `curl -f http://localhost:5000/health/live`
4. **الاتصال بقاعدة البيانات**: تأكد من `MONGODB_URI` وصلاحية الوصول.
5. **الاتصال بـ Redis**: تحقق أن خدمة `redis` تعمل وصحية.
6. **إعدادات البيئة**: راجع `.env` خاصة `JWT_SECRET`, `REDIS_URL`, `REACT_APP_API_BASE_URL`.
7. **الشبكة/الدومين**: تحقق من الـ reverse proxy و DNS (عند وجود انقطاع خارجي فقط).

## أوامر مفيدة وقت الحوادث

```bash
docker compose -f docker-compose.unified.prod.yml ps
docker compose -f docker-compose.unified.prod.yml top
docker compose -f docker-compose.unified.prod.yml logs --tail=200 api
docker compose -f docker-compose.unified.prod.yml logs --tail=200 frontend
docker compose -f docker-compose.unified.prod.yml logs --tail=200 redis
docker stats --no-stream
```

## ملاحظات تشغيل

- لا تعدل `.env` مباشرة أثناء حادثة بدون توثيق.
- أي Restart أو Rollback يجب أن يسجل في سجل العمليات (وقت، سبب، منفذ الإجراء).
- إذا كان النشر عبر Coolify، استخدم نفس منطق الفحص (Logs + Health + Environment) من لوحة Coolify.

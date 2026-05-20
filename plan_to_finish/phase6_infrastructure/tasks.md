# ✅ مهام المرحلة 6: البنية التحتية والنشر

## 6.1 تهيئة متغيرات البيئة الإنتاجية
- [ ] إنشاء ملف `.env` للإنتاج
- [ ] ملء `MONGODB_URI` بقيمة إنتاجية
- [ ] توليد `JWT_SECRET` قوي (64+ حرف عشوائي)
- [ ] ملء `AWS_ACCESS_KEY_ID`
- [ ] ملء `AWS_SECRET_ACCESS_KEY`
- [ ] ملء `S3_BUCKET`
- [ ] ملء `AWS_REGION`
- [ ] تحديد `DOMAIN` الفعلي
- [ ] تحديد `API_DOMAIN` الفعلي
- [ ] تحديد `REACT_APP_API_BASE_URL`
- [ ] تحديد `REACT_APP_WHATSAPP_NUMBER`
- [ ] تحديد `CERTBOT_EMAIL`
- [ ] التأكد من أن `.env` مدرج في `.gitignore`
- [ ] تحديث `docs/environment.md` بالتوثيق

## 6.2 إعداد AWS S3
- [ ] إنشاء S3 bucket
- [ ] تكوين CORS policy للـ bucket
- [ ] إنشاء IAM user مع صلاحيات S3 فقط
- [ ] تحميل IAM credentials
- [ ] تكوين bucket policy
- [ ] اختبار رفع ملف تجريبي عبر AWS CLI
- [ ] اختبار رفع من الباك إند
- [ ] (اختياري) إعداد CloudFront CDN
- [ ] (اختياري) تفعيل S3 versioning

## 6.3 إعداد MongoDB للإنتاج
- [ ] إنشاء MongoDB Atlas cluster (أو تهيئة خادم MongoDB)
- [ ] إنشاء database user مع صلاحيات readWrite
- [ ] تكوين Network Access (IP whitelist أو VPC peering)
- [ ] اختبار الاتصال من الخادم
- [ ] إنشاء حساب Admin: `npm run create-admin`
- [ ] تفعيل backup تلقائي
- [ ] إعداد indexes للأداء
- [ ] اختبار الاتصال من Docker container

## 6.4 إعداد نظام Backup
- [ ] إعداد MongoDB backup يومي
- [ ] إعداد script لـ mongodump
- [ ] جدولة backup عبر cron أو Atlas scheduler
- [ ] تفعيل Redis RDB persistence (موجود: appendonly yes)
- [ ] تفعيل S3 versioning
- [ ] اختبار عملية الاستعادة (restore)
- [ ] توثيق خطوات الاستعادة

## 6.5 إعداد SSL/HTTPS
- [ ] تكوين DNS records (A record للدومين)
- [ ] تكوين DNS records (A record لـ API subdomain)
- [ ] التأكد من انتشار DNS
- [ ] تشغيل `init-ssl.sh` أو تكوين Traefik
- [ ] اختبار HTTPS على الدومين الرئيسي
- [ ] اختبار HTTPS على دومين الـ API
- [ ] التأكد من تجديد تلقائي للشهادات
- [ ] اختبار إعادة التوجيه من HTTP إلى HTTPS

## 6.6 النشر الأول
- [ ] التأكد من اكتمال المرحلة 1 (إصلاحات حرجة)
- [ ] التأكد من اكتمال المرحلة 2 (الأمان)
- [ ] رفع الكود إلى الخادم
- [ ] نسخ ملف `.env` إلى الخادم
- [ ] بناء Docker images: `docker compose build`
- [ ] تشغيل الخدمات: `docker compose up -d`
- [ ] التحقق من حالة الخدمات: `docker compose ps`
- [ ] اختبار `GET /health/live` → 200
- [ ] اختبار `GET /health/ready` → 200
- [ ] إنشاء حساب Admin عبر Docker exec
- [ ] اختبار Swagger على `https://API_DOMAIN/api-docs`
- [ ] اختبار الصفحة الرئيسية
- [ ] اختبار صفحة الكتالوج
- [ ] اختبار صفحة تفاصيل المنتج
- [ ] اختبار تسجيل الدخول
- [ ] اختبار لوحة الإدارة
- [ ] اختبار رفع صورة
- [ ] اختبار WhatsApp buttons
- [ ] اختبار على الهاتف

## 6.7 إعداد المراقبة
- [ ] التأكد من عمل Grafana dashboard
- [ ] التأكد من عمل Uptime monitoring
- [ ] إعداد alert لتعطل الـ API
- [ ] إعداد alert لاستهلاك عالٍ للذاكرة
- [ ] إعداد alert لمساحة القرص
- [ ] اختبار الـ alerts بمحاكاة خطأ
- [ ] توثيق خطوات استكشاف الأخطاء (runbook)

---

## ملخص التقدم

| المهمة | الحالة | ملاحظات |
|--------|--------|---------|
| 6.1 متغيرات البيئة | [ ] لم يبدأ | |
| 6.2 AWS S3 | [ ] لم يبدأ | |
| 6.3 MongoDB | [ ] لم يبدأ | |
| 6.4 Backup | [ ] لم يبدأ | |
| 6.5 SSL/HTTPS | [ ] لم يبدأ | |
| 6.6 النشر الأول | [ ] لم يبدأ | |
| 6.7 المراقبة | [ ] لم يبدأ | |

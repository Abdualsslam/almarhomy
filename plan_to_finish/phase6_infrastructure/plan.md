# 🚀 المرحلة 6: البنية التحتية والنشر

## الهدف
تهيئة البيئة الإنتاجية وضمان نشر آمن ومستقر.

## الأولوية: حرج 🔴
## الجهد المقدر: 1-2 يوم

---

## المهمة 6.1: تهيئة متغيرات البيئة الإنتاجية

### المتغيرات المطلوبة

| المتغير | الحالة | الإجراء |
|---------|--------|---------|
| `MONGODB_URI` | ⚠️ template | استخدام MongoDB Atlas أو URI إنتاجي |
| `JWT_SECRET` | ⚠️ template | توليد مفتاح عشوائي قوي (64+ حرف) |
| `AWS_ACCESS_KEY_ID` | ⚠️ فارغ | إنشاء IAM user في AWS |
| `AWS_SECRET_ACCESS_KEY` | ⚠️ فارغ | نفس الخطوة أعلاه |
| `S3_BUCKET` | ⚠️ template | إنشاء S3 bucket مع إعدادات مناسبة |
| `AWS_REGION` | ⚠️ template | تحديد المنطقة الأقرب |
| `DOMAIN` | ⚠️ template | الدومين الفعلي للموقع |
| `API_DOMAIN` | ⚠️ template | دومين الـ API |
| `REACT_APP_API_BASE_URL` | ⚠️ template | رابط API الكامل |
| `REACT_APP_WHATSAPP_NUMBER` | ⚠️ template | رقم WhatsApp الفعلي |
| `CERTBOT_EMAIL` | ⚠️ template | بريد للشهادات SSL |

### خطوات التنفيذ
1. إنشاء ملف `.env` للإنتاج (لا يُرفع على Git)
2. ملء جميع القيم بالبيانات الإنتاجية
3. التأكد من أن `.env` مدرج في `.gitignore`
4. توثيق جميع المتغيرات في `docs/environment.md`

---

## المهمة 6.2: إعداد AWS S3

### خطوات التنفيذ
1. إنشاء S3 bucket في المنطقة المناسبة
2. تكوين CORS policy للـ bucket
3. إنشاء IAM user مع صلاحيات محدودة (S3 only)
4. إنشاء bucket policy مناسبة
5. اختبار رفع ملف تجريبي
6. تكوين CloudFront CDN (اختياري لكن مُوصى)

### CORS Policy المقترحة
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["https://your-domain.com"],
    "ExposeHeaders": []
  }
]
```

---

## المهمة 6.3: إعداد MongoDB للإنتاج

### خطوات التنفيذ
1. إنشاء cluster على MongoDB Atlas (أو إعداد ReplicaSet)
2. إنشاء database user مع صلاحيات محدودة
3. تكوين Network Access (IP whitelist)
4. إنشاء حساب Admin الأول: `npm run create-admin`
5. إعداد backup تلقائي (Atlas يوفره مجاناً)
6. إعداد alerts للأداء

---

## المهمة 6.4: إعداد نظام Backup

### خطوات التنفيذ
1. إعداد MongoDB backup (إذا لم يكن Atlas)
   - Script: `mongodump --uri=$MONGODB_URI --out=/backup/$(date +%Y%m%d)`
   - جدولة يومية عبر cron
2. إعداد Redis backup (RDB snapshots)
3. إعداد S3 versioning للصور
4. اختبار عملية الاستعادة

---

## المهمة 6.5: إعداد SSL/HTTPS

### خطوات التنفيذ
1. تكوين DNS records (A records للدومين والـ API)
2. تشغيل `scripts/init-ssl.sh` للحصول على شهادات Let's Encrypt
3. التأكد من تجديد تلقائي للشهادات
4. اختبار HTTPS

### أو عبر Traefik/Coolify:
1. تكوين Traefik labels في Docker Compose (موجودة مسبقاً)
2. التأكد من أن network `platform-network` موجودة
3. اختبار الشهادات

---

## المهمة 6.6: النشر الأول

### خطوات التنفيذ
1. التأكد من اكتمال المرحلتين 1 و 2
2. رفع الكود إلى الخادم
3. نسخ ملف `.env` للخادم
4. بناء الصور:
   ```bash
   docker compose -f docker-compose.unified.prod.yml build
   ```
5. تشغيل الخدمات:
   ```bash
   docker compose -f docker-compose.unified.prod.yml up -d
   ```
6. التحقق من الحالة:
   ```bash
   docker compose -f docker-compose.unified.prod.yml ps
   ```
7. إنشاء حساب Admin:
   ```bash
   docker exec -it alrhomi-catalog-api node scripts/createAdmin.js
   ```
8. اختبار Health endpoints
9. اختبار Swagger
10. اختبار الموقع العام
11. اختبار لوحة الإدارة

---

## المهمة 6.7: إعداد المراقبة

### خطوات التنفيذ
1. التأكد من عمل Grafana dashboard
2. التأكد من عمل Uptime monitoring
3. إعداد alerts للـ API downtime
4. إعداد alerts لاستهلاك الذاكرة/المعالج
5. مراقبة logs عبر `docker compose logs -f`

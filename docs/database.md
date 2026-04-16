# Database Guide

## صورة سريعة

- **نوع قاعدة البيانات الأساسي:** MongoDB (عبر Mongoose/NestJS)
- **قاعدة PostgreSQL:** غير مستخدمة في هذا المشروع حاليا
- **اسم القاعدة (افتراضي):** `product-catalog`
- **سلسلة الاتصال:** `MONGODB_URI` (الأولوية القصوى)
- **الاستضافة المعتادة:** MongoDB Atlas (External) أو MongoDB محلي

## أين تُضبط إعدادات القاعدة؟

- ملف الإعداد: `backend/src/config/database.config.ts`
- الوحدة: `backend/src/database/database.module.ts`
- متغيرات البيئة:
  - `MONGODB_URI` (مفضل)
  - بدائل عند عدم وجود URI: `MONGO_ROOT_USERNAME`, `MONGO_ROOT_PASSWORD`, `MONGODB_HOST`, `MONGODB_PORT`, `MONGODB_DATABASE`

## أهم Collections

من `backend/src/database/schemas/*`:

- `users`: حسابات النظام (`username`, `email`, `role`)
- `categories`: الفئات الرئيسية/الفرعية (Self-reference عبر `parent`)
- `products`: بيانات المنتج الأساسية وربطه بالفئة/الصور
- `images`: الصور وروابط S3 وحالة المعالجة
- `jobstatuses` (JobStatus): تتبع حالة معالجة الصور في الطابور
- `folders`: تنظيم الصور في شجرة مجلدات

## العلاقات والبنية العامة

- `Category.parent -> Category._id` (علاقة أب/ابن)
- `Product.category -> Category._id`
- `Product.subcategory -> Category._id`
- `Product.images -> [Image._id]`
- `Product.similarProducts -> [Product._id]`
- `Image.product -> Product._id` (قد تكون `null`)
- `Image.folder -> Folder._id` (قد تكون `null`)
- `Folder.parent -> Folder._id` (شجرة مجلدات)
- `JobStatus.jobId` يطابق `Image.jobId` منطقيا لمتابعة تقدم المعالجة

## Indexes المهمة

- `products.productCode` فريد + مفهرس
- Text index على `products` للبحث (`productName`, `description`, `tags`, `note`, `productCode`)
- `categories.name` فريد + Text index على (`name`, `description`)
- `users.username` و`users.email` فريدان
- `jobstatuses.jobId` فريد

## Migrations / Schema Sync / Seeds

- **Migrations:** لا يوجد نظام migrations رسمي حاليا
- **Schema sync:** يعتمد على Mongoose schemas عند تشغيل التطبيق
- **Seeds:** لا يوجد seed شامل للبيانات
- **سكريبت مساعد:** إنشاء أدمن يدوي عبر:
  - `npm run create-admin`
  - السكريبت: `backend/scripts/createAdmin.js`

## Backup (MongoDB)

الأداة الرسمية: `mongodump`.

مثال نسخ احتياطي كامل (Archive + Gzip):

```bash
mongodump --uri="${MONGODB_URI}" --archive="backup-$(date +%F-%H%M).archive.gz" --gzip
```

مثال نسخ قاعدة واحدة بالاسم:

```bash
mongodump --uri="${MONGODB_URI}" --db="product-catalog" --archive="product-catalog.archive.gz" --gzip
```

توصيات تشغيلية:
- احتفظ بنسخ متعددة (daily/weekly)
- اختبر الاستعادة دوريا على بيئة staging
- احفظ النسخ في تخزين منفصل عن السيرفر (object storage)

## Restore (MongoDB)

الأداة الرسمية: `mongorestore`.

استعادة من archive:

```bash
mongorestore --uri="${MONGODB_URI}" --archive="product-catalog.archive.gz" --gzip --drop
```

> `--drop` يحذف الـ collections الحالية قبل الاستعادة.

استعادة بدون حذف مسبق (بحذر):

```bash
mongorestore --uri="${MONGODB_URI}" --archive="product-catalog.archive.gz" --gzip
```

## احتياطات قبل الاستعادة

نفّذ هذه القائمة قبل أي restore على production:

1. تأكد من أخذ backup جديد قبل أي تغيير.
2. فعّل maintenance window أو أوقف الكتابة على النظام مؤقتا.
3. تحقق أنك تعمل على البيئة الصحيحة (prod/staging).
4. إذا استخدمت `--drop` فتأكد من موافقة الفريق ووجود rollback plan.
5. بعد الاستعادة: تحقق من health + عينات بيانات + تسجيل الدخول + مسارات الصور.

## ملاحظة PostgreSQL (مرجعية عامة)

هذا المشروع لا يستخدم PostgreSQL حاليا، لكن كمرجعية:
- `pg_dump` مناسب للتصدير المتسق حتى أثناء الاستخدام.
- في الإنتاج غالبا لا يكفي وحده كاستراتيجية نسخ احتياطي دورية شاملة، ويُستكمل عادة بسياسات إضافية (PITR/WAL snapshots managed backups).

# Environment Variables

هذه الوثيقة توضح كل متغيرات البيئة المطلوبة بدون أي أسرار حقيقية داخل Git.

## القاعدة العامة

- لا تحفظ أي قيمة سرية في المستودع.
- استخدم `.env.example` كقالب فقط.
- القيم الفعلية للإنتاج تحفظ في Coolify Secrets (أو Secret Manager المؤسسة).

## Variables Matrix

| Variable | Required | Example Format | Environments | Source of Truth |
|---|---|---|---|---|
| `PROJECT_SLUG` | Yes | `alrhomi-catalog` | staging, prod | Coolify (Environment) |
| `NODE_ENV` | Yes | `production` | local, staging, prod | Coolify / local `.env` |
| `APP_PORT` | Yes | `5000` | local, staging, prod | Coolify / local `.env` |
| `DOMAIN` | Optional | `catalog.example.com` | prod | Coolify |
| `API_DOMAIN` | Optional | `api.catalog.example.com` | prod | Coolify |
| `FRONTEND_URL` | Yes | `https://catalog.example.com` | staging, prod | Coolify / local `.env` |
| `MONGODB_URI` | Yes (preferred) | `mongodb+srv://user:pass@cluster.mongodb.net/product-catalog` | local, staging, prod | Coolify Secret (prod), 1Password (handover), local `.env` |
| `MONGO_ROOT_USERNAME` | Optional* | `catalog_user` | local, staging | Secret Manager / local `.env` |
| `MONGO_ROOT_PASSWORD` | Optional* | `strong-password` | local, staging | Coolify Secret / Secret Manager |
| `MONGODB_HOST` | Optional* | `localhost` | local | local `.env` |
| `MONGODB_PORT` | Optional* | `27017` | local | local `.env` |
| `MONGODB_DATABASE` | Optional* | `product-catalog` | local, staging | local `.env` |
| `REDIS_URL` | Yes | `redis://redis:6379` | local, staging, prod | Coolify Secret / local `.env` |
| `JWT_SECRET` | Yes | `base64-or-random-long-secret` | staging, prod | Coolify Secret / Vault / Secret Manager |
| `JWT_EXPIRES_IN` | Yes | `15m` | local, staging, prod | Coolify / local `.env` |
| `REFRESH_TOKEN_EXPIRES_IN` | Yes | `7d` | local, staging, prod | Coolify / local `.env` |
| `REACT_APP_API_BASE_URL` | Yes | `https://api.catalog.example.com` | local, staging, prod | Coolify (build env) |
| `REACT_APP_WHATSAPP_NUMBER` | Optional | `967700000000` | local, staging, prod | Coolify / local `.env` |
| `AWS_REGION` | Yes (if image upload enabled) | `me-south-1` | staging, prod | Coolify |
| `AWS_ACCESS_KEY_ID` | Yes (if image upload enabled) | `AKIA...` | staging, prod | Coolify Secret / Secret Manager |
| `AWS_SECRET_ACCESS_KEY` | Yes (if image upload enabled) | `xxxxxxxx` | staging, prod | Coolify Secret / Vault |
| `S3_BUCKET` | Yes (if image upload enabled) | `catalog-assets` | staging, prod | Coolify |
| `CERTBOT_EMAIL` | Optional | `ops@example.com` | prod | Coolify |

\* Optional only when `MONGODB_URI` is provided. If no `MONGODB_URI`, these fields become required to build Mongo URI.

## Notes About Example Variables

المتغيرات التالية شائعة في مشاريع أخرى لكنها **غير مستخدمة حاليا في الكود**:
- `DATABASE_URL` (بديله الحالي هنا: `MONGODB_URI`)
- `S3_ENDPOINT` (غير مستخدم حاليا لأن التكامل مباشر مع AWS S3)
- `SENTRY_DSN` (غير مفعّل حاليا)

إذا تم إضافتها مستقبلا، أضفها في `.env.example` وحدث هذا الجدول مباشرة.

## Setup Quick Start

1. انسخ القالب:
```bash
cp .env.example .env
```
2. عبئ القيم من المصدر المعتمد (Coolify/Secret Manager/1Password).
3. لا تعمل commit لملف `.env`.

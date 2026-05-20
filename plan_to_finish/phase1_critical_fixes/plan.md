# 🔴 المرحلة 1: إصلاحات حرجة قبل النشر

## الهدف
إصلاح جميع المشاكل الحرجة التي تمنع النشر الآمن والوظيفي للمشروع.

## الأولوية: حرج 🔴
## الجهد المقدر: 2-3 أيام

---

## المهمة 1.1: إصلاح مشكلة رفع الصور (500 Error)

### المشكلة
رفع الصور يُرجع خطأ `500` من الباك إند. السبب المحتمل هو إعدادات S3 أو Redis/Queue.

### الملفات المتأثرة
- `backend/src/images/` - موديول الصور
- `backend/src/storage/` - خدمة التخزين (S3)
- `backend/src/queue/` - نظام الطوابير (Bull Queue)

### خطوات التنفيذ
1. فحص إعدادات S3 والتأكد من صحة المفاتيح
2. اختبار الاتصال بـ S3 بشكل مستقل
3. فحص إعدادات Redis Queue والتأكد من اتصال Bull
4. تتبع الخطأ عبر logs لتحديد النقطة الفاشلة
5. إضافة error handling أفضل في pipeline الرفع
6. اختبار الرفع بعد الإصلاح

### معايير القبول
- رفع صورة واحدة ينجح بدون أخطاء
- رفع صور متعددة يعمل بشكل صحيح
- الصور تظهر في لوحة الإدارة بعد المعالجة
- Watermark يُطبق بشكل صحيح

---

## المهمة 1.2: استبدال أرقام WhatsApp الثابتة

### المشكلة
رقم WhatsApp `967775017485` مكتوب بشكل ثابت (hardcoded) في عدة مكونات.

### الملفات المتأثرة
- `frontend/src/pages/HomePage.tsx` (سطر 412)
- `frontend/src/pages/ProductDetail.tsx` (سطر 591)
- `frontend/src/components/WhatsAppCTA.tsx`
- `frontend/src/components/AboutContactSection.tsx`

### خطوات التنفيذ
1. التأكد من تعريف `REACT_APP_WHATSAPP_NUMBER` في `.env`
2. إنشاء helper function لتوليد رابط WhatsApp
3. استبدال جميع الأرقام الثابتة بالمتغير البيئي
4. إضافة fallback في حال عدم وجود المتغير

### الكود المقترح
```typescript
// utils/whatsapp.ts
const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '967775017485';

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

---

## المهمة 1.3: إزالة console.log من كود الإنتاج

### الملفات المتأثرة
- `frontend/src/pages/admin/AdminDashboard.tsx` - 6 عبارات console.log
- ملفات أخرى قد تحتوي على console.log/console.error

### خطوات التنفيذ
1. البحث عن جميع console.log في الفرونت إند
2. إزالة عبارات التصحيح (debug logs)
3. الإبقاء على console.error فقط للأخطاء الحقيقية
4. (اختياري) إضافة eslint rule لمنع console.log

---

## المهمة 1.4: إزالة/تعطيل الروابط غير المفعّلة

### المشكلة
صفحة تسجيل الدخول تحتوي على روابط غير مفعّلة تُربك المستخدم.

### الملفات المتأثرة
- `frontend/src/pages/LoginPage.tsx` (أسطر 241-304)

### خطوات التنفيذ
1. إزالة رابط "نسيت كلمة المرور؟" أو إضافة رسالة "قريباً"
2. إزالة رابط "إنشاء حساب جديد" أو إضافة رسالة "تواصل مع الإدارة"
3. تنظيف التعليقات العربية في LoginPage

---

## المهمة 1.5: تنظيف التعليقات التطويرية

### الملفات المتأثرة
- `backend/Dockerfile` (سطر 47): تعليق عربي تطويري
- أي تعليقات TODO أو FIXME متبقية

### خطوات التنفيذ
1. البحث عن تعليقات TODO/FIXME/HACK
2. إزالة التعليقات التطويرية غير اللازمة
3. تنظيف Dockerfile

---

## المهمة 1.6: تحديث Swagger Server URL

### المشكلة
Swagger يحتوي على `https://<API_DOMAIN>` كعنوان template.

### الملفات المتأثرة
- `backend/src/main.ts` (سطر 80)

### خطوات التنفيذ
1. التأكد من أن `API_DOMAIN` مُعرّف في متغيرات البيئة
2. التحقق من أن Swagger يستخدم القيمة الفعلية (الكود الحالي يفعل ذلك فقط إذا كان apiDomain معرّف)
3. إزالة السطر الثابت `<API_DOMAIN>`

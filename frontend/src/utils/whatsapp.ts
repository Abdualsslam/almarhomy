const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '967775017485';

function cleanNumber(): string {
  return WHATSAPP_NUMBER.replace(/\D/g, '');
}

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${cleanNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildProductWhatsAppMessage(product: {
  productName?: string;
  productCode?: string;
  category?: string;
  model?: string;
  url?: string;
}): string {
  return [
    'مرحبًا، أريد الاستفسار عن المنتج:',
    product.productName ? `الاسم: ${product.productName}` : null,
    product.productCode ? `الكود: ${product.productCode}` : null,
    product.category ? `الفئة: ${product.category}` : null,
    product.model ? `الموديل: ${product.model}` : null,
    product.url ? `الرابط: ${product.url}` : null,
  ].filter(Boolean).join('\n');
}

export const WHATSAPP_CONTACT_NUMBER = WHATSAPP_NUMBER;
// utils/whatsapp.ts
const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '967775017485';

/**
 * generates a WhatsApp URL with an optional message
 * @param message The message to pre-fill in the WhatsApp chat
 * @returns A formatted WhatsApp URL
 */
export function getWhatsAppUrl(message?: string): string {
  // Clean the number from any non-digit characters
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  const base = `https://wa.me/${cleanNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_CONTACT_NUMBER = WHATSAPP_NUMBER;

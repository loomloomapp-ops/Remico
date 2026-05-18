import { ACTIVITY_TYPES, LeadPayload } from "./types";

export type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

export function validateLead(data: LeadPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name?.trim()) {
    errors.name = "Вкажіть ім'я";
  } else if (data.name.trim().length < 2) {
    errors.name = "Ім'я закоротке";
  }

  const phoneDigits = (data.phone || "").replace(/\D+/g, "");
  if (!data.phone?.trim()) {
    errors.phone = "Вкажіть номер телефону";
  } else if (phoneDigits.length < 9) {
    errors.phone = "Некоректний номер";
  }

  if (!data.activity_type) {
    errors.activity_type = "Оберіть тип діяльності";
  } else if (!ACTIVITY_TYPES.includes(data.activity_type)) {
    errors.activity_type = "Невірний тип діяльності";
  }

  if (!data.privacy) {
    errors.privacy = "Підтвердіть згоду з політикою конфіденційності";
  }

  return errors;
}

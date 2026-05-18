export type ActivityType =
  | "Магазин"
  | "Інтернет-магазин"
  | "Оптовик"
  | "Дилер"
  | "Мережа магазинів"
  | "Дистриб'ютор";

export const ACTIVITY_TYPES: ActivityType[] = [
  "Магазин",
  "Інтернет-магазин",
  "Оптовик",
  "Дилер",
  "Мережа магазинів",
  "Дистриб'ютор",
];

export interface LeadPayload {
  name: string;
  phone: string;
  activity_type: ActivityType | "";
  comment?: string;
  privacy: boolean;
  source?: string;
}

export interface LeadResponse {
  ok: boolean;
  error?: string;
}

import { parseISO, format } from "date-fns";
import { sv } from "date-fns/locale";

export function formatBookingDate(date: string): string {
  try {
    return format(parseISO(date), "EEEE d MMMM", { locale: sv });
  } catch {
    return date;
  }
}

import { format } from "date-fns";

export const ymd = (d: Date) => format(d, "yyyy-MM-dd");
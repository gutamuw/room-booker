const months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

export function formatDateRangeLabel(from?: string, to?: string): string {
  if (!from || !to) return "";
  const fromDay = Number(from.slice(8, 10));
  const toDay = Number(to.slice(8, 10));
  const month = Number(from.slice(5, 7));
  return `${fromDay}–${toDay} ${months[month - 1]}`;
}

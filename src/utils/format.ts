const pad = (n: number) => String(n).padStart(2, '0');

/** Formata uma data ISO como "15/11/2026 às 14:30". */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Formata uma data ISO como "14:30". */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "Hoje às 14:30", "Ontem às 09:10" ou "12/11/2026 às 08:00". */
export function formatRelative(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (sameDay(d, today)) return `Hoje às ${formatTime(iso)}`;
  if (sameDay(d, yesterday)) return `Ontem às ${formatTime(iso)}`;
  return formatDateTime(iso);
}

/** Saudação conforme a hora do dia. */
export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

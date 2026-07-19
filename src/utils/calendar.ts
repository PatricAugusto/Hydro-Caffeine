export function getMonthMatrix(year: number, month: number, firstDayOfWeek: 0 | 1 = 0): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;
  const start = new Date(year, month, 1 - startOffset);

  const weeks: Date[][] = [];
  const cursor = new Date(start);

  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
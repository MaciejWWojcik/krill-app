export function daysDiff(date1: Date, date2: Date): number {
  const oneDay = 1000 * 60 * 60 * 24;
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.round(diff / oneDay);
}

export function getNextMonth(date: Date): Date {
  if (date.getMonth() == 11) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
}

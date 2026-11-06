export interface UpcomingDate {
  id: string;
  weekday: string;
  day: string;
  month: string;
  label: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Returns the next `count` dates starting tomorrow. Using plain arrays keeps
 * the labels stable across platforms without relying on Intl.
 */
export function getUpcomingDates(count = 10, from: Date = new Date()): UpcomingDate[] {
  const dates: UpcomingDate[] = [];
  for (let index = 1; index <= count; index += 1) {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + index);
    const day = String(date.getDate()).padStart(2, '0');
    const month = MONTHS[date.getMonth()];
    const weekday = WEEKDAYS[date.getDay()];
    dates.push({
      id: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${day}`,
      weekday,
      day,
      month,
      label: `${weekday} ${date.getDate()} ${month}`,
    });
  }
  return dates;
}

export function formatLongDate(date: Date = new Date()): string {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

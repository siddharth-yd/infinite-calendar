import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths } from "date-fns";
import { JournalEntry } from "../types";

export function generateMonthDays(month: number, year: number) {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  return eachDayOfInterval({ start, end });
}

export function groupEntriesByDate(entries: JournalEntry[]) {
  const map: Record<string, JournalEntry[]> = {};
  entries.forEach(e => {
    const parsed = new Date(e.date); // safer for MM/DD/YYYY
    if (isNaN(parsed.getTime())) {
      console.error("Invalid date format in journal entry:", e.date, e);
      return; // skip invalid entries instead of breaking
    }
    const key = format(parsed, "yyyy-MM-dd");
    if (!map[key]) map[key] = [];
    map[key].push(e);
  });
  return map;
}
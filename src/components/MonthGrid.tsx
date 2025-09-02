import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { generateMonthDays } from "../utils/dateUtils";
import { JournalEntry } from "../types";
import JournalEntryComp from "./JournalEntry";

interface Props {
  date: Date;
  entries: Record<string, JournalEntry[]>;
  onEntryClick: (entry: JournalEntry, dayKey: string) => void;
}

export default function MonthGrid({ date, entries, onEntryClick }: Props) {
  const days = generateMonthDays(date.getMonth(), date.getFullYear());

  const weeks = [];
  let start = startOfWeek(days[0]);
  let end = endOfWeek(days[days.length - 1]);
  const fullDays = eachDayOfInterval({ start, end });

  for (let i = 0; i < fullDays.length; i += 7) {
    weeks.push(fullDays.slice(i, i + 7));
  }

  return (
    <div className="p-4 border-b border-gray-200">
      {/* Weekday header row (sticky inside month grid) */}
      <div className="grid grid-cols-7 gap-1 bg-white top-12 z-10 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-bold text-gray-600 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 mt-1">
        {weeks.flat().map((day) => {
          const key = format(day, "yyyy-MM-dd");
          const isCurrentMonth = day.getMonth() === date.getMonth();
          return (
            <div
              key={key}
              className={`h-24 border text-sm flex flex-col p-1 overflow-hidden bg-white ${
                !isCurrentMonth ? "text-gray-400 bg-gray-50" : ""
              }`}
            >
              <div className="text-xs font-semibold">{format(day, "d")}</div>
              <div className="overflow-y-auto space-y-1">
                {entries[key]?.map((entry, i) => (
                  <JournalEntryComp
                    key={i}
                    entry={entry}
                    onClick={() => onEntryClick(entry, key)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
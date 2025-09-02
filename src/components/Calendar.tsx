import { useEffect, useRef, useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import journals from "../data/journals.json";
import { groupEntriesByDate } from "../utils/dateUtils";
import MonthGrid from "./MonthGrid";
import Header from "./Header";
import { JournalEntry } from "../types";
import JournalModal from "./JournalModal";

const entryMap = groupEntriesByDate(journals as JournalEntry[]);

export default function Calendar() {
  const [months, setMonths] = useState(() => {
    const now = new Date();
    return [
      { id: 0, date: subMonths(now, 1) },
      { id: 1, date: now },
      { id: 2, date: addMonths(now, 1) },
    ];
  });

  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "MMMM yyyy"));
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Modal state
  const [openEntry, setOpenEntry] = useState<JournalEntry | null>(null);
  const [openDayKey, setOpenDayKey] = useState<string | null>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    let mostVisible: { ratio: number; month: Date } = { ratio: 0, month: new Date() };

    children.forEach((child) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const ratio = visibleHeight / rect.height;
      if (ratio > mostVisible.ratio) {
        mostVisible = { ratio, month: new Date((child as HTMLElement).dataset.date!) };
      }
    });

    setCurrentMonth(format(mostVisible.month, "MMMM yyyy"));
  };

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entriesObs) => {
      entriesObs.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const date = new Date(target.dataset.date!);
          if (target.dataset.pos === "start") {
            // prepend
            setMonths((prev) => [
              { id: prev[0].id - 1, date: subMonths(date, 1) },
              ...prev,
            ]);
          } else if (target.dataset.pos === "end") {
            // append
            setMonths((prev) => [
              ...prev,
              { id: prev[prev.length - 1].id + 1, date: addMonths(date, 1) },
            ]);
          }
        }
      });
    }, { threshold: 0.1 });

    const container = containerRef.current;
    if (container) {
      Array.from(container.children).forEach((c) => observer.observe(c));
    }

    return () => observer.disconnect();
  }, [months]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header currentMonth={currentMonth} />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-scroll scroll-smooth"
      >
        {months.map((m, idx) => (
          <div
            key={m.id}
            data-date={m.date.toISOString()}
            data-pos={idx === 0 ? "start" : idx === months.length - 1 ? "end" : ""}
          >
            <MonthGrid
              date={m.date}
              entries={entryMap}
              onEntryClick={(entry, dayKey) => {
                setOpenEntry(entry);
                setOpenDayKey(dayKey);
              }}
            />
          </div>
        ))}
      </div>

      {openEntry && openDayKey && (
        <JournalModal
          entries={entryMap[openDayKey] || []}
          current={openEntry}
          onClose={() => {
            setOpenEntry(null);
            setOpenDayKey(null);
          }}
        />
      )}
    </div>
  );
}
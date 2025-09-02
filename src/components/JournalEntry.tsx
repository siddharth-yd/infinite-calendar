import { JournalEntry } from "../types";

export default function JournalEntryComp({
  entry,
  onClick,
}: {
  entry: JournalEntry;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative rounded-md overflow-hidden shadow-sm hover:scale-105 transition-transform bg-white"
    >
      <div className="w-full h-20 flex items-center justify-center bg-gray-50">
        <img
          src={entry.imgUrl}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-[2px]">
        {/* Stars */}
        <div className="text-[10px] text-blue-500 leading-none">
          {"⭐".repeat(Math.round(entry.rating))}
        </div>
        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-0.5">
          {entry.categories.slice(0, 1).map((cat, i) => (
            <span
              key={i}
              className="px-1 py-[1px] text-[8px] rounded bg-purple-100 text-purple-600"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
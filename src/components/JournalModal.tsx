import { useSwipeable } from "react-swipeable";
import { JournalEntry } from "../types";
import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

export default function JournalModal({
  entries,
  current,
  onClose,
}: {
  entries: JournalEntry[];
  current: JournalEntry;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(
    entries.findIndex(
      (e) => e.date === current.date && e.description === current.description
    )
  );

  const [direction, setDirection] = useState<"left" | "right">("left");

  const next = () => {
    if (index < entries.length - 1) {
      setDirection("left");
      setIndex((i) => i + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection("right");
      setIndex((i) => i - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  // Animate active entry slide
  const transitions = useTransition(index, {
    key: index,
    from:
      direction === "left"
        ? { transform: "translateX(100%)", opacity: 1 }
        : { transform: "translateX(-100%)", opacity: 1 },
    enter: { transform: "translateX(0%)", opacity: 1 },
    leave:
      direction === "left"
        ? { transform: "translateX(-100%)", opacity: 1 }
        : { transform: "translateX(100%)", opacity: 1 },
    config: { tension: 280, friction: 30 },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        {...handlers}
        className="relative w-full max-w-md h-[90%] overflow-hidden rounded-lg"
      >
        {transitions((style, i) => {
          const item = entries[i];
          return (
            <animated.div
              style={style}
              className="absolute inset-0 bg-white shadow-lg rounded-lg flex flex-col"
            >
              {/* Close */}
              <button
                className="absolute right-3 top-2 text-xl font-bold"
                onClick={onClose}
              >
                ✖
              </button>

              {/* Image */}
              <img
                src={item.imgUrl}
                alt=""
                className="w-full max-h-64 object-contain rounded-t-lg bg-gray-100"
              />

              <div className="p-4 flex-1 flex flex-col">
                {/* Rating */}
                <div className="text-blue-500 text-sm">
                  {"⭐".repeat(Math.round(item.rating))}
                </div>

                {/* Date */}
                <div className="font-semibold text-gray-700 mt-1">
                  {item.date}
                </div>

                {/* Description */}
                <p className="mt-2 text-gray-700 text-sm flex-1 overflow-y-auto">
                  {item.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.categories.map((cat, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-600"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>
    </div>
  );
}
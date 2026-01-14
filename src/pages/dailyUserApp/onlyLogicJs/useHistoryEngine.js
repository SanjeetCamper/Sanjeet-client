import { useMemo, useState, useRef } from "react";
import {
  isToday,
  isThisWeek,
  isThisMonth,
} from "../../../utils/dateFilters.js";

const FILTERS = ["Today", "This Week", "This Month", "Custom"];

export const useHistoryEngine = (history = []) => {
  const [filter, setFilter] = useState("Today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔹 swipe helpers (optional)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const minSwipeDistance = 50;

  // ✅ FILTER
  const filteredHistory = useMemo(() => {
    if (!history.length) return [];

    return history.filter((entry) => {
      const entryTime = new Date(entry.entryDate || entry.createdAt).getTime();

      if (filter === "Today") return isToday(entry.entryDate);
      if (filter === "This Week") return isThisWeek(entry.entryDate);
      if (filter === "This Month") return isThisMonth(entry.entryDate);

      if (filter === "Custom") {
        if (!fromDate || !toDate) return false;

        const from = new Date(fromDate).setHours(0, 0, 0, 0);
        const to = new Date(toDate).setHours(23, 59, 59, 999);

        return entryTime >= from && entryTime <= to;
      }

      return true;
    });
  }, [history, filter, fromDate, toDate]);

  // ✅ SORT (latest first)
  const sortedHistory = useMemo(() => {
    return [...filteredHistory].sort(
  (a, b) =>
    new Date(b.entryDate || b.createdAt) -
    new Date(a.entryDate || a.createdAt)
)

  }, [filteredHistory]);

  // ✅ GROUP BY DATE
  const groupedHistory = useMemo(() => {
    return sortedHistory.reduce((acc, entry) => {
      const dateKey = new Date(
        entry.entryDate || entry.createdAt
      ).toDateString();

      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(entry);
      return acc;
    }, {});
  }, [sortedHistory]);

  const sortedDateGroups = useMemo(() => {
    return Object.entries(groupedHistory).sort(
      ([a], [b]) => new Date(b) - new Date(a)
    );
  }, [groupedHistory]);

  // ✅ EMPTY STATES
  const isLifetimeEmpty = history.length === 0;
  const isFilterEmpty = !isLifetimeEmpty && sortedDateGroups.length === 0;

  // ✅ SWIPE HANDLERS
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    // if (filter === "Custom") return;

    const dx = touchStartX.current - touchEndX.current;
    const dy = touchStartY.current - touchEndY.current;

    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < minSwipeDistance) return;

    const index = FILTERS.indexOf(filter);

    if (dx > 0 && index < FILTERS.length - 1) {
      setFilter(FILTERS[index + 1]);
    }

    if (dx < 0 && index > 0) {
      setFilter(FILTERS[index - 1]);
    }
  };

  return {
    // data
    filter,
    fromDate,
    toDate,
    sortedDateGroups,

    // setters
    setFilter,
    setFromDate,
    setToDate,

    // states
    isLifetimeEmpty,
    isFilterEmpty,

    // swipe
    onTouchStart,
    onTouchMove,
    onTouchEnd,

    FILTERS,
  };
};

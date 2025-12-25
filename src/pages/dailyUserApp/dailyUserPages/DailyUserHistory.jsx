import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
import DailyUserHistoryFilterBar from "../dailyUserComponents/dailyUserHistory/DailyUserHistoryFilterBar.jsx";
import DailyUserHistoryDateGroup from "../dailyUserComponents/dailyUserHistory/DailyUserHistoryDateGroup.jsx";
import {
  isToday,
  isThisWeek,
  isThisMonth,
} from "../../../utils/dateFilters.js";
import FullPageLoader from '../../../components/FullPageLoader.jsx'

const DailyUserHistory = () => {
  const { history, loading } = useDailyUser();
  const [filter, setFilter] = useState("Today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [minuteTick, setMinuteTick] = useState(0);
  const todayRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setMinuteTick((v) => v + 1);
    }, 60000); // every 1 minute

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ STEP A: FILTER
  const filteredHistory = useMemo(() => {
    if (!history) return [];

    return history.filter((entry) => {
      const entryTime = new Date(entry.date).getTime();

      if (filter === "Today") return isToday(entry.date);
      if (filter === "This Week") return isThisWeek(entry.date);
      if (filter === "This Month") return isThisMonth(entry.date);

      if (filter === "Custom") {
        if (!fromDate || !toDate) return true;

        const from = new Date(fromDate).setHours(0, 0, 0, 0);
        const to = new Date(toDate).setHours(23, 59, 59, 999);

        return entryTime >= from && entryTime <= to;
      }

      return true;
    });
  }, [history, filter, fromDate, toDate]);
  // ✅ STEP B: SORT (latest first)
  const sortedHistory = useMemo(() => {
    return [...filteredHistory].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredHistory]);

  // ✅ STEP C: GROUP by DATE
  const groupedHistory = useMemo(() => {
    return sortedHistory.reduce((acc, entry) => {
      const dateKey = new Date(entry.date || entry.createdAt).toDateString();
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(entry);
      return acc;
    }, {});
  }, [sortedHistory]);

  const sortedDateGroups = useMemo(() => {
    return Object.entries(groupedHistory).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA) // 👈 latest date first
    );
  }, [groupedHistory]);

  if (loading) {
    return <FullPageLoader />;
  }

  if (!history || history.length === 0) {
    return <div className="px-4 pt-6 text-sm">No entries found</div>;
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      <DailyUserHistoryFilterBar active={filter} onChange={setFilter} />

      {filter === "Custom" && (
        <div className="bg-white border rounded-xl p-3 flex gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />

          {/* 🔄 CLEAR BUTTON */}
          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              setFilter("Today");
            }}
            className="flex-1 text-xs text-gray-600 py-2 border rounded-lg active:bg-gray-50"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* {groupedHistory &&
        sortedDateGroups.map(([date, entries]) => (
        
          <div>
            <DailyUserHistoryDateGroup
            key={date}
            date={date}
            entries={entries}
            minuteTick={minuteTick}
            scrolle={scrolled}
          />
          </div>
        ))} */}

      {sortedDateGroups &&
        sortedDateGroups.map(([date, entries]) => {
          const isToday =
            new Date(date).toDateString() === new Date().toDateString();

          return (
            <div ref={isToday ? todayRef : null} key={date}>
              <DailyUserHistoryDateGroup
                date={date}
                entries={entries}
                minuteTick={minuteTick}
                scrolle={scrolled}
              />

              <button
                onClick={() =>
                  todayRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="fixed bottom-24 right-4 bg-[#21c4cc] text-white text-xs px-4 py-2 rounded-full shadow-lg z-50"
              >
                Today
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default DailyUserHistory;

import React, { useEffect, useRef, useState } from "react";
import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
import { useHistoryEngine } from "../onlyLogicJs/useHistoryEngine.js";
import BackButton from '../../../components/BackButton.jsx'
import DailyUserHistoryFilterBar from "../dailyUserComponents/dailyUserHistory/DailyUserHistoryFilterBar.jsx";
import DailyUserHistoryDateGroup from "../dailyUserComponents/dailyUserHistory/DailyUserHistoryDateGroup.jsx";
import FullPageLoader from "../../../components/FullPageLoader.jsx";

const DailyUserEntryHistory = () => {
  const { history, loading } = useDailyUser();

  const {
    filter,
    setFilter,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    slideDir,
    sortedDateGroups,
    isLifetimeEmpty,
    isFilterEmpty,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    FILTERS,
  } = useHistoryEngine(history);

  const [scrolled, setScrolled] = useState(false);
  const [minuteTick, setMinuteTick] = useState(0);
  const todayRef = useRef(null);

  // ⏱ minute refresh (for "time ago")
  useEffect(() => {
    const id = setInterval(() => setMinuteTick((v) => v + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // 📜 scroll shadow for sticky headers
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filter]);

  // ⏳ LOADING
  if (loading) {
    return <FullPageLoader value="History Loading" />;
  }

  // ❌ NO HISTORY EVER
  if (isLifetimeEmpty) {
    return <div className="px-4 pt-6 text-sm">No entries found</div>;
  }

  return (
    <div
      className="h-screen px-4 pt-4 pb-24 space-y-4"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      <BackButton />

      {/* FILTER BAR */}
      <div className="">
        <DailyUserHistoryFilterBar
          active={filter}
          onChange={(next) => setFilter(next)}
        />
      </div>

      {/* CUSTOM DATE FILTER */}
      {filter === "Custom" && (
        <div className="bg-white border border-gray-300 shadow rounded-xl p-3 flex gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
          />

          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              setFilter("Today");
            }}
            className="flex-1 text-xs text-gray-600 py-2 border border-gray-300 rounded-lg active:bg-gray-50"
          >
            Clear
          </button>
        </div>
      )}

      {/* HISTORY LIST */}
      <div
        key={filter}
        className={`transition-all duration-300 ease-out pb-20
          ${slideDir === "left" ? "animate-slide-left" : "animate-slide-right"}
        `}
      >
        {isFilterEmpty ? (
          <div className="text-center text-xs text-gray-400 mt-8">
            {filter === "Today" && "No entries for today"}
            {filter === "This Week" && "No entries for this week"}
            {filter === "This Month" && "No entries for this month"}
            {filter === "Custom" && "No entries for selected dates"}
          </div>
        ) : (
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

                {isToday && (
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
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DailyUserEntryHistory;

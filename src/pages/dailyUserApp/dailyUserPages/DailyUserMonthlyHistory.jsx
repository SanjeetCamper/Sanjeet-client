import React, { useMemo , useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
import DailyUserHistoryDateGroup from "../dailyUserComponents/dailyUserHistory/DailyUserHistoryDateGroup.jsx";
import { getMonthName } from "../../../utils/monthUtils.js";
import { useRef } from "react";
import ExportReportModal from '../exportCsvPdf/ExportReportModal.jsx'
import ExportButton from "../exportCsvPdf/ExportButton.jsx";

const DailyUserMonthlyHistory = () => {
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const onTouchEnd = () => {
    const dx = touchStartX.current - touchEndX.current;
    const dy = touchStartY.current - touchEndY.current;

    // vertical scroll ignore
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < minSwipeDistance) return;

    if (dx > 0) goNext(); // swipe left → next month
    if (dx < 0) goPrev(); // swipe right → prev month
  };

  const { year, month } = useParams(); // month = 1–12
  const navigate = useNavigate();
  const { history, loading } = useDailyUser();

  const y = Number(year);
  const m = Number(month) - 1; // 0-based

  const now = new Date();
  const isFuture =
    y > now.getFullYear() || (y === now.getFullYear() && m > now.getMonth());

  // 🔹 prev / next month calculation
  const goPrev = () => {
    const prevMonth = m === 0 ? 12 : m;
    const prevYear = m === 0 ? y - 1 : y;
    navigate(`/dailyuser/app/history/month/${prevYear}/${prevMonth}`);
  };

  const goNext = () => {
    if (isFuture) return;

    const nextMonth = m === 11 ? 1 : m + 2;
    const nextYear = m === 11 ? y + 1 : y;
    navigate(`/dailyuser/app/history/month/${nextYear}/${nextMonth}`);
  };

  // 🔹 filter month data
  const filtered = useMemo(() => {
    if (!history) return [];
    return history.filter((e) => {
      const d = new Date(e.date || e.createdAt);
      return d.getFullYear() === y && d.getMonth() === m;
    });
  }, [history, y, m]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, entry) => {
      const key = new Date(entry.date || entry.createdAt).toDateString();
      acc[key] = acc[key] || [];
      acc[key].push(entry);
      return acc;
    }, {});
  }, [filtered]);

  const sortedGroups = useMemo(() => {
    return Object.entries(grouped).sort(
      ([a], [b]) => new Date(b) - new Date(a)
    );
  }, [grouped]);

  const monthSummary = useMemo(() => {
    let entries = 0;
    let total = 0;
    let received = 0;

    filtered.forEach((e) => {
      entries++;
      total += e.totalAmount || 0;
      received += e.paymentReceived || 0;
    });

    return {
      entries,
      total,
      received,
      pending: total - received,
    };
  }, [filtered]);

  if (loading) {
    return <div className="p-4 text-sm">Loading...</div>;
  }

  return (
    <div
      className="px-4 pt-4 pb-24 space-y-4"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* 🔹 MONTH SWITCHER */}
      <div className="flex items-center justify-between bg-white border rounded-xl px-3 py-2">
        <button onClick={goPrev} className="p-1 active:scale-95">
          <ChevronLeft size={18} />
        </button>

        <p className="text-sm font-semibold text-gray-700">
          {getMonthName(m)} {y}
        </p>

        <button
          onClick={goNext}
          disabled={isFuture}
          className={`p-1 active:scale-95 ${isFuture ? "opacity-30" : ""}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {filtered.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-3 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {monthSummary.entries}
            </p>
            <p className="text-[11px] text-gray-500">Entries</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-green-600">
              ₹ {monthSummary.total}
            </p>
            <p className="text-[11px] text-gray-500">Total</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-600">
              ₹ {monthSummary.received}
            </p>
            <p className="text-[11px] text-gray-500">Paid</p>
          </div>

          <div>
            <p
              className={`text-sm font-semibold ${
                monthSummary.pending > 0 ? "text-red-600" : "text-gray-400"
              }`}
            >
              ₹ {monthSummary.pending}
            </p>
            <p className="text-[11px] text-gray-500">Pending</p>
          </div>
        </div>
      )}

      {/* 🔹 MONTH CONTENT */}
      {!filtered.length ? (
        <div className="text-center text-xs text-gray-400 mt-8">
          No entries for this month
        </div>
      ) : (
        sortedGroups.map(([date, entries]) => (
          <DailyUserHistoryDateGroup key={date} date={date} entries={entries} />
        ))
      )}

      <ExportButton history={history} />

    </div>
  );
};

export default DailyUserMonthlyHistory;

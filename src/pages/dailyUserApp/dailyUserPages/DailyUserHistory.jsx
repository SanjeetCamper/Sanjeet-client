import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ClipboardList, Lock } from "lucide-react";
import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
import DailyUserMonthlySummaryCard from "../dailyUserComponents/dailyUserHistory/DailyUserMonthlySummaryCard.jsx";

const timeAgo = (date) => {
  if (!date) return "";
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const DailyUserHistory = () => {
  const { history } = useDailyUser();

  // 🔹 entries today
  const todayCount = useMemo(() => {
    if (!history?.length) return 0;
    const today = new Date().toDateString();
    return history.filter(
      (e) => new Date(e.date || e.entryDate).toDateString() === today
    ).length;
  }, [history]);

  // 🔹 last updated
  const lastUpdated = useMemo(() => {
    if (!history?.length) return null;
    return history[0].createdAt;
  }, [history]);

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      <h1 className="text-sm font-semibold text-gray-700">History</h1>

      {/* ✅ ENTRY HISTORY */}
      <NavLink
        to="/dailyuser/app/history/entry-page"
        className="block bg-white border border-gray-200 rounded-2xl p-4 active:scale-[0.98] transition"
      >
        <div className="flex items-start gap-3">
          <div className="bg-[#21c4cc]/10 p-2 rounded-xl">
            <ClipboardList size={18} className="text-[#21c4cc]" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Entry History</p>

            <p className="text-xs text-gray-500 mt-1">
              Daily camper entries & payments
            </p>

            <div className="flex items-center gap-2 mt-2">
              {todayCount > 0 && (
                <span className="text-[10px] bg-[#21c4cc]/10 text-[#21c4cc] px-2 py-0.5 rounded-full">
                  {todayCount} entries today
                </span>
              )}

              {lastUpdated && (
                <span className="text-[10px] text-gray-400">
                  Updated {timeAgo(lastUpdated)}
                </span>
              )}
            </div>
          </div>
        </div>
      </NavLink>

      <DailyUserMonthlySummaryCard history={history} />

      {/* 🔒 COMING SOON CARD */}
      <div className="relative bg-gray-100 border border-dashed border-gray-300 rounded-2xl p-4 opacity-70">
        <div className="flex items-start gap-3">
          <div className="bg-gray-200 p-2 rounded-xl">
            <Lock size={18} className="text-gray-500" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">Payment History</p>
            <p className="text-xs text-gray-500 mt-1">
              Detailed payment & settlement logs
            </p>

            <span className="inline-block mt-2 text-[10px] bg-gray-300 text-gray-600 px-2 py-0.5 rounded-full">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyUserHistory;

import { Calendar1, NonBinary } from "lucide-react";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DailyUserMonthlySummaryCard = ({ history = [] }) => {
  const navigate = useNavigate();

  const now = new Date();
  const month = now.getMonth(); // 0-based
  const year = now.getFullYear();

  const summary = useMemo(() => {
    let totalEntries = 0;
    let totalAmount = 0;
    let totalReceived = 0;

    history.forEach((e) => {
      const d = new Date(e.date || e.entryDate);
      if (d.getMonth() === month && d.getFullYear() === year) {
        totalEntries++;
        totalAmount += e.totalAmount || 0;
        totalReceived += e.paymentReceived || 0;
      }
    });

    return {
      totalEntries,
      totalAmount,
      pending: totalAmount - totalReceived,
    };
  }, [history, month, year]);

  // if () return null;

  return (
    <div>
      {summary.totalEntries === 0 ? (
        <div className="flex gap-3 items-center bg-white border w-full px-5 py-6 border-gray-200 rounded-2xl">
          <div className="bg-[#21c4cc]/10 p-2 rounded-xl">
            <Calendar1 size={18} className="text-[#21c4cc]" />
          </div>
          <div>
            <p className="text-[13px]"> No Monthly Summary</p>
            <p className="text-xs text-gray-500">Monthly Dashboard</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() =>
            navigate(`/dailyuser/app/history/month/${year}/${month + 1}`)
          }
          className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition"
        >
          <div className="bg-[#21c4cc]/10 p-2 rounded-xl">
            <Calendar1 size={18} className="text-[#21c4cc]" />
          </div>
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-2">This Month Summary</p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {summary.totalEntries}
                </p>
                <p className="text-[11px] text-gray-500">Entries</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-green-600">
                  ₹ {summary.totalAmount}
                </p>
                <p className="text-[11px] text-gray-500">Total</p>
              </div>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    summary.pending > 0 ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  ₹ {summary.pending}
                </p>
                <p className="text-[11px] text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyUserMonthlySummaryCard;

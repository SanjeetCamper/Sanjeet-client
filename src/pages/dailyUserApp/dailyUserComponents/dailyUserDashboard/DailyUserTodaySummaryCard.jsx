import React from "react";
import { Droplets, IndianRupee } from "lucide-react";
import { useDailyUser } from "../../dailyUserContext/DailyUserContext";

const DailyUserTodaySummaryCard = () => {
  const{ todaySummary = { totalQuantity: 0, totalAmount: 0 } , } = useDailyUser() ;

  if (!todaySummary) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 my-4">
        <p className="text-sm text-gray-500">
          No entry for today
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 my-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Today Summary
      </h3>

      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Droplets size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Campers</p>
            <p className="text-sm font-semibold">
              {todaySummary.totalQuantity}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <IndianRupee size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-sm font-semibold">
              ₹ {todaySummary.totalAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyUserTodaySummaryCard;

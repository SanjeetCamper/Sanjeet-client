import React from "react";
// import { useDailyUser } from "../../dailyUserContext/DailyUserContext";

const DashboardShowCard = ({summary }) => {
  // const{ todaySummary = { totalQuantity: 0, totalAmount: 0 } , } = useDailyUser ;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Camper Balance</p>
          <p className="text-lg font-semibold">{summary.camperBalance}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs text-gray-500">Pending Amount</p>
          <p className="text-lg font-semibold text-red-600">
            ₹ {summary.pendingAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardShowCard;

import React from "react";
import { Info } from "lucide-react";

const DailyUserInfoCard = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <Info size={18} className="text-yellow-600 mt-1" />
        <div>
          <p className="text-sm font-medium text-yellow-800">
            Important Notice
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            This dashboard shows your daily water supply summary.
            For any correction, please contact admin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyUserInfoCard;

import React from "react";
import { ChevronRight } from "lucide-react";

const DailyUserSettingItems = ({ icon: Icon, label, value, onClick, danger ,place }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-4 active:bg-gray-50 transition ${
        danger ? "text-red-600" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <div className="text-left">
          <p className="text-sm font-medium">{label}</p>
          {value && (
            <p className="text-xs text-gray-500">{value}</p>
          )}
          {place && (
            <p className="text-xs text-gray-500">{place}</p>
          )}
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
};

export default DailyUserSettingItems;

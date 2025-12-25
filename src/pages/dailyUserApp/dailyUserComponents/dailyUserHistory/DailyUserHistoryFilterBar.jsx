import React from "react";

const filters = ["Today", "This Week", "This Month", "Custom"];

const DailyUserHistoryFilterBar = ({ active, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
            active === f
              ? "bg-[#21c4cc] text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default DailyUserHistoryFilterBar;

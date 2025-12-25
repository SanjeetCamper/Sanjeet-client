import React from "react";

const DailyUserSettingSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        {title}
      </h2>
      <div className="bg-white rounded-xl border border-gray-200 divide-y">
        {children}
      </div>
    </div>
  );
};

export default DailyUserSettingSection;

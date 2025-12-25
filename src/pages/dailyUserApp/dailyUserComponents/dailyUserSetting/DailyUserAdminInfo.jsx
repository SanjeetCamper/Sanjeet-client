import React from "react";
import DailyUserSettingSection from "./DailyUserSettingSection";
import DailyUserSettingItems from "./DailyUserSettingItems";
import {Info} from "lucide-react";

const DailyUserAdminInfo = () => {
  return (
    <div className=" px-4 pt-4 pb-20 bg-white min-h-screen overflow-auto">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Admin/Owner Information</h1>
      {/* NOTIFICATIONS */}
      <DailyUserSettingSection title="Owner/Admin">
        <DailyUserSettingItems
          icon={Info}
          label="Sanjeet Water Supplier"
          value={`Contact - 7489089302 , 8982621556 , 7067418473`}
          place={"Email - sanjeethelpline@gmail.com"}
          //   onClick={() => {}}
        />
      </DailyUserSettingSection>
    </div>
  );
};

export default DailyUserAdminInfo;

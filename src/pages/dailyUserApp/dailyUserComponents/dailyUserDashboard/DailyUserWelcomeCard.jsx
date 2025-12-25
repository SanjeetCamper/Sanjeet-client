import React from "react";
import { User } from "lucide-react";

const DailyUserWelcomeCard = ({dailyUser}) => {
  const name = dailyUser?.name;
  const type = dailyUser?.type;

  return (
    <div className="bg-[#08cfbe] text-white rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="bg-white/20 p-2 rounded-full">
          <User size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>

        <div>
          <p className="text-xs opacity-90">
            {type === "cash" ? "Cash User" : "Online Plan User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyUserWelcomeCard;

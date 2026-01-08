import { BugPlay, Crown, Plane } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MembershipPlanPurchaseBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 items-start bg-[#21c4cc] text-white rounded-2xl p-4">
      <div>
        <div className="bg-white p-2 rounded-full">
          <Crown size={18} className="text-[#21c4cc]"/>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Purchase Daily Membership Plan</h2>
        <p className="text-xs opacity-90 mt-1">For Batter Discount & Online Reports</p>

        <button
          onClick={() => navigate("/dashboard/membership/plans")}
          className="mt-3 bg-white text-[#21c4cc] text-xs font-medium px-4 py-2 rounded-full"
        >
          Buy Membership
        </button>
      </div>
    </div>
  );
};

export default MembershipPlanPurchaseBanner;

import { useEffect, useMemo, useState } from "react";
import { useMembership } from "../context/MembershipContext.jsx";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader.jsx";
import BackButton from "../components/BackButton.jsx";

const DURATIONS = [
  { label: "1 Day", days: 1 },
  { label: "1 Month", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "12 Months", days: 360 },
];

const CAMPER_OPTIONS = [1, 2, 3, 4, 5];

const MembershipPlans = () => {
  const { plans, loading, error, buyMembership, activeMembership } =
    useMembership();
  const navigate = useNavigate();

  const [durationDays, setDurationDays] = useState(30);
  const [campersPerDay, setCampersPerDay] = useState(1);
  const [uiError, setUiError] = useState(null);

  const selectedPlan = useMemo(() => {
    return plans.find(
      (p) =>
        p.durationDays === durationDays && p.campersPerDay === campersPerDay,
    );
  }, [plans, durationDays, campersPerDay]);

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    return durationDays * campersPerDay * selectedPlan.pricePerCamper;
  }, [selectedPlan, durationDays, campersPerDay]);

  useEffect(() => {
    setUiError(null);
  }, [durationDays, campersPerDay]);

  if (loading) {
    return <FullPageLoader value="Loading Plans...." />;
  }

  return (
    <div className="fixed top-0 left-0 z-100 w-full p-4 py-4 space-y-3 bg-white h-screen">
      <div className="mx-auto w-full max-w-md space-y-5 h-screen pb-10 pt-0 p-4 overflow-y-auto">
        <BackButton />
        

        {activeMembership ? (
          <p className="text-xs bg-green-50 text-green-700 p-2 rounded-lg border border-green-200">
            You already have an active membership.
          </p>
        ) : (
          <p className="text-xs bg-blue-50 text-blue-700 p-2 rounded-lg border border-blue-200">
            You don't have any active membership.
          </p>
        )}

        <h1 className="text-[12px] font-semibold text-gray-500">
          CHOOSE YOUR MEMBERSHIP
        </h1>

        {(error || uiError) && (
          <p className="text-xs bg-red-50 text-red-600 p-2 rounded-lg border border-red-200">
            {error || uiError}
          </p>
        )}

        {/* 🔹 Duration selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Duration</p>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.days}
                onClick={() => setDurationDays(d.days)}
                className={`text-sm py-2 rounded-lg border transition ${
                  durationDays === d.days
                    ? "bg-[#21c4cc] text-white border-[#21c4cc]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Campers/day selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Campers per day</p>
          <div className="grid grid-cols-5 gap-2">
            {CAMPER_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCampersPerDay(c)}
                className={`text-sm py-2 rounded-lg border transition ${
                  campersPerDay === c
                    ? "bg-[#21c4cc] text-white border-[#21c4cc]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {campersPerDay === 5 && (
            <p className="text-xs text-[#21c4cc] font-medium">
              ⭐ Bulk discount applied
            </p>
          )}
        </div>

        {/* 🔹 Price summary */}
        <div className="border rounded-xl p-4 bg-gray-50 space-y-1">
          {selectedPlan ? (
            <>
              <p className="text-sm text-gray-700">
                Price: ₹{selectedPlan.pricePerCamper} / camper
              </p>
              <p className="text-base font-semibold text-gray-900">
                Total: ₹{totalPrice}
              </p>
              <p className="text-xs text-gray-500">
                ({durationDays} days × {campersPerDay} campers/day)
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Plan not available</p>
          )}
        </div>

        {/* 🔹 Buy */}
        <button
          disabled={!selectedPlan || !!activeMembership}
          onClick={() => {
            if (!selectedPlan) {
              setUiError("Selected plan not available");
              return;
            }
            buyMembership(selectedPlan._id);
          }}
          className="w-full text-sm py-3 rounded-xl bg-[#21c4cc] text-white font-medium
        disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Buy Membership
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full text-black border border-gray-300 active:bg-[#21c4cc] active:border-white active:text-white hover:bg-[#21c4cc] hover:border-white hover:text-white py-2.5 rounded-xl text-sm font-medium
    hover:opacity-90 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MembershipPlans;

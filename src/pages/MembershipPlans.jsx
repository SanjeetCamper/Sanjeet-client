import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMembership } from "../context/MembershipContext.jsx";
import BackButtonByNavigate from "../components/BackButtonByNavigate.jsx";
import FullPageLoader from "../components/FullPageLoader.jsx";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const DURATIONS = [
  { label: "1 Day", days: 1 },
  { label: "1 Month", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "12 Months", days: 360 },
];

const CAMPER_OPTIONS = [1, 2, 3, 4, 5];

const MembershipPlans = () => {
  const { buyMembership, loading, activeMembership, status, error } =
    useMembership();

  const [plans, setPlans] = useState([]);
  const [planError, setPlanError] = useState("");
  const [durationDays, setDurationDays] = useState(30);
  const [campersPerDay, setCampersPerDay] = useState(1);

  /* 🔹 fetch plans (PUBLIC API) */
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/membership/plans`);
        setPlans(res.data.plans || []);
      } catch {
        setPlanError("Failed to load membership plans");
      }
    };
    fetchPlans();
  }, []);

  const selectedPlan = useMemo(() => {
    return plans.find(
      (p) =>
        p.durationDays === durationDays && p.campersPerDay === campersPerDay,
    );
  }, [plans, durationDays, campersPerDay]);

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    return (
      selectedPlan.durationDays *
      selectedPlan.campersPerDay *
      selectedPlan.pricePerCamper
    );
  }, [selectedPlan]);

  if (!plans.length && !planError) {
    return <FullPageLoader value="Loading membership plans..." />;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-white h-screen z-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
        className="h-screen p-4 overflow-auto scroll-hide space-y-4"
      >
        <BackButtonByNavigate urlHeading={"Choose Membership"} urlPath={-1} />

        <div className="max-w-md mx-auto space-y-4 px-2 overflow-y-auto">
          {!activeMembership ? (
            <p className="text-xs bg-blue-50 text-blue-700 p-2 rounded">
              You don't have any active membership.
            </p>
          ) : (
            <p className="text-xs bg-green-50 text-green-700 p-2 rounded">
              You already have an active membership.
            </p>
          )}
          {/* 
        <h1 className="text-sm font-semibold text-gray-700">
          Choose Membership
        </h1> */}

          {planError && (
            <p className="text-xs bg-red-50 text-red-600 p-2 rounded">
              {planError}
            </p>
          )}

          {status === "verifying" && (
            <div className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 p-2 rounded">
              ⏳ Payment received. Confirming your membership. Please wait…
            </div>
          )}

          {error && (
            <div className="text-xs bg-blue-50 border border-blue-200 text-blue-700 p-2 rounded">
              {error}
            </div>
          )}

          {/* Duration */}
          <div>
            <p className="text-sm font-medium mb-2">Duration</p>
            <div className="grid grid-cols-2 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.days}
                  onClick={() => setDurationDays(d.days)}
                  className={`py-2 text-sm rounded-lg border ${
                    durationDays === d.days
                      ? "bg-[#21c4cc] text-white border-[#21c4cc]"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campers */}
          <div>
            <p className="text-sm font-medium mb-2">Campers per day</p>
            <div className="grid grid-cols-5 gap-2">
              {CAMPER_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCampersPerDay(c)}
                  className={`py-2 text-sm rounded-lg border ${
                    campersPerDay === c
                      ? "bg-[#21c4cc] text-white border-[#21c4cc]"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="border rounded-lg p-4 bg-gray-50">
            {selectedPlan ? (
              <>
                <p className="text-sm">
                  ₹{selectedPlan.pricePerCamper} / camper / day
                </p>
                <p className="text-base font-semibold">Total ₹{totalPrice}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500">Plan not available</p>
            )}
          </div>

          {/* Buy */}
          <button
            disabled={
              !selectedPlan ||
              loading ||
              !!activeMembership ||
              status === "verifying"
            }
            onClick={() => buyMembership(selectedPlan._id)}
            className="w-full py-3 rounded-xl bg-[#21c4cc] text-white font-medium disabled:opacity-50"
          >
            {activeMembership
              ? "Membership Already Active"
              : loading
                ? "Processing Payment..."
                : "Pay & Buy Membership"}
          </button>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 space-y-2">
            <p className="text-yellow-700 text-sm font-semibold">
              ⚠️ Service Area Limitation
            </p>

            <p className="text-gray-700 text-sm leading-relaxed">
              हमारी सेवा केवल <b>गाँव संजीत और 16-स्वाटर</b> तक उपलब्ध है। कृपया
              अन्य क्षेत्रों से इस{" "}
              <span className="text-yellow-700 text-sm font-semibold">
                Service
              </span>{" "}
              को न ख़रीदे।
            </p>

            <p className="text-xs text-red-600">
              गलत स्थान से किए गए Service पर रिफंड उपलब्ध नहीं होगा।
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MembershipPlans;

import { useMembership } from "../../context/MembershipContext.jsx";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MembershipSummaryCard = () => {
  const { activeMembership } = useMembership();

  if (!activeMembership || activeMembership.status !== "active") {
    return (
      <div className="border rounded-xl p-4 bg-white text-sm text-gray-500">
        No active membership
      </div>
    );
  }

  const { plan, startDate, endDate, status } = activeMembership;

  if (!plan) {
    return (
      <div className="border rounded-xl p-4 bg-white text-sm text-gray-500">
        Membership expired
      </div>
    );
  }

  const durationLabel =
    plan.durationDays < 30
      ? `${plan.durationDays} Day`
      : `${plan.durationDays / 30} Month`;

  return (
    <div className="border rounded-xl p-4 bg-white space-y-2">
      <h3 className="text-sm font-semibold">Membership Status</h3>

      <div className="text-xs text-gray-600">
        <p>
          <b>Duration:</b> {durationLabel}
        </p>
        <p>
          <b>Campers/day:</b> {plan.campersPerDay}
        </p>
        <p>
          <b>Price:</b> ₹{plan.pricePerCamper} / camper
        </p>
      </div>

      <div className="text-xs text-gray-600">
        <p>
          <b>Start:</b> {formatDate(startDate)}
        </p>
        <p>
          <b>End:</b> {formatDate(endDate)}
        </p>
      </div>

      <span
        className={`inline-block text-xs px-2 py-1 rounded-full ${
          status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {status.toUpperCase()}
      </span>
    </div>
  );
};

export default MembershipSummaryCard;

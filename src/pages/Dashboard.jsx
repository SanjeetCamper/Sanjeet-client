import MembershipSummaryCard from "../components/membership/MembershipSummaryCard.jsx";
import PendingCredentialsBanner from "../components/membership/PendingCredentialsBanner.jsx";
import MembershipPlanPurchaseBanner from "../components/dashboardComponents/MembershipPlanPurchaseBanner.jsx";
import { ChevronRight, Truck } from "lucide-react";

const MainDashboard = () => {
  // 🔹 Dummy data (replace later with backend)
  const data = {
    activeOrders: 1,
    totalPaid: 2400,
    pendingAmount: 600,
    activeOrder: {
      id: "ORD-1021",
      quantity: 3,
      status: "Confirmed",
    },
    recentActivity: ["Order placed", "Payment received", "Order confirmed"],
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-23 text-justify pb-22 space-y-5">
      {/* <DashboardHeader /> */}

      <MembershipPlanPurchaseBanner />

      <div>
        <PendingCredentialsBanner />
      </div>

      <MembershipSummaryCard />

    </div>
  );
};

export default MainDashboard;

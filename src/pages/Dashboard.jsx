import DashboardHeader from "../components/dashboardComponents/DashboardHeader.jsx";
import BookCamperCard from "../components/dashboardComponents/BookCamperCard";
import DashboardStats from "../components/dashboardComponents/DashboardStats";
import ActiveOrderCard from "../components/dashboardComponents/ActiveOrderCard";
import RecentActivity from "../components/dashboardComponents/RecentActivity";
import MembershipSummaryCard from '../components/membership/MembershipSummaryCard.jsx'
import PendingCredentialsBanner from "../components/membership/PendingCredentialsBanner.jsx";
import MembershipPlans from "./MembershipPlans.jsx";
import MembershipPlanPurchaseBanner from "../components/dashboardComponents/MembershipPlanPurchaseBanner.jsx";

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
    recentActivity: [
      "Order placed",
      "Payment received",
      "Order confirmed",
    ],
  };


  return (
    <div className="mx-auto w-full max-w-md px-4 pt-23 text-justify pb-22 space-y-5">
      {/* <DashboardHeader /> */}

      <div>
        <PendingCredentialsBanner />  
      </div>

      <MembershipSummaryCard />  

      <MembershipPlanPurchaseBanner />

      <BookCamperCard />

      {/* <DashboardStats
        activeOrders={data.activeOrders}
        totalPaid={data.totalPaid}
        pendingAmount={data.pendingAmount}
      />

      {data.activeOrders > 0 && (
        <ActiveOrderCard order={data.activeOrder} />
      )} */}

      {/* <RecentActivity list={data.recentActivity} /> */}
    </div>
  );
};

export default MainDashboard;
// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div className='mx-auto w-full max-w-md px-4 pt-27 text-justify pb-20 overflow-y-auto'>
//       <h1>Dashboard Page</h1>
//     </div>
//   )
// }

// export default Dashboard

import DashboardHeader from "../components/dashboardComponents/DashboardHeader.jsx";
import BookCamperCard from "../components/dashboardComponents/BookCamperCard";
import DashboardStats from "../components/dashboardComponents/DashboardStats";
import ActiveOrderCard from "../components/dashboardComponents/ActiveOrderCard";
import RecentActivity from "../components/dashboardComponents/RecentActivity";

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
    <div className="mx-auto w-full max-w-md px-4 pt-27 text-justify pb-22 space-y-5">
      <DashboardHeader />

      <BookCamperCard />

      <DashboardStats
        activeOrders={data.activeOrders}
        totalPaid={data.totalPaid}
        pendingAmount={data.pendingAmount}
      />

      {data.activeOrders > 0 && (
        <ActiveOrderCard order={data.activeOrder} />
      )}

      <RecentActivity list={data.recentActivity} />
    </div>
  );
};

export default MainDashboard;
const DashboardStats = ({ activeOrders, totalPaid, pendingAmount }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Active Orders" value={activeOrders} />
      <StatCard label="Total Paid" value={`₹ ${totalPaid}`} />
      <StatCard
        label="Pending"
        value={`₹ ${pendingAmount}`}
        danger={pendingAmount > 0}
      />
    </div>
  );
};

const StatCard = ({ label, value, danger }) => (
  <div className="bg-white border rounded-xl p-3 text-center">
    <p className="text-[11px] text-gray-500">{label}</p>
    <p
      className={`text-sm font-semibold ${
        danger ? "text-red-600" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

export default DashboardStats;

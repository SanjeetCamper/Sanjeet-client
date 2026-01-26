const filters = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "delivered", label: "Delivered" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
  { key: "paymentPending", label: "Payment Pending" },
  { key: "paymentPaid", label: "Payment Paid" },
];

const OrderFilterBar = ({ active, onChange }) => (
  <div className="flex gap-2 overflow-x-auto whitespace-nowrap
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden">
    {filters.map((f) => (
      <button
        key={f.key}
        onClick={() => onChange(f.key)}
        className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap
          ${
            active === f.key
              ? "bg-[#21c4cc] text-white border-[#21c4cc]"
              : "border-gray-300 text-gray-600"
          }`}
      >
        {f.label}
      </button>
    ))}
  </div>
);

export default OrderFilterBar;

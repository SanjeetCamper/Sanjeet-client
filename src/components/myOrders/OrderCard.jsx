import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/* =========================
   STATUS COLORS
========================= */
const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-gray-200 text-gray-700",
};

/* =========================
   DATE FORMATTER (NO T00Z)
========================= */
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const deliveryFormatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    hour12: true,
  });
};

const OrderCard = ({ order }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  const returned = order.returnedCampers || 0;
  const pendingReturn = order.camperQty - returned;

  return (
    <div className="border border-[#21c4cc]/40 rounded-xl p-3 space-y-3 bg-white">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">#{order._id.slice(-6)}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            statusColor[order.orderStatus]
          }`}
        >
          {order.orderStatus.toUpperCase()}
        </span>
      </div>

      {/* ================= Name & Phone ================= */}
      <div className="text-sm text-gray-600">
        {order.name} • {order.phone}
      </div>

      {/* ================= CAMPERS & AMOUNT ================= */}
      <div className="text-sm text-gray-600">
        {order.camperQty} campers • ₹{order.grandTotal}
      </div>

      {/* ================= DELIVERY ================= */}
      <div className="text-xs text-gray-500">
        Delivery: {deliveryFormatDate(order.deliveryDate)} @{" "}
        {order.deliveryTimeSlot}
      </div>

      {/* ================= CAMPER DETAILS ================= */}
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-700">
        {order.orderStatus === "delivered" && (
          <>
            <p>
              Returned: <b>{returned}</b>
            </p>
            <p>
              Pending Return: <b>{pendingReturn}</b>
            </p>
          </>
        )}
        <p>Base: ₹{order.baseAmount}</p>
        <p>Delivery: ₹{order.deliveryCharge}</p>
        <p className="col-span-2 font-semibold">Total: ₹{order.grandTotal}</p>
      </div>

      {/* ================= PAYMENT STATUS ================= */}
      <div className="text-xs">
        Payment:{" "}
        <b
          className={
            order.paymentStatus === "paid"
              ? "text-green-600"
              : order.paymentStatus === "partial"
                ? "text-orange-600"
                : "text-gray-600"
          }
        >
          {order.paymentStatus.toUpperCase()}
        </b>
      </div>

      {/* ================= PAYMENT DETAILS (NO DROPDOWN NOW) ================= */}
      {order.paymentStatus !== "pending" && (
        <div className="border border-gray-300 rounded-lg p-2 text-xs space-y-1">
          <p className="text-green-600">Paid Amount: ₹{order.receivedAmount}</p>
          <p>Pending Amount: ₹{order.pendingAmount}</p>
          {order.discount > 0 && <p>Discount: ₹{order.discount}</p>}
        </div>
      )}

      {/* ================= NOTES (SEPARATE – CLIENT VIEW) ================= */}
      {order.adminNote && (
        <p className="text-xs text-blue-600">
          Accepted Note: {order.adminNote}
        </p>
      )}
      {order.deliveryNote && (
        <p className="text-xs text-green-600">
          Delivery Note: {order.deliveryNote}
        </p>
      )}
      {order.rejectReason && (
        <p className="text-xs text-red-600">
          Reject Reason: {order.rejectReason}
        </p>
      )}
      {order.cancelReason && (
        <p className="text-xs text-red-600">
          Cancel Reason: {order.cancelReason}
        </p>
      )}
      {order.returnNote && (
        <p className="text-xs text-orange-600">
          Return Note: {order.returnNote}
        </p>
      )}

      {/* ================= ORDER TIMELINE ================= */}
      <div className="border border-gray-200 rounded-lg p-2">
        <div
          onClick={() => setShowTimeline(!showTimeline)}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className="text-xs text-gray-600">Order Timeline</p>
          {showTimeline ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {showTimeline && (
          <div className="mt-2 space-y-1 text-xs text-gray-700">
            <p>Placed: {formatDate(order.createdAt)}</p>
            {order.acceptedAt && (
              <p>Accepted: {formatDate(order.acceptedAt)}</p>
            )}
            {order.rejectedAt && (
              <p>Rejected: {formatDate(order.rejectedAt)}</p>
            )}
            {order.cencelledAt && (
              <p>Cancelled: {formatDate(order.cencelledAt)}</p>
            )}
            {order.deliveredAt && (
              <p>Delivered: {formatDate(order.deliveredAt)}</p>
            )}
            {order.returnedAt && (
              <p>Returned: {formatDate(order.returnedAt)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;

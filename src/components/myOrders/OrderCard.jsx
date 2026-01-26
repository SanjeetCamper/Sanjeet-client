import {ChevronDown, ChevronUp} from "lucide-react"
import { useState } from "react";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
};

const OrderCard = ({ order }) => {

  const [paymentDetailsShow ,setPaymentDetailsShow] = useState(false);

  return (
    <div className="border border-[#21c4cc]/40 rounded-xl p-3 space-y-2 bg-white">
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

      <div className="text-sm text-gray-600">
        {order.camperQty} campers • ₹{order.grandTotal}
      </div>

      <div className="text-xs text-gray-500">
        Delivery: {order.deliveryDate} @ {order.deliveryTimeSlot}
      </div>

      <div>
        <span className="text-xs">
          Payment:{" "}
          <b
            className={
              order.paymentStatus === "paid"
                ? "text-green-600"
                : "text-orange-600"
            }
          >
            {order.paymentStatus.toUpperCase()}
          </b>
        </span>

        {order.paymentStatus !== "pending" && (
          <div className="border border-gray-300 p-2 px-4 rounded-lg shadow">
            <div onClick={()=>setPaymentDetailsShow(!paymentDetailsShow)}>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">Payment Details</p>
                {paymentDetailsShow ? <ChevronUp size={18} /> :<ChevronDown size={18} /> }
                
              </div>
              <div className={`flex flex-col space-y-1 pl-3 overflow-hidden ${paymentDetailsShow ? "h-auto mt-1": "h-0"}`}>
                <span className="text-xs text-green-600">
                  Paid Amount = {"₹" + " " + order.receivedAmount}
                </span>
                <span className="text-xs text-black">
                  Pending Amount = {"₹" + " " + order.pendingAmount}
                </span>
                {order.discount > 0 && (
                  <p className="text-xs">
                    Discount Amount = {"₹" + " " + order.discount}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>{/* <p>Payment Details</p> */}</div>

      {order.orderStatus === "rejected" && (
        <p className="text-xs text-red-600">Reason: {order.rejectReason}</p>
      )}
      {order.orderStatus === "cancelled" && (
        <p className="text-xs text-red-600">Reason: {order.cancelReason}</p>
      )}

      {order.adminNote && (
        <p className="text-xs text-blue-600">Accapted Note: {order.adminNote}</p>
      )}
      {order.deliveryNote && (
        <p className="text-xs text-green-600">Delivered Note: {order.deliveryNote}</p>
      )}
    </div>
  );
};

export default OrderCard;

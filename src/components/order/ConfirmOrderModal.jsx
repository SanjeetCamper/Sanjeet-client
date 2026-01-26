// components/order/ConfirmOrderModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../context/OrderContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useContextUser } from "../../context/UserContext.jsx";
import { useVillages } from "../../context/VillageContext.jsx";

const ConfirmOrderModal = ({ onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { user } = useContextUser();
  const { villages } = useVillages();
  const { order, placeOrder } = useOrder();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const selectedVillage = villages.find((v) => v._id === order.villageId);
  /* ---------------------------
     CONFIRM ORDER
  ---------------------------- */
  const handleConfirm = async () => {
    try {
      setLoading(true);

      const payload = {
        customerId: user._id,
        name: order.name,
        phone: order.phone,
        email: order.email,
        address: order.address,
        villageId: order.villageId,
        camperQty: order.camperQty,
        deliveryDate: order.deliveryDate,
        deliveryTimeSlot: order.deliveryTimeSlot,
      };

      await placeOrder(payload);

      showToast("ऑर्डर सफलतापूर्वक दर्ज हो गया है", "success");

      onSuccess?.();

      // Redirect user to OrderCamper (main order page)
      navigate("/my-orders");
    } catch (err) {
      showToast(err.message || "ऑर्डर नहीं हो पाया", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-black/50 z-100 flex items-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full rounded-t-2xl p-4 space-y-4"
      >
        <h3 className="text-lg font-semibold text-[#21c4cc]">
          ऑर्डर की पुष्टि
        </h3>

        {/* SUMMARY */}
        <div className="text-sm space-y-1">
          <p>
            <b>नाम:</b> {order.name}
          </p>
          <p>
            <b>मोबाइल:</b> {order.phone}
          </p>
          <p>
            <b>पता:</b> {order.address}
          </p>
          <p>
            <b>गाँव:</b> {selectedVillage?.name}
          </p>
          

          <hr />

          <p>
            <b>कैम्पर:</b> {order.camperQty}
          </p>
          <p>
            <b>प्रति कैम्पर रेट:</b> ₹20
          </p>
          <p>
            <b>डिलीवरी चार्ज:</b>{" "}
            {order.deliveryCharge === 0
              ? "मुफ़्त"
              : `₹ ${order.deliveryCharge}`}
          </p>

          <p className="font-semibold">कुल राशि: ₹ {order.grandTotal}</p>

          <hr />

          <p>
            <b>डिलीवरी:</b> {order.deliveryDate} • {order.deliveryTimeSlot}
          </p>
          <p>
            <b>भुगतान:</b> Cash on Delivery
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-1/3 border border-gray-300 py-3 rounded-xl"
          >
            वापस
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-2/3 bg-[#21c4cc] text-white py-3 rounded-xl font-medium"
          >
            {loading ? "ऑर्डर हो रहा है..." : "ऑर्डर कन्फर्म करें"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;

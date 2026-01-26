// components/order/StepUserDetails.jsx
import { useState } from "react";
import { useOrder } from "../../context/OrderContext.jsx";
// import ConfirmationModal from "./ConfirmOrderModal.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import ConfirmationOnly from "./ConfirmationOnly.jsx";

const StepUserDetails = ({ onNext }) => {
  const { order, setOrder } = useOrder();
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  /* ---------------------------
     VALIDATION
  ---------------------------- */
  const validate = () => {
    if (!order.name || !order.phone || !order.address) {
      showToast("कृपया सभी जरूरी जानकारी भरें", "warning");
      return false;
    }

    if (order.phone.length < 10) {
      showToast("कृपया मोबाइल नंबर की जाच करे", "warning");
      return false;
    }

    return true;
  };

  /* ---------------------------
     HANDLE CONTINUE
  ---------------------------- */
  const handleContinue = () => {
    if (!validate()) return;
    setOpenModal(true);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#21c4cc]">
        ग्राहक की जानकारी
      </h2>

      <input
        type="text"
        placeholder="पूरा नाम *"
        value={order.name}
        onChange={(e) => setOrder({ ...order, name: e.target.value })}
        className="w-full border border-[#21c4cc] rounded-xl p-3"
      />

      <input
        type="tel"
        placeholder="मोबाइल नंबर *"
        value={order.phone}
        maxLength={10}
        onChange={(e) => setOrder({ ...order, phone: e.target.value })}
        className="w-full border border-[#21c4cc] rounded-xl p-3"
      />

      <input
        type="email"
        placeholder="ईमेल (optional)"
        value={order.email}
        onChange={(e) => setOrder({ ...order, email: e.target.value })}
        className="w-full border border-[#21c4cc] rounded-xl p-3"
      />

      <textarea
        placeholder="पूरा पता *"
        value={order.address}
        onChange={(e) => setOrder({ ...order, address: e.target.value })}
        rows={3}
        className="w-full border border-[#21c4cc] rounded-xl p-3"
      />

      <button
        onClick={handleContinue}
        className="w-full bg-[#21c4cc] text-white py-3 rounded-xl font-medium"
      >
        आगे बढ़ें
      </button>

      {/* CONFIRMATION MODAL */}
      {openModal && (
        <ConfirmationOnly
          title="महत्वपूर्ण सूचना"
          message="कृपया वही मोबाइल नंबर डालें जिस पर आपको ऑर्डर कन्फर्मेशन के लिए कॉल आ सके।"
          confirmText="हाँ, सही है"
          cancelText="नहीं, बदलना है"
          onConfirm={handleConfirm}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default StepUserDetails;

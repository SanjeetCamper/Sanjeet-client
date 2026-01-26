// components/order/StepCamperLocation.jsx
import { useState, useEffect } from "react";
import { useOrder } from "../../context/OrderContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useVillages } from "../../context/VillageContext.jsx";

const RATE = 20;

const StepCamperLocation = ({ onNext, onBack }) => {
  const { order, setOrder } = useOrder();
  const { villages } = useVillages();
  const { showToast } = useToast();

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  /* ---------------------------
       AUTO PRICE CALCULATION
  ---------------------------- */
  useEffect(() => {
    const village = villages.find((v) => v._id === order.villageId);

    const baseAmount = (order.camperQty || 0) * RATE;
    const dCharge = village
      ? village.firstRoundCharge + village.secondRoundCharge
      : 0;

    const total = baseAmount + dCharge;

    setDeliveryCharge(dCharge);
    setGrandTotal(total);

    setOrder((prev) => ({
      ...prev,
      baseAmount,
      deliveryCharge: dCharge,
      grandTotal: total,
      pendingAmount: total,
    }));
  }, [order.camperQty, order.villageId, villages]);

  /* ---------------------------
          VALIDATION
  ---------------------------- */
  const validate = () => {
    if (!order.camperQty || order.camperQty < 10) {
      showToast("कम से कम 10 कैम्पर जरूरी हैं", "warning");
      return false;
    }

    if (!order.villageId) {
      showToast("कृपया अपना गाँव चुनें", "error");
      return false;
    }

    return true;
  };

  /* ---------------------------
          CONTINUE
  ---------------------------- */
  const handleContinue = () => {
    if (!validate()) return;
    onNext();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#21c4cc]">कैम्पर और लोकेशन</h2>

      {/* CAMPER QTY */}
      <div>
        <label className="text-sm text-gray-600">कैम्पर की संख्या (कम से कम 10)</label>
        <input
          type="number"
          min={10}
          value={order.camperQty || ""}
          onChange={(e) =>
            setOrder({ ...order, camperQty: Number(e.target.value) })
          }
          className="w-full border border-[#21c4cc] rounded-xl p-3 mt-1"
        />
      </div>

      {/* RATE PER CAMPER */}
      <div className="flex justify-between text-sm">
        <span>प्रति कैम्पर रेट</span>
        <span className="font-medium">₹ {RATE}</span>
      </div>

      {/* VILLAGE SELECT */}
      <div>
        <label className="text-sm text-gray-600">अपना गाँव चुनें</label>
        <select
          value={order.villageId || ""}
          onChange={(e) => setOrder({ ...order, villageId: e.target.value })}
          className="w-full border border-[#21c4cc] rounded-xl p-3 mt-1"
        >
          <option value="">गाँव चुने</option>
          {villages.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name} — ₹ {v.firstRoundCharge + v.secondRoundCharge} डिलीवरी
            </option>
          ))}
        </select>
      </div>

      {/* PRICE BREAKUP */}
      {order.villageId && (
        <div className="bg-gray-50 rounded-xl p-3 text-sm space-y-1">
          <p>डिलीवरी चार्ज: ₹ {deliveryCharge}</p>
          <p>कैम्पर अमाउंट: ₹ {order.camperQty * RATE}</p>
          <p className="font-semibold">कुल राशि: ₹ {grandTotal}</p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="w-1/3 border border-gray-300 py-3 rounded-xl"
        >
          पीछे
        </button>

        <button
          onClick={handleContinue}
          className="w-2/3 bg-[#21c4cc] text-white py-3 rounded-xl font-medium"
        >
          आगे बढ़ें
        </button>
      </div>
    </div>
  );
};

export default StepCamperLocation;

// components/order/StepSchedulePayment.jsx
import { use, useMemo } from "react";
import { useOrder } from "../../context/OrderContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { generateTimeSlots } from "../../utils/timeSlots.js";

const StepSchedulePayment = ({ onNext, onBack }) => {
  const { order, setOrder } = useOrder();
  const {showToast} = useToast();

  /* ---------------------------
     DATE LIMITS
  ---------------------------- */
  const todayStr = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  }, []);

  const maxDateStr = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toISOString().slice(0, 10);
  }, []);

  /* ---------------------------
     TIME SLOTS (9 AM – 8 PM)
  ---------------------------- */
  const slots = useMemo(() => generateTimeSlots(), []);

  /* ---------------------------
     VALIDATION
  ---------------------------- */
  const validate = () => {
    if (!order.deliveryDate) {
      showToast("कृपया डिलीवरी की तारीख चुनें", "warning");
      return false;
    }

    if (!order.deliveryTimeSlot) {
      showToast("कृपया डिलीवरी का समय चुनें", "warning");
      return false;
    }

    // 2 घंटे का नियम
    const [time, meridiem] = order.deliveryTimeSlot.split(" ");
    let [hh, mm] = time.split(":").map(Number);

    if (meridiem === "PM" && hh !== 12) hh += 12;
    if (meridiem === "AM" && hh === 12) hh = 0;

    const selected = new Date(order.deliveryDate);
    selected.setHours(hh, mm, 0, 0);

    const nowPlus2h = new Date(Date.now() + 2 * 60 * 60 * 1000);

    if (selected < nowPlus2h) {
      showToast(
        "डिलीवरी केवल वर्तमान समय से 2 घंटे बाद उपलब्ध है",
        "error"
      );
      return false;
    }

    return true;
  };

  /* ---------------------------
     CONTINUE
  ---------------------------- */
  const handleContinue = () => {
    if (!validate()) return;
    onNext(); // Confirm modal open hoga
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#21c4cc]">
        डिलीवरी समय और भुगतान
      </h2>

      {/* DATE */}
      <div>
        <label className="text-sm text-gray-600">डिलीवरी तारीख</label>
        <input
          type="date"
          min={todayStr}
          max={maxDateStr}
          value={order.deliveryDate || ""}
          onChange={(e) =>
            setOrder({ ...order, deliveryDate: e.target.value })
          }
          className="w-full border border-[#21c4cc] rounded-xl p-3 mt-1"
        />
      </div>

      {/* TIME SLOT */}
      <div>
        <label className="text-sm text-gray-600">डिलीवरी समय</label>
        <select
          value={order.deliveryTimeSlot || ""}
          onChange={(e) =>
            setOrder({ ...order, deliveryTimeSlot: e.target.value })
          }
          className="w-full border border-[#21c4cc] rounded-xl p-3 mt-1"
        >
          <option value="">समय चुनें</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          समय: सुबह 9:00 से रात 8:00 तक • कम से कम 2 घंटे बाद
        </p>
      </div>

      {/* PAYMENT MODE */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">भुगतान का तरीका</p>

        <div className="flex items-center justify-between border rounded-xl p-3">
          <span className="text-sm">Cash (डिलीवरी पर भुगतान)</span>
          <span className="text-green-600 text-sm">✔ चुना हुआ</span>
        </div>

        <div className="flex items-center justify-between border rounded-xl p-3 opacity-60">
          <span className="text-sm">Online Payment</span>
          <span className="text-xs text-red-500">Coming soon</span>
        </div>
      </div>

      {/* ACTIONS */}
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
          पुष्टि करें
        </button>
      </div>
    </div>
  );
};

export default StepSchedulePayment;

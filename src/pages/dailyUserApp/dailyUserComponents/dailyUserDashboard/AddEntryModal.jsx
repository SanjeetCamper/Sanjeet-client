  import React, { useState } from "react";
  import dailyEntryApi from "../../../utils/dailyEntryApi";
  import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
  import { useToast } from "../../../context/ToastContext.jsx";

  const AddEntryModal = ({ open, onClose }) => {
    const { refreshToday, refreshHistory } = useDailyUser();
    const { showToast } = useToast();

    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState(15);
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
      if (!quantity || quantity <= 0) {
        showToast("Quantity valid daalo", "warning");
        return;
      }

      try {
        setLoading(true);
        await dailyEntryApi.post("/",
          { quantity: Number(quantity), rate: Number(rate) },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("dailyUserToken")}`,
            },
          }
        );

        showToast("Entry added", "success");

        // 🔄 refresh dashboard + history
        refreshToday();
        refreshHistory();

        onClose();
        setQuantity("");
      } catch (err) {
        showToast("Failed to add entry", "error");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/40 flex items-end z-100">
        <div className="bg-white w-full rounded-t-2xl p-4">
          <h3 className="text-sm font-semibold mb-3">Add Today Entry</h3>

          <div className="space-y-3">
            <input
              type="number"
              placeholder="Quantity (campers)"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
            />

            <input
              type="number"
              placeholder="Rate (₹)"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#21c4cc] text-white py-3 rounded-xl text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Entry"}
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default AddEntryModal;

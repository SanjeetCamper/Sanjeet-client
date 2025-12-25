import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const ProfessionalEntryModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    camperGiven: "",
    camperReceived: "",
    rate: 15,
    paymentReceived: "",
    note: "",
    noteVisibleToUser: false,
  });

  if (!open) return null;

  const totalAmount = Number(form.camperGiven || 0) * Number(form.rate || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit({
      camperGiven: Number(form.camperGiven),
      camperReceived: Number(form.camperReceived || 0),
      rate: Number(form.rate),
      paymentReceived: Number(form.paymentReceived || 0),
      note: form.note,
      noteVisibleToUser: form.noteVisibleToUser,
      totalAmount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-4 pb-6 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">New Entry</h2>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">
          {/* Camper Given */}
          <Input
            label="Camper Given"
            name="camperGiven"
            value={form.camperGiven}
            onChange={handleChange}
            placeholder="e.g. 5"
          />

          {/* Camper Received (future ready) */}
          <Input
            label="Camper Received"
            name="camperReceived"
            value={form.camperReceived}
            onChange={handleChange}
            placeholder="optional"
          />

          {/* Rate */}
          <Input
            label="Rate per Camper (₹)"
            name="rate"
            value={form.rate}
            onChange={handleChange}
          />

          {/* Payment Received */}
          <Input
            label="Payment Received (₹)"
            name="paymentReceived"
            value={form.paymentReceived}
            onChange={handleChange}
            placeholder="optional"
          />

          {/* TOTAL */}
          <div className="bg-gray-50 border rounded-xl px-4 py-3 flex justify-between text-sm">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold text-gray-800">₹ {totalAmount}</span>
          </div>

          {/* NOTE */}
          <div className="space-y-1">
            <label className="text-xs text-gray-500">Note</label>
            <textarea
              rows={2}
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Admin note (optional)"
              className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* NOTE VISIBILITY TOGGLE */}
          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                noteVisibleToUser: !form.noteVisibleToUser,
              })
            }
            className="flex items-center gap-2 text-xs text-gray-600"
          >
            {form.noteVisibleToUser ? <Eye size={14} /> : <EyeOff size={14} />}
            {form.noteVisibleToUser
              ? "Note visible to user"
              : "Note hidden from user"}
          </button>

          {/* ACTIONS */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#21c4cc] text-white py-3 rounded-xl text-sm font-medium mt-2"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Input */
const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
    />
  </div>
);

export default ProfessionalEntryModal;

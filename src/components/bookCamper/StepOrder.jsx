import React from "react";
import {useNavigate} from 'react-router-dom'

const StepOrder = ({ form, setForm, next }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Order Details</h2>

      <input
        type="number"
        placeholder="Number of campers"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />

      <button
        onClick={next}
        disabled={!form.quantity || !form.date}
        className="w-full bg-[#21c4cc] border active:bg-white active:text-black active:border-gray-300 active:shadow-md hover:bg-white hover:text-black hover:border-gray-300 hover:shadow-md text-white py-3 rounded-xl text-sm"
      >
        Continue
      </button>
      <button
        onClick={() => navigate(-1)}
        className="w-full text-black border border-gray-300 active:bg-[#21c4cc] active:border-white active:text-white hover:bg-[#21c4cc] hover:border-white hover:text-white py-2.5 rounded-xl text-sm font-medium
    hover:opacity-90 transition"
      >
        Back
      </button>
    </div>
  );
};

export default StepOrder;

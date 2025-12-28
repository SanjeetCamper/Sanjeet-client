const StepOrder = ({ form, setForm, next }) => {
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
        className="w-full bg-[#21c4cc] text-white py-3 rounded-xl text-sm"
      >
        Continue
      </button>
    </div>
  );
};

export default StepOrder;

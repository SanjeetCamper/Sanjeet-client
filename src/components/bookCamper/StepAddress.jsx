const StepAddress = ({ form, setForm, next, back }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Address & Contact</h2>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />

      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />

      <textarea
        placeholder="Delivery Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <button onClick={back} className="flex-1 border rounded-xl py-2 text-sm">
          Back
        </button>
        <button
          onClick={next}
          disabled={!form.name || !form.phone || !form.address}
          className="flex-1 bg-[#21c4cc] text-white rounded-xl py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepAddress;

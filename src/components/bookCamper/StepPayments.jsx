const StepPayment = ({ form, setForm, next, back }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Payment Method</h2>

      {["online", "cod"].map((m) => (
        <label
          key={m}
          className={`flex items-center justify-between border rounded-xl px-3 py-2 ${
            form.paymentMethod === m ? "border-[#21c4cc]" : ""
          }`}
        >
          <span className="text-sm">{m === "online" ? "Online" : "Cash on Delivery"}</span>
          <input
            type="radio"
            checked={form.paymentMethod === m}
            onChange={() => setForm({ ...form, paymentMethod: m })}
          />
        </label>
      ))}

      <div className="flex gap-2">
        <button onClick={back} className="flex-1 border rounded-xl py-2 text-sm">
          Back
        </button>
        <button
          onClick={next}
          className="flex-1 bg-[#21c4cc] text-white rounded-xl py-2 text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepPayment;

const StepReview = ({ form, back }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Review Order</h2>

      <div className="bg-white border rounded-xl p-3 text-xs space-y-1">
        <p>Campers: {form.quantity}</p>
        <p>Date: {form.date}</p>
        <p>Name: {form.name}</p>
        <p>Phone: {form.phone}</p>
        <p>Address: {form.address}</p>
        <p>Payment: {form.paymentMethod}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={back} className="flex-1 border rounded-xl py-2 text-sm">
          Back
        </button>
        <button className="flex-1 bg-[#21c4cc] text-white rounded-xl py-2 text-sm">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default StepReview;

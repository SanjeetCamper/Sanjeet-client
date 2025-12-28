const ActiveOrderCard = ({ order }) => {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <p className="text-xs text-gray-500 mb-1">Active Order</p>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-800">
            {order.id}
          </p>
          <p className="text-xs text-gray-500">
            {order.quantity} campers
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          {order.status}
        </span>
      </div>
    </div>
  );
};

export default ActiveOrderCard;

import OrderCard from "./OrderCard";

const OrdersList = ({ orders }) => (
  <div className="space-y-3">
    {orders.map((o) => (
      <OrderCard key={o._id} order={o} />
    ))}
  </div>
);

export default OrdersList;

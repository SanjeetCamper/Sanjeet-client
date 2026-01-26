const OrdersSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-24 rounded-xl bg-gray-100 animate-pulse"
      />
    ))}
  </div>
);

export default OrdersSkeleton;

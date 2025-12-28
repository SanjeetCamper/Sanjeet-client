const RecentActivity = ({ list }) => {
  return (
    <div className="bg-white border rounded-2xl p-4">
      <p className="text-xs text-gray-500 mb-2">Recent Activity</p>

      {list.length === 0 ? (
        <p className="text-xs text-gray-400">No activity yet</p>
      ) : (
        <ul className="space-y-1">
          {list.slice(0, 3).map((item, i) => (
            <li key={i} className="text-xs text-gray-700">
              • {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;

import React from "react";
import { useContextUser } from "../../context/UserContext";

const DashboardHeader = () => {
  const {user} = useContextUser();
  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-800">
        Welcome 👋 {user?.name}
      </h1>
      <p className="text-xs text-gray-500">
        Manage your water orders easily
      </p>
    </div>
  );
};

export default DashboardHeader;

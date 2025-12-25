import React from "react";
import { useContextUser } from "../context/UserContext.jsx";
const NotchNotification = () => {
  const { user } = useContextUser();
  const firstName = user.name
    .trim()
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

  return (
    <div>
      <div className="text-sm sm:text-sm overflow-y-auto max-h-10 no-scrollbar">
        {"Hey " + firstName} <br />
        🔔 Your Noticfication Panel
      </div>
    </div>
  );
};

export default NotchNotification;

import React, { useState } from "react";
import { useToast } from "../../context/ToastContext.jsx";
import BackButton from "../BackButton.jsx";

const Toggle = ({ label, description }) => {
  const [enabled, setEnabled] = useState(false);
  const { showToast } = useToast();

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>

        <button
          // onClick={() => setEnabled(!enabled)}
          onClick={()=>showToast("Coming Soon" , "warning")}
          className={`cursor-pointer w-11 h-6 flex items-center rounded-full p-1 transition ${
            enabled ? "bg-gradient-to-br from-[#40afff] via-[#06b6d4] to-[#14b8a6]" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
              enabled ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="mx-auto max-w-md py-24 min-h-screen bg-white px-4 space-y-2">

      <BackButton />

      <h1 className="text-xs font-semibold text-gray-500 mb-4">
        NOTIFICATIONS
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl divide-y px-4">
        <Toggle
          label="App Notifications"
          description="Receive important updates inside the app"
        />
        <Toggle
          label="Payment Reminders"
          description="Get reminders for pending payments"
        />
        <Toggle
          label="Admin Messages"
          description="Receive messages sent by admin"
        />
      </div>
    </div>
  );
};

export default NotificationSettings;

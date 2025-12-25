import React, { useState } from "react";
import { User, Shield, Bell, Info, LogOut, UserCog } from "lucide-react";
import DailyUserSettingSection from "../dailyUserComponents/dailyUserSetting/DailyUserSettingSection.jsx";
import DailyUserSettingItems from "../dailyUserComponents/dailyUserSetting/DailyUserSettingItems.jsx";
import { useDailyUser } from "../dailyUserContext/DailyUserContext.jsx";
import { useNavigate } from "react-router-dom";
import DailyUserLogoutConfirm from "../dailyUserComponents/dailyUserSetting/DailyUserLogoutConfirm.jsx";

const DailyUserSetting = () => {
  const { dailyUser } = useDailyUser();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("dailyUserToken");
    navigate("/dailyuser");
  };

  return (
    <div className="px-4 pt-4 pb-20 bg-white min-h-screen overflow-auto">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Settings</h1>

      {/* ACCOUNT */}
      <DailyUserSettingSection title="Account">
        <DailyUserSettingItems
          icon={User}
          label="Profile"
          value={dailyUser?.name}
          onClick={() => {}}
        />

        <DailyUserSettingItems
          icon={Shield}
          label="Account Type"
          value={dailyUser?.type === "cash" ? "Cash User" : "Online Plan User"}
          onClick={() => {}}
        />
      </DailyUserSettingSection>

      {/* NOTIFICATIONS */}
      <DailyUserSettingSection title="Notifications">
        <DailyUserSettingItems
          icon={Bell}
          label="App Notifications"
          value="Enabled"
          onClick={() => {}}
        />
      </DailyUserSettingSection>

      {/* INFO */}
      <DailyUserSettingSection title="About">
        <DailyUserSettingItems
          icon={UserCog}
          label="Admin Information"
          value="Owner of Sanjeet Water Supplier"
          onClick={() => navigate('/dailyuser/app/setting/admin-info')}
        />

        <DailyUserSettingItems
          icon={Info}
          label="App Information"
          value="Daily Water Mini App"
          onClick={() => {}}
        />
      </DailyUserSettingSection>

      {/* LOGOUT */}
      <DailyUserSettingSection title="Danger Zone">
        <DailyUserSettingItems
          icon={LogOut}
          label="Logout"
          danger
          onClick={() => setShowLogout(true)}
        />
      </DailyUserSettingSection>

      <DailyUserLogoutConfirm
        open={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default DailyUserSetting;

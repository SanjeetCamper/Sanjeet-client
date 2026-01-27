import React, { useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Bell, ChevronRight, LogOut, AlertCircle, AlarmCheck } from "lucide-react";
import SignOutApp from "../components/settingsComponents/SignOutApp.jsx";
import ToastSettings from './ToastSettings.jsx'


const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
      {title}
    </h2>
    <div className="bg-white rounded-xl divide-y border border-gray-200">
      {children}
    </div>
  </div>
);

const Item = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-4 active:bg-gray-50 transition cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-gray-500" />
      <span className="text-sm text-gray-800">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </button>
);

const Setting = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const [logOutApp , setLogOutApp] = useState(false);


  return (
    // <div className='mx-auto w-full max-w-md px-4 pt-20 text-justify pb-20 overflow-y-auto' >

    <div className="mx-auto max-w-md min-h-screen bg-white px-4 py-27">
      {/* <h1 className="text-lg font-semibold text-gray-800 mb-4">Settings</h1> */}

      {/* ACCOUNTS */}
      <Section title="Accounts">
        <Item
          icon={User}
          label="Edit Profile"
          onClick={() => navigate("/setting/edit-profile")}
        />

        <Item
          icon={Lock}
          label="Change Password"
          onClick={() => navigate("/setting/change-password")}
        />
      </Section>

      {/* NOTIFICATIONS */}
      <Section title="Controller">
        <Item
          icon={Bell}
          label="App Notifications"
          onClick={() => navigate("/setting/notifications")}
        />
        <Item
          icon={AlarmCheck}
          label="Toast Notifications"
          onClick={() => navigate("/setting/toast-notifications")}
        />
      </Section>

      <div className="mb-6" onClick={()=>setLogOutApp(true)}>
        <h2 className="text-xs font-semibold text-red-500 uppercase mb-2">
          Logout
        </h2>
        <div className="bg-white rounded-xl divide-y border border-gray-200">
          <button className="w-full flex items-center justify-between px-4 py-4 active:bg-gray-50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-red-500" />
              <span className="text-sm text-red-500">LogOut</span>
            </div>
            <ChevronRight size={18} className="text-red-400" />
          </button>
        </div>
      </div>

      <SignOutApp
        open={logOutApp}
        onClose={()=>setLogOutApp(false)}
        onConfirm={()=>signOut()}
      />

      
    </div>
    // </div>
  );
};

export default Setting;

import React, { useState } from "react";
import { Mail, Phone, Store, MapPin, Calendar, User } from "lucide-react";
import { useContextUser } from "../../context/UserContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
    <Icon size={18} className="text-gray-400" />
    <div className="w-full">
      <p className="text-xs text-gray-500">{label}</p>
      <input
        className="w-full outline-none text-sm text-gray-800 bg-transparent"
        {...props}
      />
    </div>
  </div>
);

const ProfileSettings = () => {
  const { user } = useContextUser();
  const {showToast} = useToast();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    shop: user?.shop || "",
    village: user?.village || "",
    address: user?.address || "",
    birthday: user?.birthday?.slice(0, 10) || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    showToast("Scroll & Save Changes" , "info");
  };

  const handleSave = () => {
    // 🔥 yahan backend API call jayegi
    showToast("Profile Updated","success");
  };

  return (
    <div className="mx-auto max-w-md py-27 min-h-screen bg-white px-4">
      <h1 className="text-lg font-semibold text-gray-800 mb-4">
        Edit User Details
      </h1>

      <div className="space-y-4">
        <InputField
          icon={User}
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <InputField icon={Mail} label="Email" value={form.email} disabled />

        <InputField
          icon={Phone}
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <InputField
          icon={Store}
          label="Shop Name"
          name="shop"
          value={form.shop}
          onChange={handleChange}
        />

        <InputField
          icon={MapPin}
          label="Village / City"
          name="village"
          value={form.village}
          onChange={handleChange}
        />

        <InputField
          icon={MapPin}
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <InputField
          icon={Calendar}
          label="Birthday"
          type="date"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
        />
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-br from-[#40afff] via-[#06b6d4] to-[#14b8a6] text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;

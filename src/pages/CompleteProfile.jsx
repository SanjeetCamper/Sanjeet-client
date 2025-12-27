import React, { useState, useEffect } from "react";
import { useContextUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  MapPinned,
  Store,
  User,
} from "lucide-react";
import FullPageLoader from "../components/FullPageLoader";
// import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const { user, backendUrl , refreshUser } = useContextUser();
  const {showToast} = useToast();
  const { getToken } = useAuth();
  const { user: clerkUser } = useClerkUser();
  // const navigate = useNavigate();

  // STATES (same logic)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shop, setShop] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  if (!user) return <FullPageLoader />;

  // SUBMIT HANDLER (UNCHANGED LOGIC)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      showToast("Enter valid 10 digit mobile number" , "warning");
      return;
    }

    try {
      setLoading(true);

      const parts = name.trim().split(/\s+/);

      const payload = {
        firstName: parts[0],
      };

      if (parts.length > 1) {
        payload.lastName = parts.slice(1).join(" ");
      }

      if (clerkUser) {
        await clerkUser.update(payload);
      }

      const token = await getToken();

      const res = await fetch(`${backendUrl}/api/users/complete-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone,
          name,
          shop,
          village,
          address,
          birthday,
        }),
      });

      const data = await res.json();
      if (data.success) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-5 pb-6 max-h-[92vh] overflow-y-auto">
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Complete Profile
          </h2>
          <p className="text-xs text-gray-500">
            Complete your profile for better experience
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={User}
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input icon={Mail} label="Email" value={user.email} disabled />

          <Input
            icon={Phone}
            label="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            required
            placeholder="0123456789"
          />

          <Input
            icon={Store}
            label="Shop Name"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            placeholder="Sanjeet Water Supplier"
          />

          <Input
            icon={MapPinned}
            label="Village / City"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            required
            placeholder="Sanjeet"
          />

          <Input
            icon={MapPin}
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Main Road Sadar Bazar"
          />

          <Input
            icon={Calendar}
            label="Birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-[#21c4cc] text-white py-3 rounded-xl text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* 🔹 REUSABLE INPUT */
const Input = ({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  disabled,
  ...props
}) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-500">{label}</label>
    <div className="flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-[#21c4cc]">
      <Icon size={18} className="text-gray-400" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full outline-none text-sm bg-transparent disabled:text-gray-400"
        {...props}
      />
    </div>
  </div>
);

export default CompleteProfile;
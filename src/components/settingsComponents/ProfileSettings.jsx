import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Store,
  MapPin,
  Calendar,
  User,
  Cake,
  Loader2,
  ArrowBigLeft,
  MoveLeft,
  ArrowLeftCircle,
} from "lucide-react";
import { useContextUser } from "../../context/UserContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton.jsx";
import { motion } from "framer-motion";

const safe = (v) => v ?? "";

const InputField = ({ icon: Icon, label, value, ...props }) => (
  <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
    <Icon size={18} className="text-gray-400" />
    <div className="w-full">
      <p className="text-xs text-gray-500">{label}</p>
      <input
        value={safe(value)}
        className="w-full outline-none text-sm text-gray-800 bg-transparent"
        {...props}
      />
    </div>
  </div>
);

const ProfileSettings = () => {
  const { user, backendUrl, refreshUser, loading } = useContextUser();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [initialForm, setInitialForm] = useState({});
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    shop: user?.shop || "",
    village: user?.village || "",
    address: user?.address || "",
    birthday: user?.birthday?.slice(0, 10) || "",
  });

  useEffect(() => {
    if (user) {
      const data = {
        name: user.name ?? "",
        phone: user.phone ?? "",
        shop: user.shop ?? "",
        village: user.village ?? "",
        address: user.address ?? "",
        birthday: user.birthday?.slice(0, 10) ?? "",
      };

      setForm({ ...data }); // ✅ new object
      setInitialForm({ ...data }); // ✅ new object
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // ❌ no changes
    if (JSON.stringify(form) === JSON.stringify(initialForm)) {
      showToast("No changes to save", "info");
      return;
    }

    if (!form.name) {
      showToast("Name Required", "warning");
      return;
    }
    if (!form.phone) {
      showToast("Mobile No. Required", "warning");
      return;
    }

    if (form.phone.length !== 10) {
      showToast("Enter valid 10 digit mobile number", "warning");
      return;
    }

    if (!form.village) {
      showToast("Village Required", "warning");
      return;
    }
    if (!form.address) {
      showToast("Address Required", "warning");
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const token = await getToken();

      await fetch(`${backendUrl}/api/users/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          shop: form.shop,
          village: form.village,
          address: form.address,
          birthday: form.birthday,
        }),
      });

      // ✅ update UI instantly
      await refreshUser();

      // ✅ reset initial state
      setInitialForm(form);
      setIsSubmitting(false);
      showToast("Profile updated successfully", "success");
    } catch (err) {
      console.error("Profile update error", err);
      showToast("Failed to update profile", "error");
    }
  };

  return (
    <motion.div
      // initial={{ opacity: 0, y: -200 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{
      //   duration: 0.1,
      //   ease: [0.25, 0.25, 0.25, 0.25],
      // }}
      className="fixed left-0 top-0 z-100 w-full  h-screen bg-white p-4 pb-15 space-y-4 overflow-y-auto transition-all animate-pageUp"
    >
      <div className="text-gray-500">
        <BackButton />
      </div>
      <div>
        <h1 className="text-xs font-semibold text-gray-500 mb-4">
          EDIT USER DETAILS
        </h1>

        <div className="space-y-4">
          <InputField
            icon={User}
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField icon={Mail} label="Email" value={user.email} disabled />

          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            value={form.phone}
            required
            maxLength={10}
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

          <InputField
            icon={Cake}
            label="Age"
            disabled
            value={user?.age ? user?.age : "Enter Birth Date"}
          />
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className={`flex justify-center items-center gap-3 w-full text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition  ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#21c4cc] hover:bg-[#21c4cc]"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" size={18} />}
            {isSubmitting ? "Submitting..." : "Submit Changes"}
          </button>
        </div>

        {/* Back Button */}
        {/* <div className="mt-3">
          <button
            className={`flex justify-center items-center gap-3 w-full text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition bg-gray-400 cursor-not-allowed`}
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" size={18} />}
            {isSubmitting ? "Submitting..." : "Submit Changes"}
          </button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default ProfileSettings;

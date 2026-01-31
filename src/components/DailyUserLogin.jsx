import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  CreditCard,
  Wallet,
  Eye,
  EyeClosed,
  EyeOff,
} from "lucide-react";
import dailyUserApi from "../utils/dailyUserApi.js";
import { useToast } from "../context/ToastContext.jsx";

const DailyUserLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    // 🔒 basic validation
    if (!form.username) {
      showToast("Username Required", "warning");
      return;
    }

    if (!form.password) {
      showToast("Password Required", "warning");
      return;
    }

    try {
      setLoading(true);

      const res = await dailyUserApi.post("/login", {
        username: form.username,
        password: form.password,
      });

      // ✅ token save
      localStorage.setItem("dailyUserToken", res.data.token);

      showToast("Login successful", "success");

      // ✅ mini app open
      navigate("/dailyuser/app");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Invalid username or password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md space-y-6">
        {/* LOGIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Daily User Login
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            If you are a daily water customer, login to view your entries
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <User size={18} className="text-gray-400" />
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#21c4cc] text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* OPTIONS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Not a Daily User?
          </h3>

          <button
            onClick={() => navigate("/cash-user-request")}
            className="w-full flex items-center gap-3 border rounded-xl px-4 py-3 active:bg-gray-50"
          >
            <Wallet size={18} className="text-green-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                Continue as Cash User
              </p>
              <p className="text-xs text-gray-500">
                Ask admin to enable your daily account
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/dashboard/membership/plans')}
            className="w-full flex items-center gap-3 border rounded-xl px-4 py-3 active:bg-gray-50"
          >
            <CreditCard size={18} className="text-purple-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">
                Buy Online Plan
              </p>
              <p className="text-xs text-gray-500">
                Get discounts & auto entries
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyUserLogin;

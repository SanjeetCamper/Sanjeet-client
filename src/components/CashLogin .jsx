import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CashLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/dailyuser/cash-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("cashUserId", data.userId);
      navigate("/dailyuser/app"); // open mini-app in cash mode
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-30 pb-20">

      <h1 className="text-xl font-bold mb-6">Cash User Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Username"
          className="border px-4 py-2 rounded-lg"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded-lg"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-3 bg-blue-500 text-white rounded-xl">
          Login
        </button>

      </form>
    </div>
  );
};

export default CashLogin;

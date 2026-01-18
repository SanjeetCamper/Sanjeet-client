import { useEffect, useState } from "react";
import { useDailyUserCredentials } from "../context/DailyUserCredentialsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext.jsx";
import BackButton from "../components/BackButton.jsx";

const CreateDailyUserCredentials = () => {
  const { showToast } = useToast();
  const { setDailyUserCredentials } = useDailyUserCredentials();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !password) {
      setError("All fields required");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await setDailyUserCredentials({ username, password });

      showToast("DailyUser Created Succefully", "success");
      navigate("/dailyuser");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create credentials");

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-100 h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4 w-full max-w-sm space-y-3 shadow-sm">

      <BackButton />

        <h1 className="text-lg font-semibold text-gray-900">
          Create Daily User Login
        </h1>

        <p className="text-xs text-gray-500">One-time setup required</p>

        {error && (
          <p className="text-xs bg-red-50 text-red-600 p-2 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#21c4cc]/40 focus:border-[#21c4cc]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#21c4cc]/40 focus:border-[#21c4cc]"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
    focus:outline-none focus:ring-2 focus:ring-[#21c4cc]/40 focus:border-[#21c4cc]"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-[#21c4cc] border active:bg-white active:text-black active:border-gray-300 active:shadow-md hover:bg-white hover:text-black hover:border-gray-300 hover:shadow-md text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Create Login"}
        </button>

        <button
          onClick={()=>navigate('/dashboard')}
          className="w-full text-black border border-gray-300 shadow-md active:bg-[#21c4cc] active:border-white active:text-white active:shadow-none hover:bg-[#21c4cc] hover:border-white hover:text-white hover:shadow-none py-2.5 rounded-xl text-sm font-medium
    hover:opacity-90 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateDailyUserCredentials;

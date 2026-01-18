import { useEffect } from "react";
import { useDailyUserCredentials } from "../../context/DailyUserCredentialsContext.jsx";
import { useNavigate } from "react-router-dom";

const PendingCredentialsBanner = () => {
  const { refreshCredentialsStatus, credentialsInfo, loading } =
    useDailyUserCredentials();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  useEffect(() => {
    refreshCredentialsStatus();
  }, []);

  if (credentialsInfo?.credentialsStatus !== "pending") {
    return null;
  }

  return (
    <div className="border border-orange-300 bg-orange-50 p-3 rounded-xl space-y-2">

      <p className="text-sm font-medium text-orange-800">
        Daily User login setup pending
      </p>

      <p className="text-xs text-orange-700">
        Please create your username and password to access daily services.
      </p>

      <button
        onClick={() => navigate("/daily-user/create-credentials")}
        className="text-xs px-3 py-1.5 rounded bg-orange-600 text-white"
      >
        Complete Setup
      </button>
    </div>
  );
};

export default PendingCredentialsBanner;

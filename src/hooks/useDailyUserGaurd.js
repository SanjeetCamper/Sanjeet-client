import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useDailyUserGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dailyUserToken");

    // ❌ token nahi hai → mini app se bahar
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);
};

export default useDailyUserGuard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DailyUserLogin from "../components/DailyUserLogin";

const DailyUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("dailyUserToken");
    if (token) {
      navigate("/dailyuser/app");
    }
  }, [navigate]);

  return (
    <div className="mx-auto w-full max-w-md px-4 my-27">
      <DailyUserLogin />
    </div>
  );
};

export default DailyUser;

import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const MembershipCheck = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in"); // Clerk login
      return;
    }

    const check = async () => {
      const res = await fetch(`/api/dailyuser/check?clerkId=${user.id}`);
      const data = await res.json();

      if (data?.userType === "membership") {
        navigate("/dailyuser/app");
      } else {
        alert("You do not have a membership plan.");
      }
    };

    check();
  }, [user, navigate]);

  return <p className="text-center mt-10">Checking membership...</p>;
};

export default MembershipCheck;

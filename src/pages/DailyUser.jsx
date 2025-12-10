import React, { useEffect } from 'react';
import DailyUserLogin from '../components/DailyUserLogin.jsx';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const DailyUser = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  // const firstname = user?.firstName?.toLowerCase()?.trim(); // 👈 important
  const email = user?.primaryEmailAddress?.emailAddress; // 👈 important

  useEffect(() => {
    // agar match nahi → do nothing
    if (!email) return;

    // 👇 now allowed only exact clean name
    if (email === "altamasma064@gmail.com") {
      navigate("/dailyuser/app");
    }else{
      navigate('/dailyuser');
    }
  }, [email, navigate]);

  return (
    <div className='mx-auto w-full max-w-md px-2 pt-27 text-justify pb-20 overflow-y-auto'>
      {email !== "altamasma064@gmail.com" && <DailyUserLogin />}
    </div>
  );
};

export default DailyUser;

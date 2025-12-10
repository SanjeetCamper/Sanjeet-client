import React, { useEffect, useState } from "react";
import "./index.css";
import Footer from "./components/Footer";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import DailyUser from "./pages/DailyUser";
import { useUser } from "@clerk/clerk-react";
import Setting from "./pages/Setting";
import NavBar from "./components/Navbar.jsx";
import InstallPWA from "./InstallPWA.jsx";
import IndexDailyUser from "./pages/dailyUserApp/indexDailyUser.jsx";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { user } = useUser();

  const location = useLocation();

  const noFrame = location.pathname.startsWith("/dailyuser/app");

  // const [showGlobalPopup, setShowGlobalPopup] = useState(false);

  // const location = useLocation();

  // const [profileChecked, setProfileChecked] = useState(false);
  // const [isProfileComplete, setIsProfileComplete] = useState(false);

  // useEffect(() => {
  //   const checkProfile = async () => {
  //     if (!user) {
  //       setIsProfileComplete(false);
  //       setProfileChecked(true);
  //       return;
  //     }

  //     try {
  //       const res = await fetch(`/api/check-profile?clerkId=${user.id}`);
  //       const data = await res.json();
  //       setIsProfileComplete(!!data.completed);
  //     } catch (err) {
  //       console.error("Profile check failed", err);
  //       // worst case: treat as incomplete so user fills it
  //       setIsProfileComplete(false);
  //     } finally {
  //       setProfileChecked(true);
  //     }
  //   };

  //   checkProfile();
  // }, [user]);

  // // loading state while checking profile
  // if (!profileChecked) {
  //   return null; // ya koi loader dikhाना ho to yaha
  // }

  // 🔒 Guard logic
  // const isOnCompleteProfile = location.pathname === "/complete-profile";

  // user logged in + profile incomplete → force /complete-profile
  // if (user && !isProfileComplete && !isOnCompleteProfile) {
  //   return <Navigate to="/complete-profile" />;
  // }

  // user logged in + profile complete + still on /complete-profile → redirect home
  // if (user && isProfileComplete && isOnCompleteProfile) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <InstallPWA />

      {!noFrame && <NavBar />}

      <AnimatePresence mode="wait">
        <div className="pb-0">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/dailyuser" element={<DailyUser />} />
            <Route path="/setting" element={<Setting />} />

            {/* 🎯 animated screen */}
            <Route path="/dailyuser/app/*" element={<IndexDailyUser />} />
          </Routes>
        </div>
      </AnimatePresence>

      {!noFrame && user && <Footer />}
    </>
  );
};

export default App;

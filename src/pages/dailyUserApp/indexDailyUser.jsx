import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./dailyUserStyles/index.module.css";
// import DailyUserOut from "./dailyUserComponents/DailyUserOut.jsx";
import DailyUserFooterNavbar from "./dailyUserComponents/DailyUserFooterNavbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import DailyUserDashboard from "./dailyUserPages/DailyUserDashboard.jsx";
import DailyUserHistory from "./dailyUserPages/DailyUserHistory.jsx";
import DailyUserNotification from "./dailyUserPages/DailyUserNotification.jsx";
import DailyUserSetting from "./dailyUserPages/DailyUserSetting.jsx";
import useDailyUserGuard from "../../hooks/useDailyUserGaurd.js";
import { DailyUserProvider } from "./dailyUserContext/DailyUserContext.jsx";
import DailyUserAdminInfo from "./dailyUserComponents/dailyUserSetting/DailyUserAdminInfo.jsx";
import DailyUserEntryHistory from "./dailyUserPages/DailyUserEntryHistory.jsx";
import DailyUserMonthlyHistory from "./dailyUserPages/DailyUserMonthlyHistory.jsx";
import ReloadMiniAppButton from "./dailyUserComponents/ReloadMiniAppButton.jsx";

const IndexDailyUser = () => {
  useDailyUserGuard();
  const [animateOnce, setAnimateOnce] = useState(true);

  useEffect(() => {
    setTimeout(() => setAnimateOnce(false), 50);
  }, []);

  return (
    <motion.div
      initial={animateOnce ? { opacity: 0, y: 30 } : false}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0, y: 1 }} // leave route
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={styles.miniAppWrapper}
    >
      <DailyUserProvider>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DailyUserDashboard />} />
          <Route path="history" element={<DailyUserHistory />} />
          <Route
            path="history/entry-page"
            element={<DailyUserEntryHistory />}
          />
          <Route
            path="history/month/:year/:month"
            element={<DailyUserMonthlyHistory />}
          />

          <Route path="notification" element={<DailyUserNotification />} />
          <Route path="setting" element={<DailyUserSetting />} />
          <Route path="setting/admin-info" element={<DailyUserAdminInfo />} />
        </Routes>

        <DailyUserFooterNavbar />
        <ReloadMiniAppButton />
      </DailyUserProvider>
    </motion.div>
  );
};

export default IndexDailyUser;

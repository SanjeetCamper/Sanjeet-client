import React from "react";
import { motion } from "framer-motion";
import styles from "./dailyUserStyles/index.module.css";
import DailyUserOut from "./dailyUserComponents/DailyUserOut.jsx";
import DailyUserFooterNavbar from "./dailyUserComponents/DailyUserFooterNavbar.jsx";
import { Routes , Route } from "react-router-dom";
import DailyUserDashboard from "./dailyUserPages/DailyUserDashboard.jsx";
import DailyUserHistory from "./dailyUserPages/DailyUserHistory.jsx";
import DailyUserNotification from "./dailyUserPages/DailyUserNotification.jsx";
import DailyUserSetting from "./dailyUserPages/DailyUserSetting.jsx";

const IndexDailyUser = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // start
      animate={{ opacity: 1, y: 0 }} // enter
      exit={{ opacity: 0, y: 30 }} // leave route
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={styles.miniAppWrapper}
    >
      <DailyUserOut />

      <Routes >
        <Route index element={<DailyUserDashboard />} />
        <Route path="/dashboard" element={<DailyUserDashboard />} />
        <Route path="/history" element={<DailyUserHistory />} />
        <Route path="/notification" element={<DailyUserNotification />} />
        <Route path="/setting" element={<DailyUserSetting />} />
      </Routes>
      
      <DailyUserFooterNavbar />
    </motion.div>
  );
};

export default IndexDailyUser;
